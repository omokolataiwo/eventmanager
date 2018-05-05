import React from 'react';
import $ from 'jquery';
import img1 from '../../images/slider/1.jpg';
import img2 from '../../images/slider/2.jpg';
import img3 from '../../images/slider/3.jpg';
import img4 from '../../images/slider/4.jpg';
import img5 from '../../images/slider/5.jpg';
import img6 from '../../images/slider/6.jpg';
import img7 from '../../images/slider/7.jpg';

/**
 * Slider
 *
 * @class Slider
 * @extends {React.Component}
 */
class Slider extends React.Component {
  /**
   * Initialize materialize slider
   *
   * @returns {void}
   * @memberof Slider
   */
  componentDidMount() {
    $('.slider').slider({ full_width: true });
  }
  /**
   * Renders Slider component
   *
   *
   * @returns {object} - JSX DOM
   * @memberof Slider
   */
  render() {
    return (
      <div className="carousel carousel-slider banner">
        <div className="slider">
          <ul className="slides">
            <li>
              <img src={img5} alt="Slider5" />
            </li>
            <li>
              <img src={img6} alt="Slider6" />
            </li>
            <li>
              <img src={img7} alt="Slider7" />
            </li>
            <li>
              <img src={img1} alt="Slider1" />
            </li>
            <li>
              <img src={img2} alt="Slider2" />
            </li>
            <li>
              <img src={img3} alt="Slider3" />
            </li>
            <li>
              <img src={img4} alt="Slider4" />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Slider;
