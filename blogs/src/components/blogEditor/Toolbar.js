// src/components/Toolbar.js
import React from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import ComponentRegistry from '../../utils/ComponentRegistry';

const Toolbar = ({ searchTerm = '', setSearchTerm, handleAddComponent, setToolbarVisible }) => {
  const filteredComponents = Object.keys(ComponentRegistry).filter((key) =>
    ComponentRegistry[key].name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="toolbar p-3">
      <h5>Components</h5>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search components..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
      <div className="component-list d-flex flex-column">
        {filteredComponents.map((key) => (
          <Button
            key={key}
            variant="outline-primary"
            className="mb-2"
            onClick={() => handleAddComponent(key)}
          >
            {ComponentRegistry[key].name}
          </Button>
        ))}
      </div>
      <Button
        variant="outline-secondary"
        className="mt-3 w-100"
        onClick={() => setToolbarVisible(false)}
      >
        Hide Toolbar
      </Button>
    </div>
  );
};

export default Toolbar;
