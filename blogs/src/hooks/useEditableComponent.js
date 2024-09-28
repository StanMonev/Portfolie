// src/hooks/useEditableComponent.js
import { useState, useRef, useEffect } from 'react';

const useEditableComponent = ({ content, placeholder, alignment }) => {
  const [text, setText] = useState(content);
  const [isFocused, setIsFocused] = useState(false);
  const componentRef = useRef(null);

  // Update text when content changes
  useEffect(() => {
    setText(content);
  }, [content]);

  // Handle input changes
  const handleInput = (e, onUpdateContent, id) => {
    const newText = e.target.innerText;
    setText(newText);
    onUpdateContent(id, newText);
  };

  // Handle pressing "Enter"
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      document.execCommand('insertLineBreak');
    }
  };

  // Set cursor to the end of the text
  const setCursorToEnd = () => {
    if (componentRef.current) {
      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(componentRef.current);
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  // Handle focus
  const handleFocus = () => {
    setIsFocused(true);
    setCursorToEnd();
  };

  // Reapply text when blur happens
  useEffect(() => {
    if (!isFocused) {
      componentRef.current.innerText = text;
    }
  }, [text, isFocused]);

  return {
    text,
    setText,
    isFocused,
    setIsFocused,
    componentRef,
    handleInput,
    handleKeyDown,
    handleFocus,
  };
};

export default useEditableComponent;
