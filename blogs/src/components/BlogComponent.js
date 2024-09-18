// src/components/BlogComponent.js
import React, { useState } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const BlogComponent = ({ id, index, moveComponent, removeComponent, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="blog-component mb-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Toolbar - Only visible when hovered */}
      {isHovered && (
        <div className="component-toolbar d-flex justify-content-between mb-2">
          <ButtonGroup>
            <Button variant="outline-secondary" size="sm" onClick={() => moveComponent(index, 'up')} disabled={index === 0}>
              ↑
            </Button>
            <Button variant="outline-secondary" size="sm" onClick={() => moveComponent(index, 'down')}>
              ↓
            </Button>
          </ButtonGroup>
          <Button variant="outline-danger" size="sm" onClick={() => removeComponent(id)}>
            🗑️
          </Button>
        </div>
      )}
      
      {/* Render the child component (e.g., Paragraph) */}
      <div className="component-content">
        {children}
      </div>
    </div>
  );
};

export default BlogComponent;
