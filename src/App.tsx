import React, { Suspense, useContext } from 'react';
import { Link, Outlet, Routes, Route } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';

import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

const Counter = React.lazy(() => import('./routers/Counter'));
const NewsFeed = React.lazy(() => import('./routers/NewsFeed'));
const UseCallbackDemo = React.lazy(() => import('./routers/UseCallbackDemo'));
const UseMemoDemo = React.lazy(() => import('./routers/UseMemoDemo'));


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


function Layout() {
  const theme = useContext(ThemeContext);

  return (
    <div>
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
    </div>
  );
}


function App() {

  return (
    <ThemeContext.Provider value={themes.dark}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<h2>Home</h2>} />
          <Route path="counter" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Counter count={0} />
            </Suspense>
          } />
          <Route path="newsfeed" element={
            <Suspense fallback={<div>Loading...</div>}>
              <NewsFeed />
            </Suspense>
          } />
          <Route path="usecallback" element={
            <Suspense fallback={<div>Loading...</div>}>
              <UseCallbackDemo />
            </Suspense>
          } />
          <Route path="usememo" element={
            <Suspense fallback={<div>Loading...</div>}>
              <UseMemoDemo />
            </Suspense>
          } />
          <Route path="*" element={<p>There's nothing here!</p>} />
        </Route>
      </Routes>
    </ThemeContext.Provider>
  )
}

export default App;
