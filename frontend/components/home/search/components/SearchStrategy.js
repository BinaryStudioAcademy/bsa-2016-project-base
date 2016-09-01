import React from "react"
import {PropTypes} from "react"
import SearchContainer from "./../models/SearchContainer";
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import SearchStrategy from "./../const/SearchStratrgy";
const styles = {
    inline: {
        display: 'flex', flexDirection: 'row'
    },
    radioButton: {
        width:"150px"
    },
};
export default class SearchStrategyComponent extends React.Component {
    constructor() {
        super()
        this.onChange = this.onChange.bind(this)
    }

    static get propTypes() {
        return {
            model:PropTypes.instanceOf(SearchContainer)
        }
    }
    onChange(e,value){
        const {model} = this.props;
        model.setStrategy(value);
    }
    render() {
        const {model} = this.props;
        const buttons = Object.keys(SearchStrategy).map((key,i)=>{
            const str = SearchStrategy[key];
            return <RadioButton
                key={i}
                value={str}
                label={SearchStrategy[key]}
                style={styles.radioButton}
            />
        });
        return <div>
                <div style={{margin:"5px"}}>Select Search Strategy</div>
                <RadioButtonGroup name="searchStrategy"
                                  valueSelected={model.searchStrategy}
                                  onChange={this.onChange}
                                  style={styles.inline}>
                    {buttons}
                </RadioButtonGroup>
            </div>
    }
}