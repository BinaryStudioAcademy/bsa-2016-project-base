import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/admin/UpsertProjectActions';
import { Button, TextInput, TextFieldTags, RaisedButtonUITags} from '../../../common/';
import TagItem from './TagItem';
import styles from './styles/Tags.sass';

class Tags extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	tagName: ''
        }
        this.addTagToProject = this.addTagToProject.bind(this);
        this.removeTagFromProject = this.removeTagFromProject.bind(this);
        this.onTagNameChange = this.onTagNameChange.bind(this);
        this.addNewTagToProject = this.addNewTagToProject.bind(this);
    }
   
    addTagToProject(e, tagId) {
        if (tagId) this.props.addTagToProject(tagId);
    }
    removeTagFromProject(e, tagId) {
        if (tagId) this.props.removeTagFromProject(tagId);
    }
    onTagNameChange(e){
        let tagName = e.target.value;
        if (tagName.length <= 14) {
        	this.setState({
        		tagName: tagName
        	});
        }
    }
    addNewTagToProject(e) {
    	const {tagName} = this.state;
    	if (tagName) {
            this.props.postTag({
                tagName
            });
    		this.setState({
    			tagName: ''
    		})
    	}
    }
    render(){
    	const { tags } = this.props;
    	const predefinedTags = tags.map( tag => {
    		if (!tag.inProject) {
    			return (
                    <TagItem 
                        key={tag._id}
                        tag={tag}
                        onAddClick={this.addTagToProject}
                    />
    			);
    		}
    	});
    	const usedTags = tags.map( tag => {
    		if (tag.inProject) {
    			return (
                     <TagItem 
                        key={tag._id}
                        tag={tag}
                        onRemoveClick={this.removeTagFromProject}
                    />	
    			);
    		}
    	});
    	
    	return (
            <div id={styles['tags-list']}>
                <div className={styles.row}>
                    <div className={styles['list-container']}>
                        <header className={styles['tags-list-header']}>
                            <div className={styles['col-1-2']}>
                                <h3>All tags</h3>
                            </div>
                        </header>
                        
                        <div className={styles['section-list1']}>
                                {predefinedTags}
                        </div>
                        
                        <div className={styles['add-section2']}>
                            <div className={styles['col-1-2']}>
                                <TextFieldTags 
                                    hintText='Add new tag' 
                                    onChange={this.onTagNameChange}
                                    style={{width: '100%'}}
                                    value={this.state.tagName}
                                />
                            </div>
                            <div className={styles['col-1-2']}>
                                <RaisedButtonUITags
                                    label='Add'
                                    onClick={this.addNewTagToProject}
                                    backgroundColor='#8D97A4'
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles['list-container']}>
                        <header className={styles['tags-list-header']}>
                            <div className={styles['col-1-2']}>
                                <h3>Used tags</h3>
                            </div>
                        </header>
                        <div className={styles['section-list1']}>
                                {usedTags}
                        </div>
                    </div>
                </div>                                
            </div>
    	);
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
};

function mapStateToProps(state) {
    return {
        tags: state.UpsertProjectReducer.tags,
        tagExists: state.UpsertProjectReducer.tagExists
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
