import React, { Component } from 'react';
import $ from 'jquery';

export class SelectComponent extends Component {

  componentDidMount() {
		const id = '#'+this.props.id;

		if (this.props.default) {
			$(id).val(this.props.default);
		}
		$(id).material_select();
    const self = this;
    $(id).on('change',function() {
      self.props.change(this.value);
    });
  }

  render() {
		let options = [];
		
		if (!(this.props.options instanceof Map)) {
		  return (<p>Invalid options</p>);
		}
		for(const [key, value] of this.props.options) {
			options.push(<option key={key} value={key}>{value}</option>);
		}
    return (
			<span>
      <select id={this.props.id}>
          <option value="" disabled selected>
            Choose your option
          </option>
					{options}
      </select>
				<label htmlFor={this.props.id}>{this.props.label}</label>
				</span>
    );
  }
}

export default SelectComponent;
