// src/components/elements/Heading.js
import React, { useState } from 'react';

const Heading = ({ id, content = '', level = 'h1', alignment = 'left', onUpdateContent, onUpdateAlignment, onUpdateLevel }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = (e) => {
    setIsFocused(false);
    onUpdateContent(id, e.target.innerText);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  Heading.getMenuOptionsArgs = () => [id, onUpdateLevel, onUpdateAlignment];

  return (
    <div>
      {content.trim() === '' && !isFocused && (
        React.createElement(level, { 
          className: "placeholder",
          style: {
            display: 'block',
            width: '100%',
            position: 'absolute',
            pointerEvents: 'none', 
            color: '#aaa', 
            background: 'transparent',
            textAlign: alignment
          } 
        }, 
        'Enter the heading text here...')
      )}
      {React.createElement(
        level,
        {
          contentEditable: true,
          suppressContentEditableWarning: true,
          onBlur: handleBlur,
          onFocus: handleFocus,
          style: { width: '100%', border: 'none', outline: 'none', textAlign: alignment }
        },
        content
      )}
    </div>
  );
};

Heading.getMenuOptions = (id, onUpdateLevel, onUpdateAlignment) => {
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

export default Heading;
