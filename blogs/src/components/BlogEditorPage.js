// src/components/BlogEditorPage.js
import React, { useState } from 'react';
import { Container, Button, Modal, Form } from 'react-bootstrap';
import BlogComponent from './BlogComponent';
import Paragraph from './Paragraph';
import '../BlogEditorPage.css';

const BlogEditor = () => {
  const [components, setComponents] = useState([]);
  const [toolbarVisible, setToolbarVisible] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddComponent = (type) => {
    setComponents([...components, { type, id: new Date().getTime() }]);
    setShowAddModal(false); // Close modal after adding a component
  };

  const handleUpdateContent = (id, content) => {
    setComponents((prevComponents) =>
      prevComponents.map((component) =>
        component.id === id ? { ...component, content } : component
      )
    );
  };

  const handleRemoveComponent = (id) => {
    setComponents((prevComponents) =>
      prevComponents.filter((component) => component.id !== id)
    );
  };

  const handleMoveComponent = (index, direction) => {
    setComponents((prevComponents) => {
      const newComponents = [...prevComponents];
      const [movedComponent] = newComponents.splice(index, 1);
      if (direction === 'up') {
        newComponents.splice(index - 1, 0, movedComponent);
      } else if (direction === 'down') {
        newComponents.splice(index + 1, 0, movedComponent);
      }
      return newComponents;
    });
  };

  const renderComponent = (component, index) => {
    switch (component.type) {
      case 'paragraph':
        return (
          <BlogComponent
            key={component.id}
            id={component.id}
            index={index}
            moveComponent={handleMoveComponent}
            removeComponent={handleRemoveComponent}
          >
            <Paragraph
              id={component.id}
              content={component.content}
              onUpdateContent={handleUpdateContent}
            />
          </BlogComponent>
        );
      default:
        return null;
    }
  };

  return (
    <Container fluid className="blog-editor d-flex p-0">
      {/* Fixed Toolbar */}
      {toolbarVisible && (
        <div className="toolbar p-3">
          <h5>Components</h5>
          <Button
            variant="outline-primary"
            className="mb-2 w-100"
            onClick={() => handleAddComponent('paragraph')}
          >
            Add Paragraph
          </Button>
          <Button
            variant="outline-secondary"
            className="mt-3 w-100"
            onClick={() => setToolbarVisible(false)}
          >
            Hide Toolbar
          </Button>
        </div>
      )}

      {/* Main Editor Area */}
      <div className={`editor-area flex-grow-1 ${toolbarVisible ? 'editor-area-with-toolbar' : ''}`}>
        {components.length === 0 && (
          <p className="text-muted text-center mt-5">Start adding components to your blog...</p>
        )}
        {components.map((component, index) => renderComponent(component, index))}
        
        {/* Add Component Button */}
        <div className="add-component-inline mt-3 d-flex justify-content-center">
          <Button
            variant="outline-secondary"
            onClick={() => setShowAddModal(true)}
          >
            + Add Component
          </Button>
        </div>
      </div>

      {/* Show Toolbar Button */}
      {!toolbarVisible && (
        <Button
          variant="outline-secondary"
          className="show-toolbar-btn"
          onClick={() => setToolbarVisible(true)}
          style={{ position: 'fixed', top: '70px', left: '10px', zIndex: 1000 }} /* Adjusted top positioning */
        >
          Show Toolbar
        </Button>
      )}

      {/* Add Component Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Component</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Choose a component:</Form.Label>
            <div className="component-list d-flex justify-content-around">
              <Button variant="outline-primary" onClick={() => handleAddComponent('paragraph')}>
                Paragraph
              </Button>
              {/* Add more component buttons here */}
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default BlogEditor;
