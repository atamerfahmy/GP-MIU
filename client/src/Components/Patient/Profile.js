import jwt from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
} from 'reactstrap';
import axiosInstance from '../../utils/axiosInstance';

function Profile() {
  const [patientDetails, setPatientDetails] = useState({});
  const { _id } = jwt(localStorage.getItem('token'));
  useEffect(() => {
    axiosInstance.get(`/patients/${_id}`).then((res) => {
      console.log(res)

      if (res.status === 200) {
        setPatientDetails(res.data.patient);
      }
    })
    
  }, []);
  const handleSubmit = async () => {
    const res = await axiosInstance.patch(`/patients/${_id}`, {
      ...patientDetails,
    });
  };

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
            <Link to="/patient/bookAppointment">Book Appointment</Link>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink active>
            <Link to="/patient/profile">Edit Profile</Link>
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
      <Row className="mt-4">
        <Col>
          <h1>Edit Profile</h1>
          <Form>
            <FormGroup>
              <Row mt="3">
                <Col sm="2">
                  <Label>Name</Label>
                </Col>
                <Col sm="10">
                  <Input
                    value={patientDetails.name}
                    onChange={(e) =>
                      setPatientDetails({
                        ...patientDetails,
                        name: e.target.value,
                      })
                    }
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row mt="3">
                <Col sm="2">
                  <Label>Email</Label>
                </Col>
                <Col sm="10">
                  <Input
                    value={patientDetails.email}
                    onChange={(e) =>
                      setPatientDetails({
                        ...patientDetails,
                        email: e.target.value,
                      })
                    }
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row mt="3">
                <Col sm="2">
                  <Label>Phone Number</Label>
                </Col>
                <Col sm="10">
                  <Input
                    value={patientDetails.phone}
                    onChange={(e) =>
                      setPatientDetails({
                        ...patientDetails,
                        phone: e.target.value,
                      })
                    }
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Row mt="3">
                <Col sm="2">
                  <Label>Adress</Label>
                </Col>
                <Col sm="10">
                  <Input
                    value={patientDetails.address}
                    onChange={(e) =>
                      setPatientDetails({
                        ...patientDetails,
                        address: e.target.value,
                      })
                    }
                  />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Button onClick={() => handleSubmit()}>Submit</Button>
            </FormGroup>
          </Form>
        </Col>
        <Col sm="6"></Col>
      </Row>
    </div>
  );
}

export default Profile;
