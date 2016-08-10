import React, { Component } from 'react';
import { FormControl, FormGroup, InputGroup, Glyphicon } from 'react-bootstrap';
import * as styles from "./SearchFeatures.sass"

export default class SearchFeatures extends Component {

    static propTypes = {
        filter: React.PropTypes.func.isRequired,
        search: React.PropTypes.string.isRequired
    };

    render() {

        const { filter, search } = this.props;

        return (
            <FormGroup>
                <InputGroup>
                    <FormControl
                        className={ styles.search }
                        type="text"
                        placeholder="Type to filter..."
                        onInput ={ filter }
                        value={ search }
                    />
                    <InputGroup.Addon className={ styles.searchSign }>
                        <Glyphicon glyph="search" className={ styles.searchIcon } />
                    </InputGroup.Addon>
                </InputGroup>
            </FormGroup>
        )
    }
}