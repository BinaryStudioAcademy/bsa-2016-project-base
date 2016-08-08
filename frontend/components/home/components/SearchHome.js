import React, { Component } from 'react';
import { FormControl, FormGroup, InputGroup, Glyphicon, Col, DropdownButton, MenuItem } from 'react-bootstrap';
import styles from './SearchHome';

export default class SearchHome extends Component {

    render() {

        return (
            <Col xs={12} sm={6} smOffset={3}>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            className={ styles.search }
                            type="text"
                            placeholder="Type to filter..."
                            // onInput ={ filter }
                            // value={ search }
                        />
                        <InputGroup.Addon className={ styles.searchSign }>
                            <Glyphicon glyph="search" className={ styles.searchIcon } />
                        </InputGroup.Addon>
                        <DropdownButton title="Sort" id="bg-nested-dropdown">
                            <MenuItem eventKey="1">Type</MenuItem>
                            <MenuItem eventKey="2">Date modified</MenuItem>
                        </DropdownButton>
                    </InputGroup>
                </FormGroup>
            </Col>
        )
    }
}