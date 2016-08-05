/**
 * Created by razorka on 04.08.16.
 */
import React, { Component, PropTypes } from 'react';

class TechnologiesAddForm extends Component{
    constructor(props){
        super(props);
        this.submitForm = this.submitForm.bind(this);
    }
    submitForm(e){
        e.preventDefault();
        let form = e.target;
       let data ={
           techName: form.elements['techName'].value,
           techDescription: form.elements['techDescription'].value
       };
       this.props.saveTechnologie(data);

    }
    render() {

        return (
            <form className="technologiesFormadd form" onSubmit={this.submitForm}>
                <input type="text" name="techName" className="form-control" placeholder="Введите название технологии"/>
                <textarea name="techDescription" placeholder="Введите описание технологии" className="form-control"></textarea>
                <input type="submit" className="btn btn-primary" value='Отправить'/>
            </form>
        )
    }
}
export default TechnologiesAddForm;