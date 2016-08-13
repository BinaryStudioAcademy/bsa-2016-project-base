import React, { Component } from 'react';
import { Form, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import Technologie from './Technologie';
import styles from './SearchHome.sass';

export default class SearchHome extends Component {

    static propTypes = {
        filter: React.PropTypes.func.isRequired,
        filterByTech: React.PropTypes.func.isRequired,
        orderBy: React.PropTypes.func.isRequired,
        search: React.PropTypes.string.isRequired,
        technologies: React.PropTypes.array.isRequired
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            searchHint: nextProps.searchHint
        });
    }

    render() {
        const { filter, search, technologies, filterByTech, orderBy,searchHint } = this.props;

        return (
            <Form id='search-home' className={styles['search-form']} >
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
                        <p className={styles['search-hint']}>{searchHint}</p>
                    </InputGroup>
                </FormGroup>

                <div className={styles['display-flex']} >
                    <FormGroup className={styles['choose-sort']} >
                        <span className={styles['search-order-tooltip']} >Sort by:</span>
                        <input type="radio" name="sort" value="newest" id="sort-by-newest" defaultChecked onChange={orderBy}/>
                        <label htmlFor="sort-by-newest">Newest</label>
                        <input type="radio" name="sort" value="oldest" id="sort-by-oldest" onChange={orderBy}/>
                        <label htmlFor="sort-by-oldest">Oldest</label>
                        <input type="radio" name="sort" value="completed" id="sort-by-completed" onChange={orderBy}/>
                        <label htmlFor="sort-by-completed">Completed</label>
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