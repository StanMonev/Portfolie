// src/components/Paragraph.js
import React from 'react';
import BaseEditableComponent from './BaseEditableComponent';

const Paragraph = ({ id, content = '', alignment = 'left', onUpdateContent, onUpdateAlignment, placeholder = 'Write something...' }) => {
  

  Paragraph.getMenuOptionsArgs = () => [id, onUpdateAlignment];
  
  return (
    <BaseEditableComponent
      id={id}
      content={content}
      alignment={alignment}
      onUpdateContent={(newText) => onUpdateContent(id, newText)}
      placeholder={placeholder}
      tagName="p" // Paragraph component renders a <p> tag
    />
  );
};

// Define the menu options for the Paragraph component (alignment)
Paragraph.getMenuOptions = (id, onUpdateAlignment) => {
  return (
    <select onChange={(e) => onUpdateAlignment(id, e.target.value)}>
      <option value="left">Left</option>
      <option value="center">Center</option>
      <option value="right">Right</option>
    </select>
  );
};

export default Paragraph;
