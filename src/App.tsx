import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Link, Outlet } from 'react-router-dom';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

const themes = {
  light: {
    name: "light",
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    name: "dark",
    foreground: "#ffffff",
    background: "#222222"
  }
};

export const ThemeContext = React.createContext(themes.light);

function App() {

  const theme = themes.dark;

  return (
    <ThemeContext.Provider value={theme}>
      <Navbar bg={theme.name} variant={theme.name as "light" | "dark" | undefined}>
        <Container>
          {/* Render <Navbar.Brand> as <Link> to enable react router*/}
          <Navbar.Brand as={Link} to="/">
            <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" />{' '}
            React Demo
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/counter">Counter</Nav.Link>
            <Nav.Link as={Link} to="/newsfeed">News Feed</Nav.Link>
            <NavDropdown title="Optimization" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/usecallback">useCallback</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/usememo">useMemo</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Outlet />
      </Container>
    </ThemeContext.Provider>
  )
}

export default App;
