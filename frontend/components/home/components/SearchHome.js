import React, { Component } from 'react';
import { Form, FormGroup, InputGroup, FormControl, Button, Radio, Checkbox } from 'react-bootstrap';
import styles from './SearchHome.sass';

export default class SearchHome extends Component {

    render() {

        return (
            <Form>
                <FormGroup className={styles['form-group']} >
                    <InputGroup>
                        <FormControl
                            className={ styles['form-control'] }
                            type="text"
                            placeholder="Type to search..."
                            /*onInput ={ filter }
                             value={ search }*/
                        />
                        <InputGroup.Button>
                            <Button className={["material-icons", styles['button-search']]} >search</Button>
                        </InputGroup.Button>
                    </InputGroup>
                </FormGroup>

                <div className={styles['display-flex']} >
                    <FormGroup className={styles['choose-sort']} >
                        Sort by:
                        <input type="radio" name="sort" value="ranking" id="sort-by-ranking" defaultChecked />
                        <label htmlFor="sort-by-ranking">ranking</label>
                        <input type="radio" name="sort" value="update" id="sort-by-update" />
                        <label htmlFor="sort-by-update">update date</label>
                        <input type="radio" name="sort" value="download" id="sort-by-download" />
                        <label htmlFor="sort-by-download">downloads</label>
                    </FormGroup>

                    <FormGroup className={styles['choose-platform']} >
                        <input type="checkbox" name="platform" value="windows" id="platform-windows" defaultChecked />
                        <label htmlFor="platform-windows">Windows</label>
                        <input type="checkbox" name="platform" value="linux" id="platform-linux" defaultChecked />
                        <label htmlFor="platform-linux">Linux</label>
                        <input type="checkbox" name="platform" value="osx" id="platform-osx" />
                        <label htmlFor="platform-osx">OS X</label>
                        <input type="checkbox" name="platform" value="android" id="platform-android" />
                        <label htmlFor="platform-android">Android</label>
                        <input type="checkbox" name="platform" value="ios" id="platform-ios" />
                        <label htmlFor="platform-ios">iOS</label>
                    </FormGroup>
                </div>
            </Form>
        )
    }
}