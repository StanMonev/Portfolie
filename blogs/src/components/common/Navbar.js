// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavigationBar = ({ theme, toggleTheme }) => {
  return (
    <Navbar expand="lg" className={`navbar-${theme} fixed-top`} style={{ width: '100%' }}>
      <Container>
        <Navbar.Brand as={Link} to="/">My Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/user-panel">User Panel</Nav.Link>
            <Nav.Link as={Link} to="/blog-editor">Create Blog</Nav.Link>
          </Nav>
          <div className="theme-toggle">
            <label className="form-switch">
              <input
                type="checkbox"
                className="form-check-input"
                checked={theme === 'dark'}
                onChange={toggleTheme}
              />
              <span className="ms-2">{theme === 'dark' ? 'Dark' : 'Light'} Mode</span>
            </label>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
