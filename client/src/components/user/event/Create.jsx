import React from 'react';
import featuredCenterImg from '../../../images/party-room.jpg'

export class Create extends React.Component {
	render() {
		return (
			<div class="container container-medium card">
				<h5>Create Event</h5>
				<form>
					<div className="row">
						<div className="col input-field s12 m8 l8">
							<input type="text" className="validate" id="event-title" />
							<label htmlFor="event-title">Event Title</label>
						</div>
						<div className="row">

<div className="input-field col s12 m6 l6"> 
                                        <input id="start-date" type="text" className="validate" /> 
                                        <label htmlFor="start-date">Start Date</label></div>

<div className="input-field col s12 m6 l6"> 
                                        <input id="end-date" type="text" className="validate" /> 
                                        <label htmlFor="end-date">End Date</label></div>


						</div>
					</div>

					<div className="row event-center-detailed">
					    <div className="col s12 m5 l5 card">
              <div className="event-center">
                <img src={featuredCenterImg} alt="Event Center" />
                
              </div>
							</div>
							<div className="col s12 m7 l7">
                <h5>Royal Court
								</h5>
								<div><span className="location"><span>map</span>Lagos</span>
									&nbsp;<span className="type">Outdoor</span></div>
									<p className="amount">N70,000</p>
									<p className="capacity"><span>users</span> 3000 Capacity</p>
									<div>
										<div className="chip">Parking Space</div>
										<div className="chip">Security</div>
																				<div className="chip">CCTV</div>
									</div>

							</div>
					</div>
					<button className="btn ">Book Center</button>
				</form>

				<hr />
				<div className="row">
					<div className="col s12 m12 l12">
						<h5>Related Centers</h5>
					</div>
				</div>
				<div className="row center event_center">
											<div className="col s12 m12 l12">
												<div className="row">
													<div className="col s12 m4 l4 card">
              <div className="event-center">
                <img src={featuredCenterImg} alt="Event Center" />
                <div className="over-img">
                  <h4>Royal Court</h4>
                  <p>Amuwo Odofin | Lagos</p>
									<h4>N70,000</h4>
                  
                </div>
              </div>
													</div>

													<div className="col s12 m4 l4 card">
              <div className="event-center">
                <img src={featuredCenterImg} alt="Event Center" />
                <div className="over-img">
                  <h4>Royal Court</h4>
                  <p>Ikeja | Lagos</p>
									<h4>N300,000</h4>
                  
                </div>
              </div>
													</div>

													<div className="col s12 m4 l4 card">
              <div className="event-center">
                <img src={featuredCenterImg} alt="Event Center" />
                <div className="over-img">
                  <h4>Royal Court</h4>
                  <p>Lagos</p>
                  
                </div>
              </div>
            </div>
		
												</div>
<div className="row">
													<div className="col s12 m4 l4 card">
              <div className="event-center">
                <img src={featuredCenterImg} alt="Event Center" />
                <div className="over-img">
                  <h4>Royal Court</h4>
                  <p>Lagos</p>
                  
                </div>
              </div>
													</div>

													<div className="col s12 m4 l4 card">
              <div className="event-center">
                <img src={featuredCenterImg} alt="Event Center" />
                <div className="over-img">
                  <h4>Royal Court</h4>
                  <p>Lagos</p>
                  
                </div>
              </div>
            </div>
		
												</div>
												</div>
                       

                        <div class="col s12 m12 l12">
                            <ul class="pagination"> 
                                <li class="disabled">
                                    <a href="#!"><i class="mdi-navigation-chevron-left"></i></a>
                                </li>                                 
                                <li class="active">
                                    <a href="#!">1</a>
                                </li>                                 
                                <li class="waves-effect">
                                    <a href="#!">2</a>
                                </li>                                 
                                <li class="waves-effect">
                                    <a href="#!">3</a>
                                </li>                                 
                                <li class="waves-effect">
                                    <a href="#!">4</a>
                                </li>                                 
                                <li class="waves-effect">
                                    <a href="#!">5</a>
                                </li>                                 
                                <li class="waves-effect">
                                    <a href="#!"><i class="mdi-navigation-chevron-right"></i></a>
                                </li>                                 
                            </ul>                             
                        </div>
      </div>
			</div>
		);
	}
}
