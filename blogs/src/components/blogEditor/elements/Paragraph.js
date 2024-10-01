// src/components/elements/Paragraph.js
import React, { useState } from 'react';

const Paragraph = ({ id, content = '', alignment = 'left', onUpdateContent, onUpdateAlignment }) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = (e) => {
    setIsFocused(false);
    onUpdateContent(id, e.target.innerText);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  Paragraph.getMenuOptionsArgs = () => [id, onUpdateAlignment];

  return (
    <div>
      {content.trim() === '' && !isFocused && (
        <p className="placeholder" 
           style={{ display: 'block', width: '100%', position: 'absolute', pointerEvents: 'none', color: '#aaa', background: 'transparent', textAlign: alignment }}>
          Enter the paragraph text here...
        </p>
      )}
      <p
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlur}
        onFocus={handleFocus}
        style={{ width: '100%', border: 'none', outline: 'none', textAlign: alignment }}
      >
        {content}
      </p>
    </div>
  );
};

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
