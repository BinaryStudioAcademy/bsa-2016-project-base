import React from 'react';
import Gallery from 'react-photo-gallery';
import styles from '../project-view.sass';

class Screenshots extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            width: 600,
            height: 300,
            aspectRatio: 1.5
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

export default Screenshots;