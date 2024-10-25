import React, { useState, useEffect } from 'react';

const List = ({ id, content = '<li></li>', alignment = 'left', onUpdateContent, onUpdateAlignment }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [listContent, setListContent] = useState(content); // Initialize with content
  const [currentAlignment, setCurrentAlignment] = useState(alignment);

  // Effect to render content on first load
  useEffect(() => {
    if (content) {
      setListContent(content); // Set the saved content when the page is first loaded
    }
  }, [content]);

  useEffect(() => {
    setCurrentAlignment(alignment);
  }, [alignment]);

  const handleBlur = (e) => {
    const innerHTML = e.target.innerHTML; // Get the innerHTML of the ul
    onUpdateContent(id, innerHTML); // Save innerHTML to the parent via callback
    setListContent(innerHTML); // Save locally
    setIsFocused(false);
  };

  const handleAlignmentChange = (newAlignment) => {
    setCurrentAlignment(newAlignment); // Update local state
    onUpdateAlignment(id, newAlignment); // Call parent function to persist alignment
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const isListItemEmpty = (liElement) => {
    const text = liElement.innerHTML.replace(/<br\s*\/?>/gi, '').trim(); // Remove <br> and trim whitespace
    return text === '';
  };

  const onKeyDown = (e) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      const listItems = e.target.querySelectorAll('li');
  
      if (listItems.length === 1) {
        const lastItem = listItems[0];
        if (isListItemEmpty(lastItem)) {
          e.preventDefault();
          if (!e.target.querySelector('li')) {
            const newItem = document.createElement('li');
            e.target.appendChild(newItem); 
          }
        }
      }
    }
  };

  List.getMenuOptionsArgs = () => [id, currentAlignment, onUpdateAlignment];

  return (
    <div style={{ textAlign: currentAlignment }}>
      {!isFocused && (listContent === '<li></li>' || listContent === '<li><br></li>') && (
        <ul
          className="placeholder"
          style={{
            display: 'block',
            width: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            color: '#aaa',
            background: 'transparent',
            textAlign: currentAlignment,
          }}
        >
          <li>Enter the list items here...</li>
        </ul>
      )}
      <ul
        contentEditable
        suppressContentEditableWarning
        onBlur={handleBlur}
        onFocus={handleFocus}
        onKeyDown={onKeyDown}
        style={{ textAlign: currentAlignment, border: 'none', outline: 'none' }}
        dangerouslySetInnerHTML={{ __html: listContent }}
      />
    </div>
  );
};

List.getMenuOptions = (id, currentAlignment, onUpdateAlignment) => {
  console.log(currentAlignment);
  return (
    <select value={currentAlignment} onChange={(e) => onUpdateAlignment(id, e.target.value)}>
      <option value="left">Left</option>
      <option value="center">Center</option>
      <option value="right">Right</option>
    </select>
  );
};

export default List;
