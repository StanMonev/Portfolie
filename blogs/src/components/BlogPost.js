// src/components/BlogPost.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Form, Button, ListGroup } from 'react-bootstrap';

const blogPosts = [
  { id: 1, title: "Understanding React", content: "A deep dive into React fundamentals.", category: "Technical" },
  { id: 2, title: "Environment Matters", content: "The importance of eco-friendly practices.", category: "Environmental" },
  { id: 3, title: "Entertainment Today", content: "A look into modern entertainment.", category: "Entertainment" }
];

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find(post => post.id === parseInt(id));

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment('');
    }
  };

  return (
    <Container className="blog-post-page mt-5">
      {post ? (
        <Card className="mb-4">
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{post.category}</Card.Subtitle>
            <Card.Text>{post.content}</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <h2>Blog post not found</h2>
      )}

      {/* Comment Section */}
      <Card className="comments-section mb-4">
        <Card.Header>Comments</Card.Header>
        <Card.Body>
          {comments.length > 0 ? (
            <ListGroup variant="flush">
              {comments.map((comment, index) => (
                <ListGroup.Item key={index}>{comment}</ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </Card.Body>
      </Card>

      {/* Add Comment Form */}
      <Card className="comment-form mb-5">
        <Card.Header>Add a Comment</Card.Header>
        <Card.Body>
          <Form onSubmit={handleAddComment}>
            <Form.Group controlId="commentInput">
              <Form.Control
                type="text"
                placeholder="Write your comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Add Comment
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default BlogPost;
