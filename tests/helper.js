const fs = require('fs');
const path = require('path');

function importClasses(directory) {
    let classes = {};
    const pathToClasses = path.join(__dirname, '..', directory);
    const files = fs.readdirSync(pathToClasses);
    files.forEach(file => {
      const filePath = path.join(pathToClasses, file);
      const stat = fs.lstatSync(filePath);
      if (stat.isDirectory()) {
        classes[file] = importClasses(filePath);
      } else if (file.endsWith('.js')) {
        const className = file.substring(0, file.length - 3);
        classes[className] = require(filePath);
      }
    });
    return classes;
}

module.exports = {
  importClasses
};