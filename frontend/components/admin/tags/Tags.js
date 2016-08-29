import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Grid, Row, Panel } from 'react-bootstrap';
import * as actions from '../../../actions/admin/AdminTagActions';
import RemoveTags from './RemoveTags';
import TagsSearch from './TagsSearch';
import TagsList from './TagsList';
import AddTag from './AddTag';
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
	componentDidMount() {
		this.props.getTags();
	}
	selectOne(e, id){
		let checked = e.target.checked;
		this.props.selectOne(id, checked);

	}
	setTagName(e){
		let tagName = e.target.value.trim();
		this.props.setTagName(tagName);
		e.target.value = '';
	}
	addTag(e){
		let { tagNameToAdd } = this.props.store.AdminTagReducer;
		if (tagNameToAdd) {
			this.props.addTag({tagName:tagNameToAdd});
		}
	}

	searchTag(e){
		let term = e.target.value.trim();
		let { isAllChecked } = this.props.store.AdminTagReducer;
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
		let { tags } = this.props.store.AdminTagReducer;
		let trash = []
		tags.forEach(tag => {
			if (tag.checked) {
				trash.push(tag._id);
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
			toastr.confirm('Are you sure about that?', toastrConfirmOptions)
		}
		
	}
 	render() {
 		let { tags, isAllChecked } = this.props.store.AdminTagReducer;
	    return (
	    	<div className={styles["tags-tab"]} id={styles["tags"]}>
	    			<ReduxToastr/>
	    			<div className={styles["tags-panel-top"]}>
				    	<div className={styles["tags-tools"]}>
				    		<div className={styles.col}>
				    			<FaSearch size={15} />
				    			<TextFieldTags
									hintText='search tags'
									onChange={this.searchTag}
				  				/>
				  			</div>
				    		<div className={styles.col}>
				    		<CheckBoxTags
				    			label="Mark All"
				    			checked={isAllChecked}
				    			onSelect={this.selectAll}
				    		/>
				    		<Button
				    			label='Remove'
				    			onClick={this.deleteMany}
				    			backgroundColor='#FC5A5A'
				    		/>
				    		</div>
				    		<div className={styles.col}>
				    			<TextFieldTags
				    				hintText="tag's name"
				    				onBlur={this.setTagName}

				    			/>
				    			<Button
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
        store: state
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
