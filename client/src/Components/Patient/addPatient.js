import axios from "axios";
import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Nav, NavItem, NavLink } from "reactstrap";
import axiosInstance from '../../utils/axiosInstance';

const AddPatientForm = () => {

	const [patientName, setPatientName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [address, setAddress] = useState("");
	const [phone, setPhone] = useState("");
	const [sex, setSex] = useState("");
	const [birthdate, setBirthdate] = useState("");
	const [age, setAge] = useState("");
	const [bloodgroup, setBloodgroup] = useState("");

	const location = useLocation();

	const handleSubmit = async (e) => {
		if(patientName === "" || email === "" || password === ""){
			return alert("Pelase fill in the required fields");
		}

		try {
			const res = await axiosInstance.post('/patients/', {
				name: patientName,
				email,
				password,
				address,
				phone,
				sex,
				birthdate,
				age,
				bloodgroup
			});

			if(res.status === 200){
				setPatientName("");
				setEmail("");
				setPassword("");
				setAddress("");
				setPhone("");
				setSex("");
				setBirthdate("");
				setAge("");
				setBloodgroup("");

				alert("A new patient is created successfully.")
			}else{
				alert("Something went wrong.");
			}

		} catch (error) {
			alert("Something went wrong.");
		}


	}
	return (
		<div>
			<Nav tabs>
				<NavItem>
					<NavLink active={location?.pathname === "/admin/patients"}>
						<Link to="/admin/patients">Patient List</Link>
					</NavLink>
				</NavItem>
				<NavItem>
					<NavLink active={location?.pathname === "/admin/add_patient"}>
						<Link to="/admin/add_patient">Add Patient</Link>
					</NavLink>
				</NavItem>
			</Nav>
			<Form style={{ marginTop: "25px" }}>
				<FormGroup>
					<Row>
						<Col sm="2">
							<Label>Name *</Label>
						</Col>
						<Col sm="10">
							<Input
								type="text"
								value={patientName}
								onChange={(e) =>
									setPatientName(e.target.value)
								}
							/>
						</Col>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Col sm="2">
							<Label>Email *</Label>
						</Col>
						<Col sm="10">
							<Input
								type="email"
								value={email}
								onChange={(e) =>
									setEmail(e.target.value)
								}
							/>
						</Col>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Col sm="2">
							<Label>Password *</Label>
						</Col>
						<Col sm="10">
							<Input
								type="password"
								value={password}
								onChange={(e) =>
									setPassword(e.target.value)
								}
							/>
							<small>
								(Must be atleast of length 8 with one
								Uppercase,one Lowercase,a number and a
								special character)
							</small>
						</Col>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Col sm="2">
							<Label>Address</Label>
						</Col>
						<Col sm="10">
							<Input
								type="text"
								value={address}
								onChange={(e) =>
									setAddress(e.target.value)
								}
							/>
						</Col>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Col sm="2">
							<Label>Phone</Label>
						</Col>
						<Col sm="10">
							<Input
								type="phone"
								value={phone}
								onChange={(e) =>
									setPhone(e.target.value)
								}
							/>
						</Col>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Col sm="2">
							<Label>Sex</Label>
						</Col>
						<Col sm="10">
							<Input
								type="text"
								value={sex}
								onChange={(e) =>
									setSex(e.target.value)
								}
							/>
						</Col>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Col sm="2">
							<Label>Birthdate</Label>
						</Col>
						<Col sm="10">
							<Input
								type="text"
								value={birthdate}
								onChange={(e) =>
									setBirthdate(e.target.value)
								}
							/>
						</Col>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Col sm="2">
							<Label>Age *</Label>
						</Col>
						<Col sm="10">
							<Input
								type="number"
								value={age}
								onChange={(e) =>
									setAge(e.target.value)
								}
							/>
						</Col>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Col sm="2">
							<Label>Blood Group</Label>
						</Col>
						<Col sm="10">
							<Input
								type="text"
								value={bloodgroup}
								onChange={(e) =>
									setBloodgroup(e.target.value)
								}
							/>
						</Col>
					</Row>
				</FormGroup>
				<FormGroup>
					<Row>
						<Col sm="2"></Col>
						<Col sm="10">
							<Button onClick={(e) => handleSubmit()}>
								Submit
							</Button>
						</Col>
					</Row>
				</FormGroup>
			</Form>
		</div>
	);

}

export default AddPatientForm;