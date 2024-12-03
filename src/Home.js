// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { color } from 'framer-motion';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <div
        className="d-flex flex-column justify-content-center align-items-center text-center animate__animated animate__fadeIn"
        style={{
          minHeight: '100vh',
          backgroundImage:
            'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://tse3.mm.bing.net/th?id=OIG3.WajEmVl1dtlBvBdAgCVd&pid=ImgGn")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
        }}
      >
        <Container>
          <div className="p-5 rounded" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <h1 className="display-3 fw-bold animate__animated animate__bounceInDown text-shadow">
              Welcome to Grow Business Corporation
            </h1>
            <p className="lead animate__animated animate__fadeInUp text-shadow">
              Easily manage your businesses with our intuitive platform.
            </p>
            <Link to="/create-business">
              <Button
                className="btn-lg mt-3 animate__animated animate__fadeInUp shadow"
                style={{ backgroundColor: '#ff3333' }}
              >
                Create New Business
              </Button>
            </Link>
          </div>
        </Container>
      </div>

      {/* About Us and Contact Section */}
      <Container className="py-5">
        <Row className="justify-content-center">
          {/* About Us Section */}
          <Col xs={12} md={12} className="mb-4">
            <Card className="shadow-sm">
              <Card.Body>
                <h2 className="fw-bold text-center mb-3"style={{color:'#ff3333'}}>About Us</h2>
                <p style={{ textAlign: 'justify', lineHeight: 1.8 }}>
                  We specialize in helping businesses create strategies to effectively market their
                  products or services to other businesses. We provide expertise in understanding
                  industry trends, identifying target audiences, and crafting tailored marketing
                  plans to drive growth. We analyze a company's current marketing efforts, pinpoint
                  weaknesses, and recommend improvements in areas like content marketing, lead
                  generation, and account-based marketing.
                </p>
              </Card.Body>
            </Card>
          </Col>
          </Row>
      </Container>

          {/* Contact Section */}
          {/* <Col xs={12} md={12}> */}
            <Card className="shadow-sm text-white"style={{ backgroundColor: '#343a4b' }}>
              <Card.Body>
                <h3 className="fw-bold mb-3 text-center">Contact Us</h3>
                <div className="mb-2 d-flex align-items-center justify-content-center">
                  <p className="mb-0">Location: #60, 3rd Floor, Galaxy Mall, J C Nagar, Hubli-580021</p>
                </div>
                <div className="mb-2 d-flex align-items-center justify-content-center">
                  <i className="bi bi-telephone-fill me-2"></i>
                  <a href="tel:9880213311" className="text-white text-decoration-none">
                    9880213311
                  </a>
                </div>
                <div className="mb-0 d-flex align-items-center justify-content-center">
                  <i className="bi bi-envelope-fill me-2"></i>
                  <a href="mailto:grow24.co@gmail.com" className="text-white text-decoration-none">
                    grow24.co@gmail.com
                  </a>
                </div>
              </Card.Body>
            </Card>
          {/* </Col> */}
        
    </>
  );
};

export default Home;