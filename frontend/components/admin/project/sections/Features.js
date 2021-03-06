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
        this.removeSection = this.removeSection.bind(this);
        this.removeFeature = this.removeFeature.bind(this);
    }
    setNewSectionName(e){
        let sectionName = e.target.value;
        if (sectionName.length <= 30) {
            this.setState({
                sectionName: sectionName
            });
        }
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
        let featuresToStay = [];
		features.forEach(function (el,indx) {
			if(el.section === id){
				featuresToDelete.push(el);
			}else{
                featuresToStay.push(el);
            }
		});
		this.props.deleteSection(id,sections,featuresToDelete,featuresToStay);
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
    	this.setState({
    		isModalActive: true
    	})
    }
    closeCreateFeatureModal() {
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
        let featureName = e.target.value;
        if (featureName.length <= 30) {
            this.setState({
                featureName: featureName
            });
        }
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
    }

    render(){
    	const {sections, features, activeSection} = this.props;
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
