import React from 'react';
import $ from 'jquery';

/**
 * DynamicChips
 *
 * @class DynamicChips
 * @extends {React.Component}
 */
export default class DynamicChips extends React.Component {
  /**
   * Initialize materialize components
   *
   * @return {void}
   * @memberof Update
   */
  componentDidMount() {
    const facilitiesDOM = $('.facilities');
    facilitiesDOM.material_chip({
      placeholder: 'Center Facilities',
      data: this.props.value.split(',').map(facility => ({ tag: facility }))
    });

    /**
     * Initialize materialize chip component
     *
     * @return {void}
     */
    const chipChanged = () => {
      let facilities = facilitiesDOM.material_chip('data');
      facilities = Object.keys(facilities)
        .map(key => facilities[key].tag)
        .join(',');
      this.props.onChange({
        target: {
          value: facilities,
          id: 'facilities'
        }
      });
    };

    facilitiesDOM.on('chip.add', chipChanged);
    facilitiesDOM.on('chip.delete', chipChanged);
  }

  render() {
    return (
      <div className="row">
        <div className="input-field col s12 m12 l12">
          <div className="chips facilities" />
        </div>
      </div>
    );
  }
}
