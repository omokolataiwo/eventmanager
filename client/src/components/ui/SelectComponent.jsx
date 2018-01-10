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
		if (!Array.isArray(this.props.options)) {
		  return (<p>Invalid options</p>);
		}
	
    return (
			<span>
      <select id={this.props.id}>
          <option value="" disabled selected>
            Choose your option
          </option>
            {this.props.options.map((option, i) => {
		 return(<option key={i} value={i+1}>{option}</option>)
          })}
      </select>
				<label htmlFor={this.props.id}>{this.props.label}</label>
				</span>
    );
  }
}

export default SelectComponent;
