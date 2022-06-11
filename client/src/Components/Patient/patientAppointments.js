import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Nav, NavItem, NavLink, Table } from "reactstrap";
import Cookies from "js-cookie";
import axiosInstance from '../../utils/axiosInstance';


class PatientAppointments extends Component {
	constructor(props) {
		super(props);
		this.state = {
			appointments: [],
		};
	}
	async componentDidMount() {
		axiosInstance.get(`/patients/getAppointments`).then((res) => {
			console.log(res)

			if (res.status === 200) {
				this.setState({
					appointments: res.data.appointments
				});
			}
		})
	}
	render() {
		return (
			<div>
				<Nav tabs>
					<NavItem>
						<NavLink>
							<Link to="/patient/doctors">Doctor List</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>
							<Link to="/patient/bookAppointment">
								Book Appointment
							</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink>
							<Link to="/patient/profile">
								Edit Profile
							</Link>
						</NavLink>
					</NavItem>
					<NavItem>
						<NavLink active>
							<Link to="/patient/patientAppointments">
								View Appointments
							</Link>
						</NavLink>
					</NavItem>
				</Nav>
				<Table>
					<thead>
						<th>Appointment Id</th>
						<th>Name</th>
						<th>Email</th>
						<th>Description</th>
						<th>Date</th>
						<th>Attachements</th>
					</thead>
					<tbody>
						{this.state.appointments.map((appointment) => {
							return (
								<tr>
									<td>{appointment._id}</td>
									<td>{appointment.doctorName}</td>
									<td>{appointment.doctorEmail}</td>
									<td>{appointment.description}</td>
									<td>{(new Date(appointment.date)).toDateString()}</td>
									<td>
										<Button onClick={() => window.open(appointment.photoURL)} disabled={!(appointment.photoURL)} color="primary">Show Attachement</Button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		);
	}
}

export default PatientAppointments;
