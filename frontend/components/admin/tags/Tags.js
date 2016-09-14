import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as actions from '../../../actions/admin/AdminTagActions';
import TagsList from './TagsList';
import TextFieldTags from '../../common/TextFieldUI_Tags';
import CheckBoxTags from '../../common/CheckBoxUI_Tags';
import Button from '../../common/RaisedButtonUI_Tags';
import FaSearch from 'react-icons/lib/fa/search';
import ReduxToastr, {toastr} from 'react-redux-toastr';
import styles from './tags.sass';

class Tags extends Component {
	constructor(props) {
	    super(props);
	    this.addTag = this.addTag.bind(this);
	    this.searchTag = this.searchTag.bind(this);
	    this.selectOne = this.selectOne.bind(this);
	    this.selectAll = this.selectAll.bind(this);
	    this.setTagName = this.setTagName.bind(this);
	    this.deleteMany = this.deleteMany.bind(this);
	}
	componentWillMount() {
		this.props.getTags();
		this.props.setFilterTerm('');
		this.props.filterTags();
	}
	selectOne(e, id){
		let checked = e.target.checked;
		this.props.selectOne(id, checked);
	}
	setTagName(e){
		let tagName = e.target.value.trim();
		if (tagName.length <= 14) {
			this.props.setTagName(tagName);
		}
		
	}
	addTag(e){
		let { tagNameToAdd } = this.props;
		if (tagNameToAdd) {
			this.props.addTag({tagName:tagNameToAdd});
			this.props.setTagName('');
		}
	}

	searchTag(e){
		let term = e.target.value.trim();
		let { isAllChecked } = this.props;
		if (!isAllChecked) {
			this.props.selectAll(false);
		} 
		this.props.setFilterTerm(term);
		this.props.filterTags();
	}
	selectAll(e){
		let checked = e.target.checked;
		e.target.checked = !checked;
		this.props.selectAll(checked);
	}
	deleteMany(e){
		let { tags } = this.props;
		let trash = [];
		let tagNamesToRemove = [];
		tags.forEach(tag => {
			if (tag.checked) {
				trash.push(tag._id);
				tagNamesToRemove.push(tag.tagName)
			}
		});
		/*if (trash.length) {
		this.props.deleteTags(trash);
		this.props.selectAll(false);
		}*/
		if (trash.length) {
			const toastrConfirmOptions = {
				onOk: () => {
					this.props.deleteTags(trash);
					this.props.selectAll(false);
				},
				onCancel: () => ''
			};
			toastr.confirm('Are you sure about removing following tags: ' +
					tagNamesToRemove.map(name=>`"${name}"`).join(", ") + " ?", toastrConfirmOptions)
		}
		
	}
 	render() {
 		let { tags, isAllChecked, tagNameToAdd } = this.props;
	    return (
	    	<div className={styles["tags-tab"]} id={styles["tags"]}>
	    			<div className={styles["tags-panel-top"]}>
				    	<div className={styles["tags-tools"]}>
				    		<div className={styles.col}>
				    			<FaSearch size={15} />
				    			<TextFieldTags
				    				id='search-tags'
									hintText='search tags'
									onChange={this.searchTag}
				  				/>
				  			</div>
				    		<div className={styles.col}>







				    		<Button
				    			className={styles["button-add-tags"]}
				    			label='Remove'
				    			onClick={this.deleteMany}
				    			backgroundColor='#FC5A5A'
				    		/>
				    		</div>
				    		<div className={styles.col}>
				    			<TextFieldTags
				    				id='add-tags'
				    				value={tagNameToAdd}
				    				hintText="tag's name"
				    				onChange={this.setTagName}

				    			/>
				    			<Button
				    				className={styles["button-add-tags"]}
				    				label='Add tag'
				    				onClick={this.addTag}
				    				backgroundColor='#8D97A4'
				    			/>
				    		</div>
				   		</div>
				    </div>
				    <TagsList
				    	tags={tags}
				    	selectOne={this.selectOne}
				    />
				 
	    	</div>
	    )
	}
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
};

function mapStateToProps(state) {
    return {
        isAllChecked: state.AdminTagReducer.isAllChecked,
        tagNameToAdd: state.AdminTagReducer.tagNameToAdd,
        searchTerm: state.AdminTagReducer.searchTerm,
        tags: state.AdminTagReducer.tags,
        error: state.AdminTagReducer.error
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
/*
Removed MarkAll
 <CheckBoxTags
 label="Mark All"
 checked={isAllChecked}
 onSelect={this.selectAll}
 />
 */