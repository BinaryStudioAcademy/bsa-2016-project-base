import React, {Component, PropTypes} from 'react';
import styles from './styles.sass';
import {Col, FormControl, InputGroup} from 'react-bootstrap';
import TextInput from '../../common/TextInput.js';
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
            <Col>
                    <InputGroup>
                        <TextInput
                            className={styles['search-input']}
                            onChange={this.onChange}
                            placeholder="Search technology"
                            value={this.state.item}
                        />
                    </InputGroup>
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
