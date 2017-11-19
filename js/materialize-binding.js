 var STATES = ['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','Federal Capital Territory','Gombe',
  'Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara'];

 $(document).ready(function() {
 	statesOptions($('#state'));

  searchEventByState($('.adminsearch'))

 	$(document).ready(function(){
    $('ul.tabs').tabs();
  });

 	numberedOptions($('#estimated_hour'), 1, 24)
/*
 	$('#state').change(function(){
 		alert(this.value)
 	})*/

 	$('select').material_select();
 	$('#start_date, #end_date').pickadate({
 		selectMonths: false, 
 		selectYears: 15, 
 		today: 'Today',
 		clear: 'Clear',
 		close: 'Ok',
 		closeOnSelect: true
 	});

 	$('#time').pickatime({
    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Cancel', // Text for cancel-button
    autoclose: false, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    aftershow: function(){} //Function for after opening timepicker
  });

  $('.carousel.carousel-slider').carousel({fullWidth: true});

 });

 function statesOptions(select) {
 	var states = STATES;

 	states.forEach((state, i) => {
 		select.append('<option value="' + (i+1) + '">'+ state + '</option>' + "\n");
 	});
 }

 function numberedOptions(select, from, to) {
 	while (from <= to) select.append('<option value="' + (from) + '">'+ (from++) +'</option>' + "\n");
 	//Stage, CCTV, AC, Projector
 }

 function searchEventByState(div) {
  var states = STATES;
  states.forEach((state, i) => {
    var numberActive = 0;
    var active = (numberActive = Math.floor(Math.random() * 10)) ? '<span class="pending orange-text">'+ numberActive + '</span> ' : ""; 
    div.append('<a href="#" data-state-code="' + i + '">' + active + state + '</a>');
  })
 }



