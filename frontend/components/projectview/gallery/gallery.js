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
    src: 'https://pp.vk.me/c626531/v626531333/1e765/W_r9UPDJrFY.jpg',   /*thumbnail*/
    width: 600,
    height: 300,
    aspectRatio: 1.5,
    lightboxImage:{
    src: '',
    srcset: [
      'https://pp.vk.me/c626531/v626531333/1e765/W_r9UPDJrFY.jpg'
    ]
    }
  },
  {
    src: 'https://pp.vk.me/c626531/v626531333/1e76d/QkTuvShoWig.jpg',
    width: 600,
    height: 600,
    aspectRatio: 1.5,
    lightboxImage:{
    src: '',
    srcset: [
      'https://pp.vk.me/c626531/v626531333/1e76d/QkTuvShoWig.jpg'
    ]
    }
  },
   {
    src: 'https://pp.vk.me/c626531/v626531333/1e77d/3_d1w3oYhv0.jpg',
    width: 600,
    height: 600,
    aspectRatio: 1.5,
    lightboxImage:{
    src: '',
    srcset: [
      'https://pp.vk.me/c626531/v626531333/1e77d/3_d1w3oYhv0.jpg'
    ]
    }
  }
];

export default Screenshots;