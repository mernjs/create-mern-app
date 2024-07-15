const fs = require('fs');
const path = require('path');

const inputDirectory = './icons';
const outputDirectory = 'src/icons';
const outputFile = 'src/index.js';
const demoFile = 'example/src/App.js';

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

function replace(string) {
	return string.replaceAll('-', '');
}

const convertSvgToReactComponent = (svgContent, name) => {
	// svgContent = svgContent.replace(/width="[^"]*"/, 'width={size}');
	// svgContent = svgContent.replace(/height="[^"]*"/, 'height={size}');
	// svgContent = svgContent.replace(/fill="[^"]*"/, 'fill={color}');

	return `
import React from 'react';
const ${name} = ({ size = 24, color = '#000000' }) => (
    ${svgContent}
);
export default ${name};
  `;
};

const generateIconCode = (iconName) => {
	return `import ${iconName} from './icons/${iconName}';
`;
};

const generateExportCode = (iconName) => {
	return `  ${iconName},
`;
};

const generateSwitchCaseCode = () => {
	const svgFiles = fs.readdirSync(inputDirectory);

	const switchCases = svgFiles.map((file) => {
		if (file === '.DS_Store') return '';
		const iconName = capitalizeFirstLetter(replace(file.replace('.svg', '')));
		return `    case "${iconName}":
      return <${iconName} size={size} color={color} />;
`;
	});

	return `  switch (name) {
${switchCases.join('')}
    default:
      return null;
  }
`;
};

const convertAllIcons = () => {
	const svgFiles = fs.readdirSync(inputDirectory);

	// Check if outputDirectory exists, create it if not
	if (!fs.existsSync(outputDirectory)) {
		fs.mkdirSync(outputDirectory, { recursive: true });
	}

	svgFiles.forEach((file) => {
		if (file === '.DS_Store') return;
		const filePath = path.join(inputDirectory, file);
		const svgContent = fs.readFileSync(filePath, 'utf-8');

		const componentName = capitalizeFirstLetter(replace(file.replace('.svg', '')));
		const componentContent = convertSvgToReactComponent(svgContent, componentName);

		const outputFilePath = path.join(outputDirectory, `${componentName}.js`);

		fs.writeFileSync(outputFilePath, componentContent);
	});
};

const generateIconImports = () => {
	const iconFiles = fs.readdirSync(outputDirectory);

	const importStatements = iconFiles.map((file) => {
		if (file === '.DS_Store') return '';
		const iconName = capitalizeFirstLetter(replace(file.replace('.js', '')));
		return generateIconCode(iconName);
	});

	const exportStatements = iconFiles.map((file) => {
		if (file === '.DS_Store') return '';
		const iconName = capitalizeFirstLetter(replace(file.replace('.js', '')));
		return generateExportCode(iconName);
	});

	return `import React from 'react';

${importStatements.join('')}

const Icon = ({ name, size, color }) => {
${generateSwitchCaseCode()}
};

export {
${exportStatements.join('')}
};

export default Icon;
`;
};


const generateDemoFile = () => {
	const iconFiles = fs.readdirSync(outputDirectory);
	const iconsArr = iconFiles.map((file) => {
		if (file === '.DS_Store') return '';
		const iconName = capitalizeFirstLetter(replace(file.replace('.js', '')));
		return `"${iconName}"`
	});
	return `
import React from 'react';
import Icon from 'react-svg-icons-loader';

const iconsArr = [${iconsArr.toString()}]

const App = () => {
	return <div className="App">
		{iconsArr.map((iconName) => (
			<span style={{padding: '40px', marginTop: '40px'}}>
				<Icon key={iconName} name={iconName} size={32} />
			</span>
		))}
	</div>
};

export default App;
`;
};

convertAllIcons();
fs.writeFileSync(outputFile, generateIconImports());
fs.writeFileSync(demoFile, generateDemoFile());

console.log('Icons converted and imports generated successfully.');
