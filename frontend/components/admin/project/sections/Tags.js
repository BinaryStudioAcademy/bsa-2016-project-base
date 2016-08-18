import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/admin/UpsertProjectActions';
import { Button, TextInput } from '../../../common/';
import styles from './styles/Tags.sass';

class Tags extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	newTagName: ''
        }
        this.addTagToProject = this.addTagToProject.bind(this);
        this.removeTagFromProject = this.removeTagFromProject.bind(this);
        this.onTagNameChange = this.onTagNameChange.bind(this);
        this.addNewTagToProject = this.addNewTagToProject.bind(this);
        this.removeNewTagFromProject = this.removeNewTagFromProject.bind(this);
        
    }
    addTagToProject(e, tagId) {
        console.log('addTagToProject ',tagId);
        if (tagId)  this.props.addTagToProject(tagId);
    }
    removeTagFromProject(e, tagId) {
        console.log('removeTagFromProject ',tagId);
        if (tagId) this.props.removeTagFromProject(tagId);
    }
    onTagNameChange(e){
    	this.setState({
    		newTagName: e.target.value.trim()
    	})
    	
    }
    addNewTagToProject(e) {
    	const {newTagName} = this.state;
    	if (newTagName) {
    		this.props.addNewTagToProject(newTagName);
    		this.setState({
    			newTagName: ''
    		})
    	}
    }
    removeNewTagFromProject(e, tagName) {
    	if (tagName) this.props.removeNewTagFromProject(tagName);
    }
    render(){
    	const { tags } = this.props.store;
    	const predefinedTags = tags.map( tag => {
    		if (!tag.inProject) {
    			return (
    				<div key={tag._id}>
	    				<span>{tag.tagName}</span>
		    			<Button onClick={(e) => this.addTagToProject(e, tag._id)}>
		            		<i className="fa fa-plus" aria-hidden="true"></i>
		            	</Button>
	            	</div>
    			);
    		}
    	});
    	const usedTags = tags.map( tag => {
    		if (tag.hasOwnProperty('_id')) {
	    		if (tag.inProject) {
	    			return (
	    				<div key={tag._id}>
		    				<span>{tag.tagName}</span>
			    			<Button onClick={(e) => this.removeTagFromProject(e, tag._id)}>
			            		<i className="fa fa-trash-o" aria-hidden="true"></i>
			            	</Button>
		            	</div>
	    			);
	    		}
    		} else {
    			if (tag.inProject) {
	    			return (
	    				<div key={tag.tagName}>
		    				<span>{tag.tagName}</span>
			    			<Button onClick={(e) => this.removeNewTagFromProject(e, tag.tagName)}>
			            		<i className="fa fa-trash-o" aria-hidden="true"></i>
			            	</Button>
		            	</div>
	    			);
	    		}
    		}
    	});
    	
    	return (
    		<div id={styles['tags-list']}>
                <fieldset>
                    <legend>Tags</legend>
                    <div className={styles['tag-name']}>
                    <TextInput
                        value={this.state.newTagName}
                        label='Add new tag' 
                        placeholder='Type tag name'
                        onChange={this.onTagNameChange}
                    />
                    <Button 
                        value="Add"  
                        onClick={this.addNewTagToProject}
                    />
                            
                </div>
                
                <div>
                    <div className={styles['list-container']}>
                    All tags:
                    <div className={styles['list']}>
                        {predefinedTags}
                    </div>
                    </div>
                   
                     <div className={styles['list-container']}>
                         Tags in project:
                         <div className={styles['list']}>
                            {usedTags}
                         </div>
                    </div>
                </div>
                </fieldset>
    			
                
            </div>
    	);
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
};

function mapStateToProps(state) {
    return {
        store: state.UpsertProjectReducer
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tags);