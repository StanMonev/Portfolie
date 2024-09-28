// src/components/ComponentRegistry.js
import Paragraph from './Paragraph';
import Header from './Header';
// Import new components
import List from './List';
/* import Quote from './Quote';
import Code from './Code'; */

const ComponentRegistry = {
  paragraph: {
    name: 'Paragraph',
    component: Paragraph,
    defaultProps: { content: '', alignment: 'left' },
    menuOptions: Paragraph.getMenuOptions,
  },
  header: {
    name: 'Header',
    component: Header,
    defaultProps: { content: '', level: 'h1', alignment: 'left' },
    menuOptions: Header.getMenuOptions,
  },
  // New components
 list: {
    name: 'List',
    component: List,
    defaultProps: { content: '', alignment: 'left' },
    menuOptions: List.getMenuOptions,
  },
  /*  
  quote: {
    name: 'Quote',
    component: Quote,
    defaultProps: { text: '', alignment: 'center' },
    menuOptions: Quote.getMenuOptions,
  },
  code: {
    name: 'Code',
    component: Code,
    defaultProps: { code: '', language: 'javascript' },
    menuOptions: Code.getMenuOptions,
  }, */
};

export default ComponentRegistry;
