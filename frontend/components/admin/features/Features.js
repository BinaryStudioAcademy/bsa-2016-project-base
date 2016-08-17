import React, { Component, PropTypes } from 'react';

import InsertFeature from './InsertFeature';
import FeaturesToolBar from './FeaturesToolBar'
import FeaturesList from './FeaturesList'

import styles from './styles/Features.sass';
class FeaturesTab extends Component {
	constructor(props) {
		super(props);
		this.state = {
			listCheckedFeatures: [],
			flagChecked: false
		};
		this.changeCheckedFeature = this.changeCheckedFeature.bind(this);
		this.markedAllFeatures = this.markedAllFeatures.bind(this);
		this.removeChecked = this.removeChecked.bind(this);
		this.unMarkAll = this.unMarkAll.bind(this);
	}

	unMarkAll() {
		this.setState({
			flagChecked: false
		})
	}

	removeChecked() {
		//this.state.listCheckedFeatures = [];
		//this.state.flagChecked = false;

		this.setState({
			listCheckedFeatures: [],
			flagChecked: false
		})
	}

	changeCheckedFeature(check, featureId, featureLength) {
		if(check) {

				this.state.listCheckedFeatures = [...this.state.listCheckedFeatures, featureId]

		}
		else if(!check) {
				this.state.listCheckedFeatures = this.state.listCheckedFeatures.filter(function(el) {
					if(el == featureId) {
						return false
					} else {
						return true;
					}
				})

		}
		//alert(featureLength);
		this.state.listCheckedFeatures.length == featureLength && featureLength!=0 ? this.setState({flagChecked: true}) : this.setState({flagChecked: false});
	}

	 markedAllFeatures(features, flagChecked) {
		if(features.length == 0) {
			return;
		}
		 if (flagChecked) {
		 	this.setState({
				listCheckedFeatures: features.map(function(feature) {
					return feature._id
				}),
				flagChecked: true
			})
		 } else {
			 this.setState({
				 listCheckedFeatures: [],
				 flagChecked: false
			 })
		 }

	 }

	render() {
		return (
			<div id="Features">
				<FeaturesToolBar removeChecked={this.removeChecked} listCheckedFeatures={this.state.listCheckedFeatures} markedAllFeatures={this.markedAllFeatures}
								 flagChecked={this.state.flagChecked} />
				<FeaturesList changeCheckedFeature={this.changeCheckedFeature} listCheckedFeatures={this.state.listCheckedFeatures}
							  flagChecked={this.state.flagChecked} />
				<InsertFeature unMarkAll={this.unMarkAll} />
			</div>
		)
	}
}






/*FeaturesTab.propTypes = {
 features: PropTypes.array.isRequired,
 addFuture: PropTypes.func.isRequired
 };*/

export default FeaturesTab;