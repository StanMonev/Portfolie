// src/components/Paragraph.js
import React, { useState, useRef, useEffect } from 'react';

const Paragraph = ({ id, content = '', alignment = 'left', onUpdateContent, onUpdateAlignment, placeholder = 'Write something...' }) => {
  const [text, setText] = useState(content);
  const [isFocused, setIsFocused] = useState(false);
  const paragraphRef = useRef(null);

  useEffect(() => {
    setText(content);
  }, [content]);

  const handleInput = (e) => {
    const newText = e.target.innerText;
    setText(newText);
    onUpdateContent(id, newText);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.execCommand('insertLineBreak');
    }
  };

  const setCursorToEnd = () => {
    if (paragraphRef.current) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(paragraphRef.current);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setCursorToEnd();
  };

  useEffect(() => {
    if (!isFocused) {
      paragraphRef.current.innerText = text;
    }
  }, [text, isFocused]);

  Paragraph.getMenuOptionsArgs = () => [id, onUpdateAlignment];

  return (
    <div className="paragraph-component" style={{ position: 'relative' }}>

      {text === '' && !isFocused && (
        React.createElement(
          'p',
          {
            className: 'placeholder',
            style: {
              width: '100%',
              position: 'absolute', 
              pointerEvents: 'none', 
              color: '#aaa', 
              background: 'transparent',
              textAlign: alignment
            },
          },
          placeholder
        )
      )}
      <p
        ref={paragraphRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={() => setIsFocused(false)}
        className="editable-paragraph"
        style={{ whiteSpace: 'pre-wrap', textAlign: alignment }} // Apply text alignment
      >
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
