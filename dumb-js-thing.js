const fs = require('fs');
const path = require('path');

const imageDir = './pages'; // Adjust the directory path as needed
const imageImports = [];

function dashesToUnderscores(stringWithDashes){
    return stringWithDashes.replace(/\-/, '_')
}

function findImages(directory) {
  const files = fs.readdirSync(directory);
  files.forEach((file) => {
    const filePath = path.join(directory, file);
    if (fs.statSync(filePath).isDirectory()) {
      findImages(filePath);
    } else {
      if (['.png', '.jpg', '.jpeg', '.gif'].includes(path.extname(file).toLowerCase())) {
        const relativePath = path.relative('./', filePath);
        // imageImports.push(`import ${dashesToUnderscores(file).replace(/\..*/, '')} from './${relativePath}';`);
        imageImports.push(`${dashesToUnderscores(file).replace(/\..*/, '')}`);
      }
    }
  });
}

findImages(imageDir);

console.log(imageImports.join('\n'));