import React, {Component, PropTypes} from 'react';

class TechnologiesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listOfTechnologies: this.props.listOfTechnologies
        };
        this.addTechnologiesToDeleteData = this.addTechnologiesToDeleteData.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        //   console.log('componentWillReceiveProps', nextProps);

        this.setState({
            listOfTechnologies: nextProps.listOfTechnologies
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.listOfTechnologies.length !== this.props.listOfTechnologies.length) {
            return true;
        } else {
            return false;
        }
    }

    addTechnologiesToDeleteData(e){
        let id = e.target.id;
        let action;
        if(e.target.checked){
             action = 'add';
        }else{
             action = 'remove';
        }
    }

    render() {

        let {listOfTechnologies} = this.state;
        return (
            (listOfTechnologies.length > 0) ? <span>
                { listOfTechnologies.map((elem, index, array) => {
                    return <label key={elem._id} htmlFor={elem._id}>
                        <input onChange={this.addTechnologiesToDeleteData} type="checkbox" id={elem._id} value={elem.techName}/> {elem.techName}
                    </label>
                })}
            </span> : null
        )
    };
}
export default TechnologiesList;
