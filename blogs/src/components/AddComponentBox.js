// src/components/AddComponentBox.js
import React, { useRef, useEffect } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import ComponentRegistry from './ComponentRegistry';

const AddComponentBox = ({ show, setShow, searchTerm = '', setSearchTerm, handleAddComponent, setToolbarVisible }) => {
  const addComponentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addComponentRef.current && !addComponentRef.current.contains(event.target)) {
        setShow(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShow]);

  const filteredComponents = Object.keys(ComponentRegistry).filter((key) =>
    ComponentRegistry[key].name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return show ? (
    <div ref={addComponentRef} className="add-component-popup">
      <InputGroup className="mb-3">
        <FormControl
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>
      <div className="component-list-grid mb-3">
        {filteredComponents.map((key) => (
          <Button
            key={key}
            variant="light"
            className="component-button"
            onClick={() => handleAddComponent(key)}
          >
            {ComponentRegistry[key].name}
          </Button>
        ))}
      </div>
      <div className="text-center">
        <Button
          variant="dark"
          className="w-100"
          onClick={() => {
            setShow(false);
            setToolbarVisible(true);
          }}
        >
          Browse all
        </Button>
      </div>
    </div>
  ) : null;
};

export default AddComponentBox;
