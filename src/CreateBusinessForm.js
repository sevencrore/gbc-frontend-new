import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form, Row, Col, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

const CreateBusinessForm = () => {
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [website, setWebsite] = useState('');
  const [keywords, setKeywords] = useState('');
  const [contactPersonName, setContactPersonName] = useState('');
  const [contactPhoneNumber, setContactPhoneNumber] = useState('');
  const [contactPersonEmail, setContactPersonEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [contactDetails, setContactDetails] = useState('');
  const [prospectiveBuyers, setProspectiveBuyers] = useState([]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/business', {
        business_name: businessName,
        address,
        city,
        website,
        keywords,
        contact_person_name: contactPersonName,
        phone_number: contactPhoneNumber,
        contact_person_email: contactPersonEmail,
        prospective_buyers: prospectiveBuyers,
      });

      if (response.data.success) {
        alert('Business created successfully!');
        navigate('/home');
      } else {
        alert('Failed to create business');
      }
    } catch (error) {
      console.error('Error creating business:', error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || 'Something went wrong!'}`);
    }
  };

  const handleAddProspectiveBuyer = () => {
    const newBuyer = { companyName, location, contactDetails };
    setProspectiveBuyers((prev) => [...prev, newBuyer]);
    setCompanyName('');
    setLocation('');
    setContactDetails('');
  };

  const handleDeleteProspectiveBuyer = (index) => {
    setProspectiveBuyers((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Container className="mt-5 p-4 bg-light rounded animate__animated animate__fadeIn">
      <h2 className="mb-4">Add Your Business</h2>
      <Form onSubmit={handleSubmit}>
        <h4 className="mb-3">Business Info</h4>
        <Row className="mb-3">
          <Form.Group as={Col} xs={12} md={6} controlId="businessName">
            <Form.Label>Business Name*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your business name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} xs={12} md={6} controlId="city">
            <Form.Label>City*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group as={Col} xs={12} md={6} controlId="address">
            <Form.Label>Address*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} xs={12} md={6} controlId="website">
            <Form.Label>Website</Form.Label>
            <Form.Control
              type="text"
              placeholder="http://www.example.com"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} xs={12} md={6} controlId="keywords">
            <Form.Label>Products and Services</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter products or services"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              required
            />
          </Form.Group>
        </Row>

        <h4 className="mb-3">Contact Person Info</h4>
        <Row className="mb-3">
          <Form.Group as={Col} xs={12} md={6} controlId="contactPersonName">
            <Form.Label>Contact Person Name*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name of contact person"
              value={contactPersonName}
              onChange={(e) => setContactPersonName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group as={Col} xs={12} md={6} controlId="contactPhoneNumber">
            <Form.Label>Contact Phone Number*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone number"
              value={contactPhoneNumber}
              onChange={(e) => setContactPhoneNumber(e.target.value)}
              required
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} xs={12} controlId="contactPersonEmail">
            <Form.Label>Contact Person Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={contactPersonEmail}
              onChange={(e) => setContactPersonEmail(e.target.value)}
            />
          </Form.Group>
        </Row>

        <h4 className="mb-3">Prospective Buyers List</h4>
        <Row className="mb-3">
          <Form.Group as={Col} xs={12} md={6} controlId="companyName">
            <Form.Label>Company Name*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter company name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} xs={12} md={6} controlId="location">
            <Form.Label>Location*</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} xs={12} controlId="contactDetails">
            <Form.Label>Contact Details</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter contact details"
              value={contactDetails}
              onChange={(e) => setContactDetails(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Button
          variant="primary"
          className="mb-3"
          onClick={handleAddProspectiveBuyer}
        >
          Add Prospective Buyer
        </Button>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Location</th>
              <th>Contact Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {prospectiveBuyers.map((buyer, index) => (
              <tr key={index}>
                <td>{buyer.companyName}</td>
                <td>{buyer.location}</td>
                <td>{buyer.contactDetails}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteProspectiveBuyer(index)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button variant="success" type="submit">
          Submit Business
        </Button>
      </Form>
    </Container>
  );
};

export default CreateBusinessForm;
