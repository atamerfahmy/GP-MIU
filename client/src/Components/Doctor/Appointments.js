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
  useEffect(() => {
    const getData = async () => {
      const res = await axiosInstance.get(`/doctors/getDocAppointments`);
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

  return (
    <div>
      <SecNavBar link="/doctor/appointments" />
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
            </thead>
            {typeof appointments != undefined
              ? appointments
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
