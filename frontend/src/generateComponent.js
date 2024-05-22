const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];

if (!componentName) {
  console.error('Por favor, informe o nome do componente.');
  process.exit(1);
}

const componentsDirectory = path.join(__dirname, './', 'components');

if (!fs.existsSync(componentsDirectory)) {
  fs.mkdirSync(componentsDirectory);
}

const componentDirectory = path.join(componentsDirectory, componentName);

if (fs.existsSync(componentDirectory)) {
  console.error('O componente já existe.');
  process.exit(1);
}

fs.mkdirSync(componentDirectory);

const componentTemplate = 
`import React from 'react';
import './${componentName}.css'

export function ${componentName}()
{
    return (
        <section className="${componentName.toLowerCase()} section" id="${componentName}">
          <h1>${componentName}</h1>
          <div className="container">
            
          </div>
        </section>
    );
}`;

fs.writeFileSync(path.join(componentDirectory, `${componentName}.jsx`), componentTemplate);

const cssTemplate = ``; // CSS vazio

fs.writeFileSync(path.join(componentDirectory, `${componentName}.css`), cssTemplate);

console.log(`Componente ${componentName} criado com sucesso.`);