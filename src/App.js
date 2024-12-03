// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Registration from './Registration';
import Login from './Login';
import Home from './Home';
import CreateBusinessForm from './CreateBusinessForm';
import BusinessList from './BusinessList';
import ViewBusinessDetails from './viewBusinessDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Navbar, Nav, Container } from 'react-bootstrap';
import './css/style.css';

const App = () => {
  const navbarStyle = {
    transition: 'background-color 0.3s', 
  };

  return (
    <Router>
      <div>
        <Navbar expand="lg" style={navbarStyle} className="text-white">
          <Container fluid>
          <img class=" img-logo" src="/logo.png " alt="Grow Business Corporation"></img>

            {/* <Navbar.Brand
              as={Link}
              to="/home"
              className='nav-link'
            >
              Grow Business Corporation
            </Navbar.Brand> */}
            <Navbar.Toggle aria-controls="navbarScroll"  />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px', color: 'white' }}
                navbarScroll
              >
                <Nav.Link
                  as={Link}
                  to="/home"
                  
                >
                  Home
                </Nav.Link>
        
                <Nav.Link
                  as={Link}
                  to="/create-business"
                  
                >
                  Create Business
                </Nav.Link>
        
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create-business" element={<CreateBusinessForm />} />
          <Route path="/list" element={<BusinessList />} />
          <Route path="/view-business/:business_id" element={<ViewBusinessDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
