import jwt from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Row, Table } from 'reactstrap';
import axiosInstance from '../../utils/axiosInstance';
import Header from '../header';
import SecNavBar from '../Patient/secNavBar';
import NavBar from './NavBar';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [prescription, setPrescription] = useState('');
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const res = await axiosInstance.get(`/doctors/getDocAppointments`);
      console.log(res.data)
      if (res.status === 200) {
        setAppointments(res.data.appointments);
      }
    };
    getData();
  }, []);
  const handlePres = async (appointment) => {
    this.setState({ isOpen: false });
    console.log(this.state);
    console.log(appointment);
    await axiosInstance.post(`doctors/appointments/${appointment._id}`, {
      prescription: prescription,
    });
  };

  const attach = async (photo, appointmentId) => {
    try {
      
      let form = new FormData();
      form.append("photo", photo[0]);

      const res = await axiosInstance.post(`/doctors/addPhoto/${appointmentId}`, form);
      if (res.status === 200) {
        alert("Attachement is uploaded successfully.")
      }

    } catch (error) {
      alert("Something went wrong.")
    }
  }

  return (
    <div>
      <SecNavBar link="/" />
      {/* <Header msg={Cookies.get('patientName')} /> */}
      {/* <NavBar /> */}
      <Row>
        <Col className="mt-3" sm="3"></Col>
        <Col className="mt-3">
          {/* <Input
            style={{ width: '50%' }}
            placeholder="Search..."
            type="text"
            onChange={(e) => setSearch(e.target.value)}
          /> */}
          <Table
            striped
            style={{
              width: '50%',
              'box-shadow': '2px 2px 4px 4px #CCCCCC',
              marginTop: '30px',
            }}
          >
            <thead>
              <th>Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Phone Number</th>
              <th>Speciality</th>
              <th>Attachement</th>
            </thead>
            {typeof appointments != undefined
              && appointments? appointments
                  .filter((appointment) => {
                    if (search === '') {
                      return appointment;
                    } else if (
                      appointment.patientName
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    ) {
                      return appointment;
                    }
                  })
                  .map((appointment) => {
                    return (
                      <tr>
                        <td>{appointment.patientName}</td>
                        <td>{appointment.description}</td>
                        <td>{(new Date(appointment.date)).toDateString()}</td>
                        <td>{appointment.contact || "N/A"}</td>
                        <td>{appointment.speciality || "N/A"}</td>
                        <td>
                          {
                            appointment.photoURL?
                              <p>An attachement has already been uploaded.</p>
                              :
                              <input type={"file"} onChange={(event) => attach(event.target.files, appointment._id)} multiple={false} />
                          }
                        </td>
                        {/* {isOpen ? (
                          <td></td>
                        ) : (
                          <td>
                            <Button
                              style={{
                                backgroundColor: 'green',
                              }}
                              onClick={() => setOpen(true)}
                            >
                              Prescribe
                            </Button>
                          </td>
                        )} */}
                        {/* {isOpen ? (
                          <td
                            style={{
                              columnWidth: '200px',
                            }}
                          >
                            <Input
                              type="text"
                              onChange={(e) => setPrescription(e.target.value)}
                            />
                            <Button
                              style={{
                                backgroundColor: 'green',
                              }}
                              className="mt-2"
                              onClick={() => handlePres(appointment)}
                            >
                              Add
                            </Button>
                          </td>
                        ) : (
                          <td></td>
                        )} */}
                      </tr>
                    );
                  })
              : null}
          </Table>
        </Col>
      </Row>
    </div>
  );
}

export default Appointments;
