import React, {Component} from "react";
import $ from "jquery";
import "materialize-css";

export class NigerianStateComponent extends Component {
    componentDidMount() {
	NigerianStateComponent.statesOptions($('#states'));
	$("#states").material_select();
	let _this = this;
	$('#states').on('change', function(e){
	   _this.props.change(this.value);
	});
    }
    static statesOptions(select) {
	let states = ['Lagos','Abuja'];

  states.forEach((state, i) => {
    select.append(
      '<option value="' + (i + 1) + '">' + state + "</option>\n"
    );
  });
}

    render() {
	return (
	   <div className="input-field col s12 m4 l4">
	     <select id="states">
	     <option value="" disabled selected>Choose your option</option>                               </select>
	     <label>States</label>
	     </div>
	);
    }
}
