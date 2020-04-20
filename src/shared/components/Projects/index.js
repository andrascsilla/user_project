import React, { useEffect, useState, useParams } from 'react';
import { Container, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'swagger-ui-react/swagger-ui.css';
import TableComponent from '../TableComponent';
import axios from 'axios';
import AddButton from '../Button';
import Modal from '../Modal';
import DatePicker from 'react-datepicker';
import { StyledActionButton } from '../Users';
import SearchField from '../SearchField';

axios.defaults.baseURL = ' https://my-json-server.typicode.com/andrascsilla/user_project_db';

const header = [
  { id: '1', value: 'Description' },
  { id: '2', value: 'Hours' },
  { id: '4', value: 'Start Date' },
  { id: '5', value: 'End Date' },
  { id: '8', value: 'Days' },
  { id: '6', value: 'Assigned to' },
  { id: '7', value: '' },
];

function Projects() {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isOpenAdd, setModalAdd] = useState(false);
  const [name, setName] = useState('');
  const [hours, setHours] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [to, setTo] = useState('');
  const [modalEdit, setModalEdit] = useState(false);
  const oneDay = 24 * 60 * 60 * 1000;

  //GET DATA
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

  //ASSIGNED
  function assigned(id) {
    let assignedTo = '';
    users.forEach(user => {
      if (id === user.id) {
        assignedTo = user.name;
      }
    });
    return assignedTo;
  }

  //ADD
  function toggleModalAdd() {
    setModalAdd(!isOpenAdd);
  }

  function addProject(e) {
    e.preventDefault();
    const project = {
      name: name,
      hours: hours,
      start: startDate,
      end: endDate,
      to: to,
    };
    axios.post(`/projects`, project).then(resp => {
      setProjects([...projects, project]);
    });
    setModalAdd(!isOpenAdd);
  }

  //EDIT
  function toggleModalEdit(id) {
    const currentProject = projects.find(project => project.id === id);
    setModalEdit(currentProject);
  }

  function editProject(id) {
    const project = {
      name: name,
      hours: hours,
      start: startDate,
      end: endDate,
      to: to,
    };
    axios.put(`/projects/${id}`, project).then(resp => {
      const editedProject = projects.map(project => (project.id === id ? modalEdit : project));
      setProjects(editedProject);
    });
    setModalEdit(!modalEdit);
  }

  //DELETE
  function deleteProject(id) {
    axios.delete(`/projects/${id}`).then(res => {
      let result = projects.filter(project => project.id !== id);
      setProjects(result);
    });
  }

  //SEARCH
  useEffect(() => {
    axios.get(`/projects`).then(resp => {
      setProjects(resp.data);
    });
  }, []);

  function search(project) {
    axios.get(`/projects?name=${project}`).then(res => {
      setProjects(res.data);
    });
  }

  return (
    <Container>
      <SearchField labelText="Search:" placeholder="Type a name here..." buttonText="Search" onSubmit={search} />
      <AddButton text="Add Button" onClick={toggleModalAdd} />
      <Form>
        <DatePicker
          selected={startDate}
          onChange={date => console.log(JSON.stringify(date))}
          selectsStart
          startDate={startDate}
          endDate={endDate}
        />
        <DatePicker
          selected={endDate}
          onChange={date => setEndDate(date)}
          selectsEnd
          startDate={startDate}
          endDate={endDate}
          minDate={startDate}
        />
        <Button>Filter</Button>
      </Form>
      <Modal
        onClick={toggleModalAdd}
        isOpen={isOpenAdd}
        title="Add Project"
        content={
          <Form onSubmit={addProject}>
            <FormGroup>
              <Label for="description">Project Name</Label>
              <Input
                type="input"
                name="description"
                id="description"
                placeholder="Project name..."
                onChange={e => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="hours">Estimated Hours</Label>
              <Input type="number" name="hours" id="hours" onChange={e => setHours(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="startDate">Start Date</Label>
              <DatePicker selected={startDate} onChange={date => JSON.stringify(setStartDate(date))} />
            </FormGroup>
            <FormGroup>
              <Label for="endDate">End Date</Label>
              <DatePicker selected={endDate} onChange={date => JSON.stringify(setEndDate(date))} />
            </FormGroup>
            <FormGroup>
              <Label for="assigned">Assigned To</Label>
              <Input type="select" name="assigned" id="assigned" onChange={e => setTo(e.target.value)}>
                <option>Assigne to...</option>
                {users.map(user => (
                  <option>{user.name}</option>
                ))}
              </Input>
            </FormGroup>
            <Button>Add Project</Button>
          </Form>
        }
      />
      <TableComponent header={header} onClick={() => console.log('')}>
        {projects.map(project => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>{project.hours}</td>
            <td>{JSON.stringify(project.startDate)}</td>
            <td>{JSON.stringify(project.endDate)}</td>
            <td>{Math.round(Math.abs((Date.parse(project.startDate) - Date.parse(project.endDate)) / oneDay))}</td>
            <td>{assigned(project.userID)}</td>
            <td>
              <StyledActionButton
                color="info"
                onClick={() => {
                  toggleModalEdit(project.id);
                }}
              >
                Edit
              </StyledActionButton>
              {modalEdit && (
                <Modal
                  onClick={() => setModalEdit()}
                  isOpen={modalEdit}
                  title={modalEdit.name}
                  content={
                    <Form
                      onSubmit={e => {
                        e.preventDefault();
                        editProject(modalEdit.id);
                      }}
                    >
                      <FormGroup>
                        <Label for="description">Project Name</Label>
                        <Input
                          type="input"
                          name="description"
                          id="description"
                          placeholder="Project name..."
                          onChange={e => setModalEdit({ ...modalEdit, name: e.target.value })}
                          value={modalEdit.name}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="hours">Estimated Hours</Label>
                        <Input
                          type="number"
                          name="hours"
                          id="hours"
                          onChange={e => setModalEdit({ ...modalEdit, hours: e.target.value })}
                          value={modalEdit.hours}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="startDate">Start Date</Label>
                        <Input
                          type="input"
                          name="startDate"
                          id="startDate"
                          placeholder="Start date..."
                          onChange={e => setModalEdit({ ...modalEdit, startDate: e.target.value })}
                          value={modalEdit.startDate}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="endDate">End Date</Label>
                        <Input
                          type="input"
                          name="endDate"
                          id="endDate"
                          placeholder="End Date..."
                          onChange={e => setModalEdit({ ...modalEdit, endDate: e.target.value })}
                          value={modalEdit.endDate}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label for="assigned">Assigned To</Label>
                        <Input
                          type="select"
                          name="assigned"
                          id="assigned"
                          onChange={e => setModalEdit({ ...modalEdit, to: e.target.value })}
                          value={modalEdit.to}
                        >
                          <option>Assigne to...</option>
                          {users.map(user => (
                            <option>{user.name}</option>
                          ))}
                        </Input>
                      </FormGroup>
                      <Button>Update Project</Button>
                    </Form>
                  }
                />
              )}
              <StyledActionButton
                color="danger"
                onClick={e => {
                  e.preventDefault();
                  deleteProject(project.id);
                }}
              >
                Delete
              </StyledActionButton>
            </td>
          </tr>
        ))}
      </TableComponent>
    </Container>
  );
}

export default Projects;
