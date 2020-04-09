import React, { useEffect, useState } from 'react';
import { Container, Button } from 'reactstrap';
import 'swagger-ui-react/swagger-ui.css';
import TableComponent from '../TableComponent';
import axios from 'axios';
import AddButton from '../Button';
import Modal from '../Modal';

axios.defaults.baseURL = ' https://my-json-server.typicode.com/andrascsilla/user_project_db';

const header = [
  { id: '1', value: 'Description' },
  { id: '2', value: 'Hours' },
  { id: '4', value: 'Start Date' },
  { id: '5', value: 'End Date' },
  { id: '6', value: 'Assigned to' },
  { id: '7', value: '' },
];

function Projects() {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(`/projects`).then(resp => {
      setProjects(resp.data);
    });
  }, []);

  useEffect(() => {
    axios.get(`/users`).then(resp => {
      setUsers(resp.data);
    });
  }, []);

  function assigned(id) {
    let assignedTo = '';
    users.forEach(user => {
      if (id === user.id) {
        assignedTo = user.name;
      }
    });
    return assignedTo;
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
        {projects.map(project => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>{project.hours}</td>
            <td>{project.startDate}</td>
            <td>{project.endDate}</td>
            <td>{assigned(project.userID)}</td>
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

export default Projects;
