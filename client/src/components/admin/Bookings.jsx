import React from 'react';

export class Bookings extends React.Component {
	render() {
		return (
			<div className="container container-medium">
				<h5>Bookings</h5>
				<div>
					<div className="chip">7 Active Events</div> <div className="chip">320 Concluded Events</div> <div className="chip">5 Centers</div>
				</div>
				<div className="row">
					<div className="col s12 m12 l12">						
						<table className="bordered responsive-table">
							<thead>
								<tr>
									<th>Event Title</th>
									<th>Date</th>
									<th>Venue</th>
									<th>State</th>
									<th>user-icon Est. Audience</th>
									<th>Status</th>
								</tr>
							</thead>
							<tbody>
							<tr>
								<td>Birthday Bash</td>
								<td>7-4-2014</td>
								<td>Havila Gold Outdoor Event Center</td>
								<td>Osun</td>
								<td>700</td>
								<td>Concluded</td>
							</tr>
														<tr>
								<td>Street Carnival</td>
								<td>7-4-2018 - 12-4-2018 (2 days)</td>
								<td>Havila Gold Outdoor Event Center</td>
								<td>Osun</td>
								<td>2500</td>
								<td>Active</td>
							</tr>
						</tbody>
						</table>
					</div>
				</div>

								<div className="row">
									<div className="col s12 m4 l4">
										<ul className="collection">
											<li className="collection-item">
						Havilla Gold Event Center - Osun
											</li>
											<li className="collection-item">
						Beauty Celeb Center - Osun
											</li>
											<li className="collection-item">
						Flow Event Center - Lagos
											</li>
											
										</ul>
					</div>
									<div className="col s12 m8 l8">
										<h6>Events</h6>
														<ul className="collection">
											<li className="collection-item">14-3-2014 - Birthday Bash </li>
											<li className="collection-item">9-3-2018 - Street Carnival</li>
											</ul>
					</div>
				</div>
				
			</div>
		);
	}
}
