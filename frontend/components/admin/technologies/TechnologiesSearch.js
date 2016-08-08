import React, {Component, PropTypes} from 'react';
//import styles from './styles.sass';
import {Grid, FormControl, Row, Col, Button} from 'react-bootstrap';
import styles from  '../features/styles/Features.sass';
class TechnologiesSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: '',
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState(
            {
                item: e.target.value
            }
        );
        this.props.technologiesSearch(e.target.value);
    }

    render() {
        return (
            <Col xs={12} sm={12} md={7} lg={7}>
                <div className={styles['search-input-container']}>
                    <input placeholder="Search technology" className={styles['search-input']} type="text"
                           onChange={this.onChange} value={this.state.item}/>
                    <span className={styles['search-input-border']}></span>
                </div>
            </Col>
        )
    }
}
;

/*TagsTab.propTypes = {
 tags: PropTypes.array.isRequired,
 addTag: PropTypes.func.isRequired,
 removeTag: PropTypes.func.isRequired
 };*/


export default TechnologiesSearch;
