import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container, Nav, NavItem, NavLink } from 'reactstrap';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import Users from './shared/components/Users';
import Projects from './shared/components/Projects';
import * as serviceWorker from './serviceWorker';
import styled from 'styled-components';
require('dotenv').config();

const StyledNav = styled(Nav)`
  background-color: #333333;
  padding: 5px 0;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  font-weight: 700;
  &:hover {
    color: #eee;
    text-decoration: underline;
  }
`;

const StyledNavItem = styled(NavItem)`
  display: flex;
`;

ReactDOM.render(
  <React.StrictMode>
    <StyledNav>
      <Container>
        <StyledNavItem>
          <StyledNavLink href="/">Home</StyledNavLink>
          <StyledNavLink href="/users">Users</StyledNavLink>
          <StyledNavLink href="/projects">Projects</StyledNavLink>
        </StyledNavItem>
      </Container>
    </StyledNav>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/projects">
            <Projects />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
