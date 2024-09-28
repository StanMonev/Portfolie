// src/components/BlogEditorPage.js
import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import BlogComponentMenu from '../components/blogEditor/BlogComponentMenu';
import Toolbar from '../components/blogEditor/Toolbar';
import AddComponentBox from '../components/blogEditor/AddComponentBox';
import ComponentRegistry from '../utils/ComponentRegistry';
import '../styles/BlogEditorPage.css';
import { createComponent, convertComponentsToHTML, parseHTMLToComponents } from '../utils/ComponentFactory';
import useBlogEditorHandlers from '../hooks/useBlogEditorHandlers'; // Import the handlers

const BlogEditor = ({ initialHtml }) => {
  const [components, setComponents] = useState([]);
  const [toolbarVisible, setToolbarVisible] = useState(false);
  const [showAddComponentBox, setShowAddComponentBox] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);

  // Get all handlers from useBlogEditorHandlers
  const {
    handleAddComponent,
    handleMoveComponent,
    handleRemoveComponent,
    handleUpdateContent,
    handleUpdateAlignment,
    handleUpdateHeaderLevel,
  } = useBlogEditorHandlers(components, setComponents); // Pass components and setComponents

  useEffect(() => {
    const handleResize = () => setIsMobileView(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (initialHtml) {
      const loadedComponents = parseHTMLToComponents(initialHtml); // Moved to utility
      setComponents(loadedComponents);
    }
  }, [initialHtml]);

  const convertToHTML = () => {
    return convertComponentsToHTML(components); // Moved to utility
  };

  const saveBlog = () => {
    const htmlContent = convertToHTML();
    console.log('Saving HTML:', htmlContent);
    // Send the `htmlContent` to your backend to save in the database
  };

  const previewBlog = () => {
    const htmlContent = convertToHTML();
    const newWindow = window.open();
    newWindow.document.write(htmlContent);
    newWindow.document.close();
  };

  const renderComponent = (component, index) => {
    const { component: Component } = ComponentRegistry[component.type];
    return (
      <BlogComponentMenu
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
      </BlogComponentMenu>
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

        <div className="mt-3 d-flex justify-content-center">
          <Button variant="primary" onClick={saveBlog}>
            Save Blog
          </Button>
          <Button variant="success" className="ml-2" onClick={previewBlog}>
            Preview Blog
          </Button>
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
