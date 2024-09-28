// src/utils/ComponentFactory.js
import ComponentRegistry from './ComponentRegistry';
import parse from 'html-react-parser';


export const createComponent = (type, props) => {
  const Component = ComponentRegistry[type]?.component;
  if (!Component) {
    console.warn(`Component of type "${type}" not found.`);
    return null;
  }
  return <Component {...props} />;
};

// Convert components to HTML
export const convertComponentsToHTML = (components) => {
  return components
    .map((component) => {
      const { content, level, alignment } = component;
      if (component.type === 'header') {
        return `<${level} style="text-align: ${alignment};">${content}</${level}>`;
      } else if (component.type === 'paragraph') {
        return `<p style="text-align: ${alignment};">${content}</p>`;
      }
      // Add cases for other components
      return '';
    })
    .join('');
};

// Parse HTML to components
export const parseHTMLToComponents = (html) => {
  return parse(html, {
    replace: (domNode) => {
      if (domNode.type === 'tag' && domNode.name === 'p') {
        return {
          type: 'paragraph',
          id: new Date().getTime(),
          content: domNode.children[0]?.data || '',
          alignment: domNode.attribs?.style?.includes('center') ? 'center' : 'left',
        };
      } else if (domNode.type === 'tag' && /^h[1-6]$/.test(domNode.name)) {
        return {
          type: 'header',
          id: new Date().getTime(),
          content: domNode.children[0]?.data || '',
          level: domNode.name,
          alignment: domNode.attribs?.style?.includes('center') ? 'center' : 'left',
        };
      }
      // Add cases for other components
      return null;
    },
  });
};
