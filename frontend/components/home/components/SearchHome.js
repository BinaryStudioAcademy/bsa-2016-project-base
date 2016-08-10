import React, { Component } from 'react';
import { Form, FormGroup, InputGroup, FormControl, Button, Radio, Checkbox } from 'react-bootstrap';
import Technologie from './Technologie';
import styles from './SearchHome.sass';

export default class SearchHome extends Component {

    static propTypes = {
        filter: React.PropTypes.func.isRequired,
        search: React.PropTypes.string.isRequired
    };

    render() {

        const { filter, search, technologies, filterByTech } = this.props;
        
        return (
            <Form className={styles['search-form']} >
                <FormGroup className={styles['form-group']} >
                    <InputGroup>
                        <InputGroup.Button>
                            <Button className={["material-icons", styles['button-search']]} >search</Button>
                        </InputGroup.Button>
                        <FormControl
                            className={ styles['form-control'] }
                            type="text"
                            placeholder="Type to search..."
                            onInput ={ filter }
                            value={ search }
                        />
                    </InputGroup>
                </FormGroup>

                <div className={styles['display-flex']} >
                    <FormGroup className={styles['choose-sort']} >
                        <span className={styles['search-order-tooltip']} >Sort by:</span>
                        <input type="radio" name="sort" value="ranking" id="sort-by-ranking" defaultChecked />
                        <label htmlFor="sort-by-ranking">ranking</label>
                        <input type="radio" name="sort" value="update" id="sort-by-update" />
                        <label htmlFor="sort-by-update">update date</label>
                        <input type="radio" name="sort" value="download" id="sort-by-download" />
                        <label htmlFor="sort-by-download">downloads</label>
                    </FormGroup>

                    {(technologies.length) ?
                    <FormGroup className={styles['choose-platform']}>
                        {technologies.map((tech, key) => {
                            return (
                                <Technologie
                                    key={key}
                                    name={tech}
                                    filter={filterByTech} />
                            );
                        })}
                    </FormGroup> : null
                    }
                </div>
            </Form>
        )
    }
}