import  React from 'react';
import styles from '../project-view.sass';

export default class Location extends React.Component {

    constructor(){
        super();
        this.state = { zoom: 8 }
    } 

    componentDidUpdate(prevProps) {
        const {location, contacts} = this.props['data'],
            prevLocation = prevProps['data'].location;

        if((location['lat'] != prevLocation['lat']) || (location['lng'] != prevLocation['lng'])){
            var info = new google['maps'].InfoWindow({
                content: `<div class='locationMap-MarkerContent'>
                    <div>
                        <span>Contact person:</span>
                        <span>${contacts['contactPerson']}</span>
                    </div>
                    <div>
                        <span>Email:</span>
                        <span>${contacts['email']}</span>
                    </div>
                    <div>
                        <span>Phone:</span>
                        <span>${contacts['phone']}</span>
                    </div>
                    <div >
                        <span>Skype:</span>
                        <span>${contacts['skype']}</span>
                    </div>
                    <div>
                        <span>Country:</span>
                        <span>
                            ${contacts['countryCode']} 
                            ${contacts['countryName']}
                        </span>
                    </div>
                    <div>
                        <span>City:</span>
                        <span>${contacts['city']}</span>
                    </div>
                </div>`

            }), map = new google['maps'].Map(this.refs['map'],{
                center: location, 
                zoom: this.state['zoom']
            }), marker = new google['maps'].Marker({
                map: map,
                position: location
            })
            marker.addListener('click',()=>{
                info.open(map, marker);
            });
        }
    }

    render() {
        return (
            <div className={styles['locationMap-Container']}>
                <header className={styles['locationMap-Header']}>
                    <h2>Location</h2>
                </header>
                <div className={styles['locationMap-Content']} ref="map"/>
            </div>    
        );
    }
}
