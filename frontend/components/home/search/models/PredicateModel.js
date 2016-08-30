import Updatable from "./../../models/Updatable"
const skipSymbols = "&|->+()! ";
import parse from "./parser/parse"
function names(p) {
    const result = [];
    let i;

    function name() {
        while (p[i] && skipSymbols.indexOf(p[i]) > 0){
            i += 1;
        }
        const _i = i;
        while (p[i] && skipSymbols.indexOf(p[i]) < 0){
            i += 1;
        }
        return p.slice(_i, i);
    }

    for (i = 0; i < p.length; i += 1) {
        result.push(name())
    }
    return result.length ? result : [p];
}
function error(p) {
    try {
        parse(p);
    } catch (e) {
        return e.message;
    }
}
export default class PredicateModel extends Updatable {
    constructor({searchContainer,component}) {
        super(component);
        this.searchContainer = searchContainer;
        this.predicate = "";
        this.isOpen = false;
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.goSearch = this.goSearch.bind(this);
        this.setPredicate = this.setPredicate.bind(this);
        this.validateMessage = "";
        this.validatePredicateTimeoutId = 0;
        this.validatePredicate = this.validatePredicate.bind(this);
    }

    handleOpen() {
        this.isOpen = true;
        this.validatePredicate();
    }

    handleClose() {
        this.isOpen = false;
        this.notifyUpdated()
    }

    validatePredicate() {
        if (!this.predicate) {
            this.validateMessage = undefined;
            this.notifyUpdated();
            return;
        }
        const _error = error(this.predicate);
        if (_error) {
            this.validateMessage = _error;
            this.notifyUpdated();
            return;
        }
        const varValues = this.varsValues();
        const _names = names(this.predicate);
        const unknownNames = _names.filter(name=>
            !varValues.filter(vv=>
                vv.var == name
            ).length
        ).join(", ");
        this.validateMessage = unknownNames ? "Unknown names: " + unknownNames : "";
        this.notifyUpdated();
    }

    setPredicate(value) {
        this.predicate = value;
        clearTimeout(this.validatePredicateTimeoutId);
        this.validatePredicateTimeoutId = setTimeout(this.validatePredicate, 1000)
    }

    varsValues() {
        return this.searchContainer.searchModels.map(model=> {
            return model.values.map((value, index)=> {
                return {
                    "var": model.getTitleInSingular().toLowerCase() + index,
                    value: model.getText(value)
                }
            })
        }).reduce((arr, elems)=>arr.concat(elems), []);
    }

    goSearch() {
        this.validatePredicate();
        if (!this.validateMessage){
            this.handleClose();
            this.searchContainer.searchModels.push(this);
            this.searchContainer.goExtendedSearch();
            if (this.searchContainer.searchModels.pop() !== this) {
                throw new Error("Cant pop back")
            }
            this.notifyUpdated()
        }
    }

    getRequestRepresentation() {
        return this.predicate ? `predicate=${encodeURIComponent(this.predicate)}` : "";
    }
}