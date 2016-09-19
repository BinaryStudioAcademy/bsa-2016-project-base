import React, {Component, PropTypes} from 'react';
import TextFieldUI from '../../common/TextField-ui.js';
import { Col, FormControl, InputGroup } from 'react-bootstrap';
import styles from './styles.sass';
import FaSearch from 'react-icons/lib/fa/search';

class TechnologiesSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: '',
        };
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ item: e.target.value });
        this.props.technologiesSearch(e.target.value);
    }

    render() {
        return (
            <div className = "searchTech">
                    <FaSearch size={15} />
                                    <TextFieldUI
                        onChange={ this.onChange}
                        hintText="Search technology"
                        style={{width: "200px", display: "block", margin: "0 auto"}}
                    />
                </div>
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
