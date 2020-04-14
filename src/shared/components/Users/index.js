import React, { useEffect, useState } from 'react';
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import styled from 'styled-components';
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
  const [isOpenAdd, setModalAdd] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [hours, setHours] = useState('');
  const [modalEdit, setModalEdit] = useState(false);

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

  function toggleModalAdd() {
    setModalAdd(!isOpenAdd);
  }

  function addUser(e) {
    e.preventDefault();
    const user = {
      name: name,
      email: email,
      hours: hours,
    };
    axios.post(`/users`, user).then(resp => {
      setUsers([...users, user]);
    });
    setModalAdd(!isOpenAdd);
  }

  function toggleModalEdit(id) {
    const currentUser = users.find(user => user.id === id);
    setModalEdit(currentUser);
  }

  function editUser(id) {
    const user = {
      name: name,
      email: email,
      hours: hours,
    };
    axios.put(`/users/${id}`, user).then(resp => {
      let res = users.filter(user => user.id !== id);
      setUsers([...res, users]);
    });
    setModalEdit(!modalEdit);
  }

  function deleteUser(id) {
    axios.delete(`/users/${id}`).then(res => {
      let result = users.filter(user => user.id !== id);
      setUsers(result);
    });
  }

  return (
    <Container>
      <AddButton text="Add User" onClick={toggleModalAdd} />
      <Modal
        onClick={toggleModalAdd}
        isOpen={isOpenAdd}
        title="Add User"
        content={
          <Form onSubmit={addUser}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="name"
                name="name"
                id="name"
                placeholder="Full name..."
                onChange={e => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email..."
                onChange={e => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="hours">Worked Hours</Label>
              <Input type="number" name="hours" id="hours" onChange={e => setHours(e.target.value)} />
            </FormGroup>
            <Button>Add User</Button>
          </Form>
        }
      />
      <TableComponent header={header} onClick={e => e.preventDefault()}>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.workedHours + workedhours(user.id)}</td>
            <td>
              <Button
                color="info"
                onClick={() => {
                  toggleModalEdit(user.id);
                }}
              >
                Edit
              </Button>
              {modalEdit && (
                <Modal
                  onClick={() => setModalEdit()}
                  isOpen={modalEdit}
                  title={modalEdit.name}
                  content={
                    <Form
                      onSubmit={e => {
                        e.preventDefault();
                        editUser(user.id);
                      }}
                    >
                      <FormGroup>
                        <Label for="name">Name</Label>
                        <Input
                          type="name"
                          name="name"
                          id="name"
                          placeholder="Full name..."
                          onChange={e => setName(e.target.value)}
                          value={name}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="email">Email</Label>
                        <Input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="Email..."
                          onChange={e => setEmail(e.target.value)}
                          value={email}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="hours">Worked Hours</Label>
                        <Input
                          type="number"
                          name="hours"
                          id="hours"
                          onChange={e => setHours(e.target.value)}
                          value={hours}
                        />
                      </FormGroup>
                      <Button>Update User</Button>
                    </Form>
                  }
                />
              )}

              <Button
                color="danger"
                onClick={e => {
                  e.preventDefault();
                  deleteUser(user.id);
                }}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </TableComponent>
    </Container>
  );
}

export default Users;
