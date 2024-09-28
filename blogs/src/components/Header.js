// src/components/Header.js
import React from 'react';
import BaseEditableComponent from './BaseEditableComponent';

const Header = ({ id, content = '', level = 'h1', alignment = 'left', onUpdateContent, onUpdateAlignment, onUpdateLevel, placeholder = 'Header text...' }) => {
  
  Header.getMenuOptionsArgs = () => [id, onUpdateLevel, onUpdateAlignment];

  return (
    <BaseEditableComponent
      id={id}
      content={content}
      alignment={alignment}
      onUpdateContent={(newText) => onUpdateContent(id, newText)}
      placeholder={placeholder}
      tagName={level}
    />
  );
};

// Define the menu options for the Header component (level and alignment)
Header.getMenuOptions = (id, onUpdateLevel, onUpdateAlignment) => {
  return (
    <div>
      <select onChange={(e) => onUpdateLevel(id, e.target.value)}>
        <option value="h1">H1</option>
        <option value="h2">H2</option>
        <option value="h3">H3</option>
        <option value="h4">H4</option>
        <option value="h5">H5</option>
      </select>
      <select onChange={(e) => onUpdateAlignment(id, e.target.value)}>
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>
    </div>
  );
};

export default Header;
