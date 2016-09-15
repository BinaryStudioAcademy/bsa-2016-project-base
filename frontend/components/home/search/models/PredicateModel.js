import Updatable from "./../../models/Updatable"
const skipSymbols = "&|->+()! ";
import SearchStrategy from "./../const/SearchStratrgy"
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
        if (p[i] && i == _i) {
            i+=1;
            return name();
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
        this.values = []
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
        this.setPredicateInput = this.setPredicateInput.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
    }
    clearSearch(){
        this.searchContainer.clearSearch();
        this.predicate = "";
        this.validateMessage = "";
    }
    insertInPredicate(string){
        //var pos = doGetCaretPosition(this.predicateInput);
        //var pos = this.predicate.length-1;//TODO: allow insert in current caret position
        //this.setPredicate([this.predicate.slice(0, pos), string, this.predicate.slice(pos)].join(''));
        this.setPredicate(this.predicate+string);
        this.notifyUpdated();
    }
    setPredicateInput(input){
        this.predicateInput = input;
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

    insertSymbol(symbol){
        if (symbol == ")" || symbol == "(" || symbol == "!"){
            this.insertInPredicate(symbol)
        }else{
            this.insertInPredicate(` ${symbol} `)
        }
    }
    insertVariable(variable){
        this.insertInPredicate(variable)
    }
    varsValues() {
        return this.searchContainer.varsValues();
    }
    symbols(){
        return [{
            var:"&",value:"And"
        },{
            var:"|",value:"Or"
        }, {
            var:"->",value:"Implication"
        }, {
            var:"!",value:"Not"
        }, {
            var:"+",value:"Mod 2"
        }, {
            var:"(",value:"Left bracket"
        }, {
            var:")",value:"Right bracket"
        }]
    }

    goSearch() {
        this.validatePredicate();
        if (!this.validateMessage){
            this.handleClose();
            var prevStr = this.searchContainer.searchStrategy;
            this.searchContainer.setStrategy(SearchStrategy.DEFAULT);
            this.searchContainer.searchModels.push(this);
            this.searchContainer.goExtendedSearch();
            this.searchContainer.setStrategy(prevStr);
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