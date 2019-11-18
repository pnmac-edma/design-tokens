import fs from 'fs';
import { createFolder } from './createFolder.mjs';

export function writeFile(file, path, name, isToken = false, format) {
	if (file && path && name) {
		createFolder(path);
		write(file, path, name, isToken, format);
	} else {
		throw new Error('Missing required parameters to correctly run writeFile()!');
	}
}

function write(file, path, name, isToken, format) {
	let fileContent = file;
	let filePath = `${path}/${name}`;

	if (isToken) {
		if (format == 'mjs' || format == 'js') {
			fileContent = '/**\n';
			fileContent += ' * Do not edit directly\n';
			fileContent += ' * Generated on ' + new Date().toUTCString() + '\n';
			fileContent += ' */\n\n';
			fileContent += `const ${name} = ${JSON.stringify(file, null, '  ')}\n\nexport default ${name};\n`;
		}
		if (format == 'json') {
			fileContent = `{\n"${name}": ${JSON.stringify(file, null, '  ')}\n}\n`;
		}
		if (format == 'd.ts') {
			fileContent = `declare module '@edma/design-tokens/js/${name}';`;
			filePath = `js/${name}`;
		}
		filePath += `.${format}`;
	}

	fs.writeFile(filePath, fileContent, 'utf-8', function(error) {
		if (error) {
			throw new Error('Error in write() > writeFile(): ', error);
		}
	});
}
