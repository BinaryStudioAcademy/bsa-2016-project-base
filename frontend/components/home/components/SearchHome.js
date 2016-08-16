import React, { Component } from 'react';
import { Form, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import Technologie from './Technologie';
import styles from './SearchHome.sass';
import FaSearch from 'react-icons/lib/fa/search'; 

export default class SearchHome extends Component {

    static propTypes = {
        filter: React.PropTypes.func.isRequired,
        filterByTech: React.PropTypes.func.isRequired,
        orderBy: React.PropTypes.func.isRequired,
        search: React.PropTypes.string.isRequired,
        technologies: React.PropTypes.array.isRequired
    };

    render() {
        const { filter, search, technologies, filterByTech, orderBy } = this.props;

        return (
            <div className={ styles.searchContainer }>
                <div className={ styles['project-search'] }>
                    <div className={styles['search-wrapper']}>
                        <FaSearch size={15} />
                        <input 
                            type="search"
                            placeholder="Enter project name..."
                            onInput={ filter }
                            value={ search }
                            className={styles["input-search"]}
                        />
                    </div>
                </div>
                <div className={styles['display-flex']}>
                    <div className={styles.sort}>
                          <span className={styles['search-order-tooltip']} >Sort by:</span>
                          <input type="radio" name="sort" value="newest" id="sort-by-newest" defaultChecked onChange={orderBy}/>
                          <label htmlFor="sort-by-newest">Newest</label>
                          <input type="radio" name="sort" value="oldest" id="sort-by-oldest" onChange={orderBy}/>
                          <label htmlFor="sort-by-oldest">Oldest</label>
                          <input type="radio" name="sort" value="completed" id="sort-by-completed" onChange={orderBy}/>
                          <label htmlFor="sort-by-completed">Completed</label>
                    </div>
                    {(technologies.length) ?
                        <div className={styles.filter}>
                            <span className={ styles['filter-tooltip'] }>Filter by:</span>
                            {technologies.map((tech, key) => {
                             return (
                               <Technologie
                                 key={key}
                                 name={tech}
                                 filter={filterByTech} />
                                );
                            })}
                        </div> : null
                      }
                </div>
            </div>
        )
    }
}




