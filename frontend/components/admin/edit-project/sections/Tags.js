import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/admin/EditProjectActions';
import { Button, TextInput } from '../../../common/';
import styles from './styles/Tags.sass';

import RaisedButtonUI from '../../../common/RaisedButtonUI_Tags.js';

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
    	this.setState({
    		tagName: e.target.value.trim()
    	});
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
        //alert([] == true);
    	const { tags, predefinedTags, initialTags } = this.props;
        //alert(initialTags);
        if(tags!= null && initialTags == false) {
            //alert("AGA!");
            this.props.initialStateTags(tags, predefinedTags);
        }

        //alert(JSON.stringify(tags));
    	const allUnUsedTags = predefinedTags.map( tag => {
    		if (!tag.inProject) {
    			return (
    				<div key={tag._id} className={styles.tagItem}>
	    				<span class={styles["tagName"]}>{tag.tagName}</span>
		    			<Button className={styles["btnIcon"]} onClick={(e) => this.addTagToProject(e, tag._id)}>
		            		<i className="fa fa-plus" aria-hidden="true"></i>
		            	</Button>
	            	</div>
    			);
    		}
    	});
    	const usedTags = predefinedTags.map( tag => {
    		if (tag.inProject) {
    			return (
    				<div key={tag._id} className={styles.tagItem}>
	    				<span class={styles["tagName"]}>{tag.tagName}</span>
		    			<Button className={styles["btnIcon"]} onClick={(e) => this.removeTagFromProject(e, tag._id)}>
		            		<i className="fa fa-trash-o" aria-hidden="true"></i>
		            	</Button>
	            	</div>
    			);
    		}
    	});
    	
    	return (
    		<div id={styles['tags-list']}>                
                <div className={styles['add-tag-block']}>
                    <TextInput
                        value={this.state.tagName}
                        label='Add new tag' 
                        placeholder='Type tag name'
                        onChange={this.onTagNameChange}
                    />
                    <RaisedButtonUI 
                        label="Add"  
                        onClick={this.addNewTagToProject}
                        backgroundColor='#8D97A4'
                    />      
                </div>
                <div>
                    <div className={styles['list-container']}>
                    All tags:
                    <div className={styles['list'] + ' ' + styles["listAll"]}>
                        {allUnUsedTags}
                    </div>
                    </div>
                   
                     <div className={styles['list-container']}>
                         Tags in project:
                         <div className={styles['list']  + ' ' + styles["listUsed"]}>
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
        tags: state.EditProjectReducer.tags,
        tagExists: state.EditProjectReducer.tagExists,
        predefinedTags: state.EditProjectReducer.predefinedTags,
        initialTags: state.EditProjectReducer.initialTags
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tags);