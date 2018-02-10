import React from 'react';
import CenterImg from '../../../images/party-room.jpg';

export class Index extends React.Component {
	render() {
		return (
			<div className="container container-medium">
				<div className="row event-center-detailed">
					    <div className="col s12 m5 l5 card">
              <div className="event-center">
                <img src={CenterImg} alt="Event Center" />
                
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

									<div><span className="highlight">Hosted</span> 300 events | 25 events <span  className="highlight">Pending</span></div>
                  <div className="btn">Modify Center</div>
							</div>
				</div>

				<div className="row">
					<div className="col s12 m12 l12">
						<div className="filters right">
							<span>Gear</span>
							<span>State</span>
						</div>
					</div>

					<div className="col s12 m12 l12">
						<div className="row">
							    <div className="col s12 m4 l4 card">
              <div className="event-center">
                <img src={CenterImg} alt="Event Center" />
                <div className="over-img">
                  <h4>Royal Court</h4>
                  <p>Lagos</p>
                  
                </div>
              </div>
									</div>

									<div className="col s12 m4 l4 card">
              <div className="event-center">
                <img src={CenterImg} alt="Event Center" />
                <div className="over-img">
                  <h4>Royal Court</h4>
									 <p>Lagos</p>
                </div>
              </div>
									</div>

									<div className="col s12 m4 l4 card">
              <div className="event-center">
                <img src={CenterImg} alt="Event Center" />
                <div className="over-img">
                  <h4>Royal Court</h4>
                  <p>Lagos</p>
                  
                </div>
              </div>
            </div>
						</div>
					</div>
				</div>
			</div>
				
		);
	}
}
