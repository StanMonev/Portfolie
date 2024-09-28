// src/components/List.js
import React, { useState, useRef, useEffect } from 'react';
import BaseEditableComponent from './BaseEditableComponent';

const List = ({ id, content = '', alignment = 'left', onUpdateContent, onUpdateAlignment, placeholder = 'Add list items...' }) => {
  const [listItems, setListItems] = useState(content ? content.split('\n') : ['']); // Default with one empty item
  const additionalContentRefs = useRef([]);

  // Update list items when content changes
  useEffect(() => {
    if (content) {
      console.log("setListItems");
      setListItems(content.split('\n'));
    }
  }, [content]);

  // Handle list item content update
  const handleUpdateListItemContent = (index, newText) => {
    const newListItems = [...listItems];
    newListItems[index] = newText;
    setListItems(newListItems);
    onUpdateContent(id, newListItems.join('\n'));
  };

  const onKeyDown = (e) => {
    console.log(e.key);
  }

  // Render the <li> elements inside the <ul>
  const renderListItems = (text) => {
    console.log(text);
    return (
      <li style={{ whiteSpace: 'pre-wrap' }}>
        {text}
      </li>
    );
  };

  
  List.getMenuOptionsArgs = () => [id, onUpdateAlignment];

  return (
    <BaseEditableComponent
      id={id}
      content={content}
      alignment={alignment}
      onUpdateContent={onUpdateContent}
      placeholder={React.createElement('li', {style: {textAlign: alignment}}, placeholder)}
      tagName="ul"
      renderContent={renderListItems}
      additionalContentRef={additionalContentRefs}
      onInput={function(){}}
      handleOnKeyDown={onKeyDown}
    />
  );
};

// Define the menu options for List component (alignment)
List.getMenuOptions = (id, onUpdateAlignment) => {
  return (
    <select onChange={(e) => onUpdateAlignment(id, e.target.value)}>
      <option value="left">Left</option>
      <option value="center">Center</option>
      <option value="right">Right</option>
    </select>
  );
};

// Helper for dynamic menu option arguments

export default List;
