import React, { Component } from 'react';
import { Form, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import Technologie from './Technologie';
import styles from './SearchHome.sass';
import FaSearch from 'react-icons/lib/fa/search'; 
import DropDown from '../../common/dd';
console.log(DropDown);
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
                  <DropDown
                    data={[
                      {
                        value:'newest',
                        name:'Newest',
                        id:'sort-by-newest'
                      },
                       {
                        value:'oldest',
                        name:'Oldest',
                        id:'sort-by-oldest'
                      },
                       {
                        value:'completed',
                        name:'Completed',
                        id:'sort-by-oldest'
                      }
                      ]}
                      onItemSelect={orderBy}
                      type="Sort By"
                  />
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




