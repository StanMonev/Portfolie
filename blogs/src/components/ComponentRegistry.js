import Paragraph from './Paragraph';
import Header from './Header';

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
  // Add more components as needed
};

export default ComponentRegistry;
