import React, { useState, useRef, useEffect } from 'react';

const Paragraph = ({ id, content = '', onUpdateContent, placeholder = 'Write something...' }) => {
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

  return (
    <div className="paragraph-component" style={{ position: 'relative' }}>
      {text === '' && !isFocused && (
        <span className="placeholder" style={{ position: 'absolute', pointerEvents: 'none', color: '#aaa', background: 'transparent' }}>
          {placeholder}
        </span>
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
        style={{ whiteSpace: 'pre-wrap' }}
      >
      </p>
    </div>
  );
};

export default Paragraph;
