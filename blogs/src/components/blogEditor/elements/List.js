import React, { useState, useEffect } from 'react';

const List = ({ id, content = '<li></li>', alignment = 'left', onUpdateContent, onUpdateAlignment }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [listContent, setListContent] = useState(content); // Initialize with content

  // Effect to render content on first load
  useEffect(() => {
    if (content) {
      setListContent(content); // Set the saved content when the page is first loaded
    }
  }, [content]);

  const handleBlur = (e) => {
    const innerHTML = e.target.innerHTML; // Get the innerHTML of the ul
    onUpdateContent(id, innerHTML); // Save innerHTML to the parent via callback
    setListContent(innerHTML); // Save locally
    setIsFocused(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  function hasWhiteSpace(s) {
    return /\s/g.test(s);
  }

  const isListItemEmpty = (liElement) => {
    const text = liElement.innerText;
    return hasWhiteSpace(text) && text.length < 2;
  };

  const onKeyDown = (e) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      const listItems = e.target.querySelectorAll('li');
  
      // Check if there is only one list item left
      if (listItems.length === 1) {
        const lastItem = listItems[0];

        
        console.log(isListItemEmpty(lastItem));
  
        // Prevent the deletion if the last <li> is empty (ignoring <br> but keeping &nbsp;)
        if (isListItemEmpty(lastItem)) {
          e.preventDefault(); // Prevent default backspace/delete action
          console.log("Preventing deletion of the last empty <li>.");
  
          // Ensure there's always one empty <li> if the list becomes empty
          if (!e.target.querySelector('li')) {
            console.log("Element added: <li>.");
            const newItem = document.createElement('li');
            e.target.appendChild(newItem); // Append the new <li> element to the <ul>
          }
        }
      }
    }
  };

  List.getMenuOptionsArgs = () => [id, onUpdateAlignment];

  return (
    <div style={{ textAlign: alignment }}>
      {!isFocused && listContent === '<li></li>' && (
        <ul
          className="placeholder"
          style={{
            display: 'block',
            width: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            color: '#aaa',
            background: 'transparent',
            textAlign: alignment,
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
        style={{ textAlign: alignment, border: 'none', outline: 'none' }}
        dangerouslySetInnerHTML={{ __html: listContent }}
      />
    </div>
  );
};

List.getMenuOptions = (id, onUpdateAlignment) => {
  return (
    <select onChange={(e) => onUpdateAlignment(id, e.target.value)}>
      <option value="left">Left</option>
      <option value="center">Center</option>
      <option value="right">Right</option>
    </select>
  );
};

export default List;
