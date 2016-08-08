var React = require('react');
var Slider = require('react-slick');
import styles from './carousel.sass'

var SimpleSlider = React.createClass({
  render: function () {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      focusOnSelect: true
    };
    return (
      <Slider {...settings}>
        <div><img src='http://lorempixel.com/500/300/nature/1/'/></div>
        <div><img src='http://lorempixel.com/500/300/nature/2/'/></div>
        <div><img src='http://lorempixel.com/500/300/nature/3/'/></div>
        <div><img src='http://lorempixel.com/500/300/nature/1/'/></div>
        <div><img src='http://lorempixel.com/500/300/nature/2/'/></div>
        <div><img src='http://lorempixel.com/500/300/nature/3/'/></div>
        <div><img src='http://lorempixel.com/500/300/nature/1/'/></div>
        <div><img src='http://lorempixel.com/500/300/nature/2/'/></div>
        <div><img src='http://lorempixel.com/500/300/nature/3/'/></div>
      </Slider>
    );
  }
});

export default SimpleSlider;