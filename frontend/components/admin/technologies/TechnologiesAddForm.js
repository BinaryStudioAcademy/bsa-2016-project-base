/**
 * Created by razorka on 04.08.16.
 */
import React, {Component, PropTypes} from 'react';
import styles from './styles.sass';
class TechnologiesAddForm extends Component {
    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.state ={
            formState : this.props.formState
        }
    }

    submitForm(e) {
        e.preventDefault();
        let form = e.target;
        let data = {
            techName: form.elements['techName'].value,
            techDescription: form.elements['techDescription'].value
        };
        form.reset();
        this.props.saveTechnologie(data);

    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            formState: nextProps.formState
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.formState !== this.props.formState) {
            return true;
        } else {
            return false;
        }
    }

    render() {

        return (
            <div className={this.state.formState+" "+styles.form + " col-md-12"}>
                <form className="technologiesFormadd  col-md-8" onSubmit={this.submitForm}>
                    <div className="form-group"><p className={"col-md-4 " +styles.text}>Name of technology:</p>
                    <input type="text" name="techName" className={"form-control col-md-8 " +styles.add__form__input}
                           placeholder="Введите название технологии"/>
                        <div className={styles.clear}></div>
                    </div>
                    <div className="form-group">
                        <p className={"col-md-4 " +styles.text}>Description:</p>
                    <textarea name="techDescription" placeholder="Введите описание технологии"
                              className={"form-control col-md-9 "+ styles.add__form__textarea}></textarea>
                        <div className={styles.clear}></div>
                        </div>
                    <input type="submit" className={"btn "+ styles['btn-orange']} value='Send'/>
                </form>
            </div>
        )
    }
}
export default TechnologiesAddForm;