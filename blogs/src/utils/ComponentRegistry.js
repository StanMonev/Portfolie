// src/components/ComponentRegistry.js
import Paragraph from '../components/blogEditor/elements/Paragraph';
import Heading from '../components/blogEditor/elements/Heading';
// Import new components
import List from '../components/blogEditor/elements/List';
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
    component: Heading,
    defaultProps: { content: '', level: 'h1', alignment: 'left' },
    menuOptions: Heading.getMenuOptions,
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
