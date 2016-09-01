import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../../actions/admin/UpsertProjectActions';
import { Button, TextInput } from '../../../common/';
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
        this.removeSection = this.removeSection.bind(this);
        this.removeFeature = this.removeFeature.bind(this);
    }
    setNewSectionName(e){
    	this.setState({
    		sectionName: e.target.value
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
	removeSection(id){
		const {sections,features} = this.props;
		let featuresToDelete = [];
		features.forEach(function (el,indx) {
			if(el.section === id){
				featuresToDelete.push(el);
			}
		});
		this.props.deleteSection(id,sections,featuresToDelete);
	}
	removeFeature(id){
		const {features} = this.props;
		this.props.deleteFeature(id,features);
	}
    onSectionSelected(e, id) {
		const {features} = this.props;
    	this.props.selectSection(id,features);
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
    	});
         this.setState({
            featureName: ''
        });
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
    	});
        this.setState({
            featureName: ''
        });
    }
     setNewFeatureName(e) {
        this.setState({
            featureName: e.target.value
        });
    }

    renderFeatures(featuresList, sectionsList){
    	const {sections, activeSection} = this.props;

    	const addFeature = (
    		<div className={styles['add-section']}>
               	<TextInput
                    value={this.state.featureName}
                    placeholder='Type feature name'
                    onChange={this.setNewFeatureName}
                />
                <Button 
                    value="Add"  
                    onClick={this.showCreateFeatureModal}
                />   
        	</div>);



    	if (featuresList.length) {
    		return (
    			<div>
    				{addFeature} {featuresList}
    			</div>
    		);
    	
    	} else if(sectionsList.length && !activeSection.name) {
    		return 'Select section on the left side to start adding new features!';
    	} else if(!sectionsList.length) {
    		return 'Add new section first!';
    	} else if(activeSection.name) {
    		return (
    			<div>
    				{addFeature}
    				<div>
	    				There are no features in <span className={styles["section-name"]}>{activeSection.name}</span> section yet. Start adding new features...
	    			</div>
	    			
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
					 removeSection={this.removeSection}
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
						 removeFeature={this.removeFeature}
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

                    <div>
                    <div className={styles['list-container']}>
                    	Sections:
                    	<div className={styles['sections-list']}>
	                    	 <div className={styles['add-section']}>
			                   	<TextInput
			                        value={this.state.sectionName}
			                        placeholder='Type section name'
			                        onChange={this.setNewSectionName}
			                    />
			                    <Button 
			                        value="Add"  
			                        onClick={this.addNewSection}
			                    />   
	                    	</div>
                    	{(sectionsList.length ? sectionsList : "There are no sections yet. Start from adding one...")}
                    	
	                    </div>
	                   
                    </div>
                     <div className={styles['list-container']}>
                     	Features:
                      	<div className={styles['sections-list']}>
                      		{this.renderFeatures(featuresList, sectionsList)}
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
        sections: state.UpsertProjectReducer.sections,
        features:  state.UpsertProjectReducer.features,
        activeSection: state.UpsertProjectReducer.activeSection
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Features);