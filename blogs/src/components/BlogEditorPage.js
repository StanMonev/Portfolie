// src/components/BlogEditorPage.js
import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import BlogComponent from './BlogComponent';
import Toolbar from './Toolbar';
import AddComponentBox from './AddComponentBox';
import ComponentRegistry from './ComponentRegistry';
import '../BlogEditorPage.css';

const BlogEditor = () => {
  const [components, setComponents] = useState([]);
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const [showAddComponentBox, setShowAddComponentBox] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleAddComponent = (type) => {
    setComponents([...components, { type, id: new Date().getTime(), alignment: 'left' }]);
    if (!isMobileView) setShowAddComponentBox(false);
  };

  const handleMoveComponent = (index, direction) => {
    setComponents((prevComponents) => {
      const newComponents = [...prevComponents];
      const [movedComponent] = newComponents.splice(index, 1);
      newComponents.splice(direction === 'up' ? index - 1 : index + 1, 0, movedComponent);
      return newComponents;
    });
  };

  const handleRemoveComponent = (id) => {
    setComponents((prevComponents) => prevComponents.filter((c) => c.id !== id));
  };

  const handleUpdateContent = (id, content) => {
    setComponents((prevComponents) =>
      prevComponents.map((c) => (c.id === id ? { ...c, content } : c))
    );
  };

  const handleUpdateAlignment = (id, newAlignment) => {
    setComponents((prevComponents) =>
      prevComponents.map((c) => (c.id === id ? { ...c, alignment: newAlignment } : c))
    );
  };

  const handleUpdateHeaderLevel = (id, level) => {
    setComponents((prevComponents) =>
      prevComponents.map((c) => (c.id === id ? { ...c, level } : c))
    );
  };

  const renderComponent = (component, index) => {
    const { component: Component} = ComponentRegistry[component.type];
    return (
      <BlogComponent
        key={component.id}
        id={component.id}
        index={index}
        moveComponent={handleMoveComponent}
        removeComponent={handleRemoveComponent}
      >
        <Component
          id={component.id}
          content={component.content}
          alignment={component.alignment}
          level={component.level}
          onUpdateContent={handleUpdateContent}
          onUpdateAlignment={handleUpdateAlignment}
          onUpdateLevel={handleUpdateHeaderLevel}
        />
      </BlogComponent>
    );
  };

  return (
    <Container fluid className="blog-editor d-flex p-0">
      {toolbarVisible && (
        <Toolbar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleAddComponent={handleAddComponent}
          setToolbarVisible={setToolbarVisible}
        />
      )}

      <div className={`editor-area flex-grow-1 ${toolbarVisible ? 'editor-area-with-toolbar' : ''}`}>
        {components.map((component, index) => renderComponent(component, index))}

        <div className="add-component-inline mt-3 d-flex justify-content-center" style={{ position: 'relative' }}>
          <Button
            variant="outline-secondary"
            onClick={() => {
              if (isMobileView) setToolbarVisible(true);
              else setShowAddComponentBox(true);
            }}
          >
            + Add Component
          </Button>

          <AddComponentBox
            show={showAddComponentBox && !isMobileView}
            setShow={setShowAddComponentBox}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleAddComponent={handleAddComponent}
            setToolbarVisible={setToolbarVisible}
          />
        </div>
      </div>

      {!toolbarVisible && !isMobileView && (
        <Button
          variant="outline-secondary"
          className="show-toolbar-btn"
          onClick={() => setToolbarVisible(true)}
          style={{ position: 'fixed', top: '70px', left: '10px', zIndex: 1000 }}
        >
          Show Toolbar
        </Button>
      )}
    </Container>
  );
};

export default BlogEditor;
