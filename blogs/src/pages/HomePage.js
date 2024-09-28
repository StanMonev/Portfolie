// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap';

const blogPosts = [
  { id: 1, title: "Understanding React", description: "A deep dive into React fundamentals.", category: "Technical" },
  { id: 2, title: "Environment Matters", description: "The importance of eco-friendly practices.", category: "Environmental" },
  { id: 3, title: "Entertainment Today", description: "A look into modern entertainment.", category: "Entertainment" }
];

const HomePage = () => {
  return (
    <Container className="main-page mt-5">
      <h1 className="text-center">Welcome to SMW Blogs!</h1>
      <h5 className="text-center">Take a look at some of the following blogs.</h5>
      <Row className="blog-grid mt-4">
        {blogPosts.map((post) => (
          <Col key={post.id} md={4} className="mb-4">
            <Link to={`/post/${post.id}`} style={{ textDecoration: 'none' }}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{post.title}</Card.Title>
                  <Card.Text>{post.description}</Card.Text>
                  <Card.Text className="text-muted">{post.category}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HomePage;
