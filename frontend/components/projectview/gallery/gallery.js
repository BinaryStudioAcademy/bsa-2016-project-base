import React from 'react';
import Gallery from 'react-photo-gallery';

class Screenshots extends React.Component {
    render() {
    return (
        <Gallery photos={PHOTO_SET} />
    );
    }
}

const PHOTO_SET = [
  {
    src: 'http://lorempixel.com/250/150/nature/1/',
    width: 600,
    height: 600,
    aspectRatio: 1.5,
    lightboxImage:{
    src: 'http://lorempixel.com/1000/600/nature/1/',
    srcset: [
      'http://lorempixel.com/250/150/nature/1/'
    ]
    }
  },
  {
    src: 'http://lorempixel.com/250/150/nature/2/',
    width: 600,
    height: 600,
    aspectRatio: 1,
    lightboxImage:{
    src: 'http://lorempixel.com/1000/600/nature/2/',
    srcset: [
      'http://lorempixel.com/1000/600/nature/2/'
    ]
    }
  },
   {
    src: 'http://lorempixel.com/250/150/nature/3/',
    width: 600,
    height: 600,
    aspectRatio: 1,
    lightboxImage:{
    src: 'http://lorempixel.com/1000/600/nature/3/',
    srcset: [
      'http://lorempixel.com/1000/600/nature/3/'
    ]
    }
  }
];

export default Screenshots;