import React, { Component } from 'react';
import { Form, FormGroup, InputGroup, FormControl, Button } from 'react-bootstrap';
import Technologie from './Technologie';
import styles from './SearchHome.sass';
import FaSearch from 'react-icons/lib/fa/search';
import DropDown from '../../common/dd';
import DropDownF from '../../common/ddFilter';
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
            <div className={styles["home-content-row"]}>
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
                                id:'sort-by-completed'
                            }
                        ]}
                        onItemSelect={orderBy}
                        type="Sort By"
                    />



                     {(technologies.length) ?
                        <div className={styles.filter}>
                            <DropDownF
                                data={
                                    technologies.map((tech, key) => {
                                        return {
                                            value: tech,
                                            name: tech,
                                            id: tech
                                        }
                                    })
                                }
                                type="Filter By"
                                onItemSelect={filterByTech}
                            />
                        </div> : null
                    }

                </div>
            </div>
        )
    }
}




