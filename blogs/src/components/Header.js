// src/components/Header.js
import React, { useState, useRef, useEffect } from 'react';

const Header = ({ id, content = '', level = 'h1', alignment = 'left', onUpdateContent, onUpdateAlignment, onUpdateLevel, placeholder = 'Header text...' }) => {
  const [text, setText] = useState(content);
  const [isFocused, setIsFocused] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    setText(content);
  }, [content]);

  // Ensure that the text is preserved when the header level changes
  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.innerText = text;
    }
  }, [level]);

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
    if (headerRef.current) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(headerRef.current);
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
      headerRef.current.innerText = text;
    }
  }, [text, isFocused]);

  Header.getMenuOptionsArgs = () => [id, onUpdateLevel, onUpdateAlignment];

  return (
    <div className="header-component" style={{ position: 'relative' }}>
      {text === '' && !isFocused && (
        React.createElement(
          level,
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
      {React.createElement(
        level,
        {
          ref: headerRef,
          contentEditable: true,
          suppressContentEditableWarning: true,
          onInput: handleInput,
          onKeyDown: handleKeyDown,
          onFocus: handleFocus,
          onBlur: () => setIsFocused(false),
          style: {
            border: 'none',
            outline: 'none',
            padding: '5px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            textAlign: alignment, // Apply text alignment
            minHeight: '1em'
          },
        },
        null // Remove default content here
      )}
    </div>
  );
};

Header.getMenuOptions = (id, onUpdateLevel, onUpdateAlignment) => {
  console.log('Inside Header, onUpdateAlignment:', onUpdateAlignment);

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
