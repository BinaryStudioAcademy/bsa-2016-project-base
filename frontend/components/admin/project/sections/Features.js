import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/admin/UpsertProjectActions';
import { Button, TextInput, TextFieldTags, RaisedButtonUITags} from '../../../common/';
import Section from './Section';
import Feature from './Feature';
import CreateFeature from './CreateFeature';
import styles from './styles/Features.sass';

class Features extends Component {
    constructor(props) {
        super(props);
        this.state = {
        	sectionName: '',
        	 featureName: '',
        	isModalActive: false
        }
        this.setNewSectionName = this.setNewSectionName.bind(this);
        this.addNewSection = this.addNewSection.bind(this);
        this.onSectionSelected = this.onSectionSelected.bind(this);
        this.renderFeatures = this.renderFeatures.bind(this);
        this.showCreateFeatureModal = this.showCreateFeatureModal.bind(this);
        this.closeCreateFeatureModal = this.closeCreateFeatureModal.bind(this);
        this.addNewFeature = this.addNewFeature.bind(this);
        this.setNewFeatureName = this.setNewFeatureName.bind(this);
    }
    setNewSectionName(e){
    	this.setState({
    		sectionName: e.target.value.trim()
    	});
    }
    addNewSection(e) {
    	const {sectionName} = this.state;
    	if (sectionName) {
            this.props.postSection({
                name:sectionName,
                description: ''
            });
    		this.setState({
    			sectionName: ''
    		})
    	}
    }
    onSectionSelected(e, id) {
    	this.props.selectSection(id);
    }
    showCreateFeatureModal() {
    	console.log('showCreateFeatureModal');
    	this.setState({
    		isModalActive: true
    	})
    }
    closeCreateFeatureModal() {
    	console.log('closeCreateFeatureModal');
    	this.setState({
    		isModalActive: false
    	})
    }
    addNewFeature(descriptionHTMLText) {
    	
    	this.setState({
    		isModalActive: false
    	})
    	const {featureName} = this.state;
    	const {activeSection} = this.props;

    	console.log('addNewFeature featureName',featureName);
    	console.log('addNewFeature featureName',descriptionHTMLText);

    	this.props.postFeature({
    		featureName,
    		descriptionHTMLText,
    		section: activeSection._id
    	})
    }
     setNewFeatureName(e) {
        this.setState({
            featureName: e.target.value.trim()
        })
    }


    renderFeatures(featuresList, sectionsList){
    	const {sections, activeSection} = this.props;

    	const addFeature = (
    		<div className={styles['add-section2']}>
                <div className={styles['col-1-2']}>
                    <TextFieldTags 
                        hintText='Feature Name' 
                        onChange={this.setNewFeatureName}
                        style={{width: '100%'}}
                        value={this.state.featureName}
                    />
                </div>
                <div className={styles['col-1-2']}>
                    <RaisedButtonUITags
                        label='Add'
                        onClick={this.showCreateFeatureModal}
                        backgroundColor='#8D97A4'
                    />
                </div>
            </div>
        );



    	if (featuresList.length) {
    		return (
    			<div>
    				{addFeature}
                    <ul className={styles['section-list1']}>
                        {featuresList}
                    </ul>
    			</div>
    		);
    	
    	} else if(sectionsList.length && !activeSection.name) {
    		return (
                 <ul className={styles['section-list1']}>
                    <div className={styles.empty}>'Select section on the left side to start adding new features!'</div>
                </ul>);
    	} else if(!sectionsList.length) {
    		return (
                <ul className={styles['section-list1']}>
                    <div className={styles.empty}>'Add new section first!'</div>
                </ul>);
    	} else if(activeSection.name) {
    		return (
    			<div>
    				{addFeature}
    				<ul className={styles['section-list1']}>
                       <div className={styles.empty}>There are no features in <span className={styles["section-name"]}>{activeSection.name}</span> section yet. Start adding new features...</div>
                    </ul>
	            </div>
    		);
    	}
    	//{(featuresList.length ? featuresList : `There are no features in ${activeSection.name} yet. Start adding new features...`)}
    }

    render(){
    	const {sections, features, activeSection} = this.props;
    	console.log('sections ',sections);
    	const sectionsList = sections.map( section => {
    		return (
    			<Section
    				 key={section._id}
    				 section={section}
    				 isActive={activeSection._id === section._id}
    				 onClick={this.onSectionSelected}
    			/>
    		);
    	});

    	const featuresList = features.map( feature => {
    		if (feature.section === activeSection._id) {
    			return (
	    			<Feature
	    				 key={feature._id}
	    				 feature={feature}
	    				 isActive={false}
	    				 
	    			/>
    			);
    		}
    		
    	});
    	
    	//<div key={section._id}>{section.name}</div>
    	return (

    		<div id={styles['features-list']}>
                {(this.state.isModalActive && (<CreateFeature 
                    onClose={this.closeCreateFeatureModal}
                    onSave={this.addNewFeature}
                />) )}
                
                <div className={styles.row}>
                    <div className={styles['list-container']}>
                        <header className={styles['sections-list-header']}>
                            <div className={styles['col-1-2']}>
                                <h3>Sections</h3>
                            </div>
                        </header>
                        <div className={styles['add-section2']}>
                            <div className={styles['col-1-2']}>
                                <TextFieldTags 
                                    hintText='Section Name' 
                                    placeholder='My first project'
                                    onChange={this.setNewSectionName}
                                    style={{width: '100%'}}
                                    value={this.state.sectionName}
                                />
                            </div>
                            <div className={styles['col-1-2']}>
                                <RaisedButtonUITags
                                    label='Add'
                                    onClick={this.addNewSection}
                                    backgroundColor='#8D97A4'
                                />
                            </div>

                        </div>
                        <ul className={styles['section-list1']}>
                                {(sectionsList.length ? sectionsList : <div className={styles.empty}>"There are no sections yet. Start from adding one..."</div>)}
                        </ul>
                    </div>
                    <div className={styles['list-container']}>
                        <header className={styles['sections-list-header']}>
                            <div className={styles['col-1-2']}>
                                <h3>Features</h3>
                            </div>
                        </header>
                        <div className={styles['sections-list']}>
                            {this.renderFeatures(featuresList, sectionsList)}
                        </div>
                    </div>
                </div>
                <hr />
            </div>
    	);
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actions, dispatch);
};

function mapStateToProps(state) {
    return {
        sections: state.UpsertProjectReducer.sections,
        features:  state.UpsertProjectReducer.features,
        activeSection: state.UpsertProjectReducer.activeSection
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Features);
