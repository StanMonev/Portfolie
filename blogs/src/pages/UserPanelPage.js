// src/components/UserPanel.js
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const UserPanel = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [posts, setPosts] = useState([
    { id: 1, title: "Sample Post 1", description: "This is a sample post.", category: "Technical" },
    { id: 2, title: "Sample Post 2", description: "Another sample post.", category: "Entertainment" }
  ]);

  const handleFirstNameChange = (e) => setFirstName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleSaveProfile = () => {
    // Save profile info (e.g., upload photo, save description)
    console.log('Profile saved:', { firstName, lastName, description, photo });
  };

  return (
    <Container className="user-panel mt-5">
      <h2 className="text-center mb-4">User Panel</h2>
      <Row>
        <Col md={6}>
          <h4>Profile</h4>
          <Form>
            <Form.Group controlId="formFirstName" className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            </Form.Group>

            <Form.Group controlId="formLastName" className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                value={lastName}
                onChange={handleLastNameChange}
              />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Write something about yourself..."
                value={description}
                onChange={handleDescriptionChange}
              />
            </Form.Group>

            <Form.Group controlId="formPhoto" className="mb-3">
              <Form.Label>Profile Photo</Form.Label>
              <Form.Control type="file" onChange={handlePhotoChange} />
            </Form.Group>

            <Button variant="primary" onClick={handleSaveProfile}>
              Save Profile
            </Button>
          </Form>
        </Col>

        <Col md={6}>
          <h4>Your Blog Posts</h4>
          <Row className="g-3">
            {posts.map((post) => (
              <Col key={post.id} sm={6} md={6}>
                <Card className="blog-post-card">
                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.description}</Card.Text>
                    <Button variant="outline-primary" size="sm">
                      Edit
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default UserPanel;
