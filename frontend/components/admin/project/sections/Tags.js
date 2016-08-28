import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/admin/UpsertProjectActions';
import { Button, TextInput, TextFieldTags, RaisedButtonUITags} from '../../../common/';
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
    	const { tags } = this.props;
    	const predefinedTags = tags.map( tag => {
    		if (!tag.inProject) {
    			return (
    				<div key={tag._id} className={styles["tag"]}>
	    				<span>{tag.tagName}</span>
		    			<Button onClick={(e) => this.addTagToProject(e, tag._id)}>
		            		<i className="fa fa-plus" aria-hidden="true"></i>
		            	</Button>
	            	</div>
    			);
    		}
    	});
    	const usedTags = tags.map( tag => {
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
    	});
    	
    	return (
            <div id={styles['tags-list']}>
                <header className={styles['tags-header']}>
                    <h2>Tags</h2>
                </header>
                <div className={styles.row}>
                    <div className={styles['list-container']}>
                        <header className={styles['tags-list-header']}>
                            <div className={styles['col-1-2']}>
                                <h3>Tags</h3>
                            </div>
                        </header>
                        <div className={styles['add-section2']}>
                            <div className={styles['col-1-2']}>
                                <TextFieldTags 
                                    hintText='Add new tag' 
                                    placeholder='My first project'
                                    onChange={this.onTagNameChange}
                                    style={{width: '100%'}}
                                    value={this.state.tagName}
                                />
                            </div>
                            <div className={styles['col-1-2']}>
                                <RaisedButtonUITags
                                    label='Add'
                                    onAdd={this.addNewTagToProject}
                                    backgroundColor='#8D97A4'
                                />
                            </div>
                        </div>
                        <ul className={styles['section-list1']}>
                                {predefinedTags}
                        </ul>
                    </div>
                </div>
                <fieldset>
                    <legend>Tags</legend>
                    <div className={styles['tag-name']}>
                    <TextInput
                        value={this.state.tagName}
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
                <fieldset>
                    <legend>Tags</legend>
                    <div className={styles['tag-name']}>
                    <TextInput
                        value={this.state.tagName}
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
        tags: state.UpsertProjectReducer.tags,
        tagExists: state.UpsertProjectReducer.tagExists
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tags);