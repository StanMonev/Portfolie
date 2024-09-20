// src/components/BlogComponent.js
import React, { useState, useEffect, useRef } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const BlogComponent = ({ id, index, moveComponent, removeComponent, children}) => {
  const [isSelected, setIsSelected] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (componentRef.current && !componentRef.current.contains(event.target)) {
        setIsSelected(false); // Deselect when clicking outside
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Function to render dynamic menu options for both Header and Paragraph
  const renderMenuOptions = () => {
    if (children.type.getMenuOptions) {
      const args = children.type.getMenuOptionsArgs ? children.type.getMenuOptionsArgs() : [];
      return children.type.getMenuOptions(...args);
    }
    return null;
  };

  return (
    <div
      ref={componentRef}
      className="blog-component mb-3"
      onClick={() => setIsSelected(true)} // Select component on click
      style={{ position: 'relative' }} // Ensure relative positioning
    >
      {/* Toolbar - Only visible when selected */}
      {isSelected && (
        <div
          className="component-toolbar"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%', // Full width of the component
            zIndex: 1000,
            backgroundColor: 'transparent',
          }}
        >
          <ButtonGroup>
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => moveComponent(index, 'up')}
              disabled={index === 0}
            >
              ↑
            </Button>
            <Button variant="outline-secondary" size="sm" onClick={() => moveComponent(index, 'down')}>
              ↓
            </Button>

            {/* Dynamic Menu Options */}
            <div className="dynamic-menu-options" style={{ display: 'inline-block', marginLeft: '10px', alignSelf: 'center' }}>
              {renderMenuOptions()}
            </div>
          </ButtonGroup>

          <Button variant="outline-danger" size="sm" onClick={() => removeComponent(id)}>
            🗑️
          </Button>
        </div>
      )}

      {/* Render the child component (e.g., Paragraph, Header) */}
      <div className="component-content" style={{ paddingTop: isSelected ? '50px' : '0px' }}>
        {children}
      </div>
    </div>
  );
};

export default BlogComponent;
