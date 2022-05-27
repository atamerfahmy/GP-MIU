import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
	Button,
	Form,
	FormGroup,
	Input,
	Label,
	NavItem,
	NavLink,
	Nav,
	Row,
	Col,
	InputGroupButtonDropdown,
} from "reactstrap";
import Cookies from "js-cookie";
import axiosInstance from '../../utils/axiosInstance';


class BookAppointment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			Name: "",
			Email: "",
			Contact: "",
			Age: "",
			Date: "",
			Speciality: "",
			Description: "",
			Id: "",
		};
		this.inputRef = React.createRef();
	}
	handleSubmit(e) {
		console.log(this.state);

		let { Contact, Date, Description, Speciality, Id } = this.state;

		if(!Contact || !Date || !Description || !Speciality || !Id){
			return alert("Please fill in all the required fields");
		}

		axiosInstance.post(`/patients/bookAppointment`, {
			doctorId: this.state.Id,
			date: this.state.Date,
			description: this.state.Description,
			speciality: this.state.Speciality,
			contact: this.state.Contact
		}).then((res) => {
			console.log(res)

			if (res.status === 200) {
				alert("Appointments is booked successfully.");
				this.setState({
					Name: "",
					Email: "",
					Contact: "",
					Age: "",
					Date: "",
					Speciality: "",
					Description: "",
					Id: "",
				})
			}else{
				alert("Something went wrong!")
			}
		})
	}
	// componentDidMount() {
	// 	this.inputRef.current.focus();
	// }
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
						<NavLink active>
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
						<NavLink>
							<Link to="/patient/patientAppointments">
								View Appointments
							</Link>
						</NavLink>
					</NavItem>
				</Nav>
				<Row>
					<Col md="3"></Col>
					<Col md="6">
						<Form className="mt-3">
							{/* <FormGroup>
								<Label>Name *</Label>
								<Input
									innerRef={this.inputRef}
									type="text"
									value={sessionStorage.getItem(
										"patientName"
									)}
									onChange={(e) => {
										this.setState({ Name: e.target.value });
									}}
								/>
							</FormGroup> */}
							{/* <FormGroup>
								<Label>Email</Label>
								<Input
									type="email"
									value={sessionStorage.getItem(
										"patientEmail"
									)}
									onChange={(e) => {
										this.setState({
											Email: e.target.value,
										});
									}}
								/>
							</FormGroup> */}
							<FormGroup>
								<Label>Contact</Label>
								<Input
									type="text"
									value={sessionStorage.getItem(
										"patientContact"
									)}
									onChange={(e) => {
										this.setState({
											Contact: e.target.value,
										});
									}}
								/>
							</FormGroup>
							{/* <FormGroup>
								<Label>Age *</Label>
								<Input
									type="number"
									onChange={(e) => {
										this.setState({ Age: e.target.value });
									}}
								/>
							</FormGroup> */}
							<FormGroup>
								<Label>Date</Label>
								<Input
									type="date"
									onChange={(e) => {
										console.log(e.target.value)
										this.setState({ Date: e.target.value });
									}}
								/>
							</FormGroup>
							<FormGroup>
								<Label>Speciality</Label>
								<Input
									type="text"
									onChange={(e) => {
										this.setState({
											Speciality: e.target.value,
										});
									}}
								/>
							</FormGroup>
							<FormGroup>
								<Label>Description</Label>
								<Input
									type="text"
									onChange={(e) => {
										this.setState({
											Description: e.target.value,
										});
									}}
								/>
							</FormGroup>
							<FormGroup>
								<Label>Doctor Id *</Label>
								<Input
									type="text"
									onChange={(e) => {
										this.setState({ Id: e.target.value });
									}}
								/>
							</FormGroup>
							<FormGroup>
								<Button
									color="primary"
									onClick={() => this.handleSubmit()}
								>
									Submit
								</Button>
							</FormGroup>
						</Form>
					</Col>
				</Row>
			</div>
		);
	}
}
export default BookAppointment;
