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

    },
};
export default class searchStrategyComponent extends React.Component {
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
                <h5>Search strategy</h5>
                <RadioButtonGroup name="searchStrategy"
                                  valueSelected={model.searchStrategy}
                                  onChange={this.onChange}>
                    {buttons}
                </RadioButtonGroup>
            </div>
    }
}