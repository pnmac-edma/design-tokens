import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';

export function setupFontTokens(frame, format) {
	if (frame) {
		let fontObject = {};
		let font;

		frame.children.forEach(type => {
			let name = camelize(type.name);
			name = formatName(name);

			let fontName = type.style.fontFamily;
			let fontType = 'sans-serif';

			if (fontName.includes('Gilroy'))
				fontName = 'Gilroy';

			if (fontName.includes('Mono') || fontName.includes('mono')) {
				fontType = 'monospace';
			}

			if (format == 'js') {
				font = '"' + fontName + '", ' + fontType
			} else {
				font = {
					value: '"' + fontName + '", ' + fontType,
					type: 'typography'
				};
			}

			fontObject[name] = font;
		});

		return fontObject;
	} else {
		throw new Error('No frame for setupFontTokens()!');
	}
}
