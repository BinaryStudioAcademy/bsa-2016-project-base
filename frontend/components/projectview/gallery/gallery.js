import React from 'react';
import Gallery from '../../common/gal';
import styles from '../project-view.sass';

export default class Screenshots extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            width: 600,
            height: 300,
            aspectRatio: 2.5
        }
    }

    render() {
        let screenshots = [];
        for(let i in this.props['data']) screenshots.push({
            src: this.props.data[i],
            width:  this.state['width'],
            height: this.state['height'],
            aspectRatio: this.state['aspectRatio'],
            lightboxImage: {
                src: '',
                srcset: [ this.props.data[i] ]
            }
        });
        return (
            <div className={styles['screenshots']}>
                <Gallery photos={screenshots} />
            </div>
        );
    }
}