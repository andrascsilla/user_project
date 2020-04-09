import React, { useEffect, useState } from 'react';
import { Container, Button } from 'reactstrap';
import styled from 'styled-components';
import 'swagger-ui-react/swagger-ui.css';
import TableComponent from '../TableComponent';
import axios from 'axios';
import AddButton from '../Button';
import Modal from '../Modal';

axios.defaults.baseURL = ' https://my-json-server.typicode.com/andrascsilla/user_project_db';

const header = [
  { id: '1', value: 'Name' },
  { id: '2', value: 'Email' },
  { id: '3', value: 'Worked Hours' },
  { id: '4', value: 'Action' },
];

function Users() {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(`/users`).then(resp => {
      setUsers(resp.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`/projects`).then(resp => {
      setProjects(resp.data);
    });
  }, []);

  function workedhours(id) {
    let workedHours = 0;
    projects.forEach(project => {
      if (id === project.userID) {
        workedHours += project.hours;
      }
    });
    return workedHours;
  }

  const [isOpen, setModal] = useState(false);
  function toggleModal() {
    setModal(!isOpen);
  }
  return (
    <Container>
      <AddButton text="Add Button" onClick={toggleModal} />
      <Modal onClick={toggleModal} isOpen={isOpen} title="Add User" content={<p>Form</p>} />
      <TableComponent header={header} onClick={() => console.log('')}>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.workedHours + workedhours(user.id)}</td>
            <td>
              <Button color="info">Edit</Button>
              <Button color="danger">Delete</Button>
            </td>
          </tr>
        ))}
      </TableComponent>
    </Container>
  );
}

export default Users;
