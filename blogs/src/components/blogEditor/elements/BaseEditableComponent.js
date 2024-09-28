// src/components/BaseEditableComponent.js
import React, { useState, useRef, useEffect } from 'react';

const BaseEditableComponent = ({ id,
                                  content = '', 
                                  alignment = 'left', 
                                  onUpdateContent, 
                                  placeholder, 
                                  renderContent, 
                                  tagName = 'div', 
                                  additionalContentRef,
                                  handleOnInput, 
                                  handleOnFocus, 
                                  handleOnKeyDown }) => {
  const [text, setText] = useState(content);
  const [isFocused, setIsFocused] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    setText(content);
  }, [content]);


  const handleKeyDown = (e) =>{
    //console.log(e.key);
  }

  const handleInput = (e) =>{
    let elementInnerText = e.target.innerText;
    onUpdateContent(id, elementInnerText);
    //setText(elementInnerText);
    //console.log(text);
  }
  
  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div style={{ position: 'relative' }}>
      {text.trim() === '' && !isFocused && (        
        React.createElement(
          tagName,
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
        tagName,
        {
          ref: contentRef,
          contentEditable: true,
          suppressContentEditableWarning: true,
          onInput: handleOnInput ? handleOnInput : handleInput,
          onFocus: handleOnFocus ? handleOnFocus : handleFocus,
          onKeyDown: handleOnKeyDown ? handleOnKeyDown : handleKeyDown,
          style: {
            border: 'none',
            outline: 'none',
            whiteSpace: 'pre-wrap',
            textAlign: alignment,
          },
        },
        renderContent ? renderContent(text) : text
      )}
    </div>
  );
};

export default BaseEditableComponent;
