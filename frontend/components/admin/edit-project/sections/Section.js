import React, { Component, PropTypes } from 'react';
import { Button } from '../../../common/';
import styles from './styles/Section.sass';
import ReduxToastr, {toastr} from 'react-redux-toastr'
class Section extends Component {
    constructor(props) {
        super(props);
        this.sendDeleteRequest = this.sendDeleteRequest.bind(this);
    }
    sendDeleteRequest() {
        const toastrConfirmOptions = {
            onOk: () => this.props.removeSection(this.props.section._id),
            onCancel: () => ''
        };
        toastr.confirm('Are you sure about that?', toastrConfirmOptions)
    }
    render() {
        const {section,  isActive, onClick} = this.props;
        console.log('isActive ',isActive);
        return (
            <div
                className={styles["section"]}
                onClick={onClick && ((e) => onClick(e, section._id))}>
                <div className={( isActive ? styles["active"] : '' )} >
                    {section.name}
                </div>
                <Button
                    className={styles["btnIcon"] + ' ' + styles["btnFeature"]}
                    label='Remove'
                    onClick={this.sendDeleteRequest}
                >
                    <i className="fa fa-times" aria-hidden="true"></i>
                </Button>
            </div>
        );
    }
}

Section.propTypes = {
    section: PropTypes.object.isRequired,
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Section;