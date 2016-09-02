import React from "react"
import {PropTypes} from "react"
import SearchContainer from "./../models/SearchContainer";
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import SearchStrategy from "./../const/SearchStratrgy";
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
const styles = {
    inline: {
        display: 'flex', flexDirection: 'row'
    },
    radioButton: {
        width:"150px"

    },
};

const muiTheme = getMuiTheme({
  redioButton: {
    borderColor: '#8D97A4',
    checkedColor: "#2ecc71",
  },
});
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
                iconStyle={{marginRight: '.5rem'}}
                labelStyle={{fontFamily: 'Lato, sans-serif', fontSize: '0.9rem'}}
            />
        });
        return <div className='search-strategy'>
                <div style={{marginRight :"1rem", fontSize: '0.9rem'}}>Select Search Strategy:</div>
                <RadioButtonGroup name="searchStrategy"
                                  valueSelected={model.searchStrategy}
                                  onChange={this.onChange}
                                  style={styles.inline}>
                    {buttons}
                </RadioButtonGroup>
            </div>
    }
}