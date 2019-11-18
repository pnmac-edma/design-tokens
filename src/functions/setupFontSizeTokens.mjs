import { units } from '../meta/units.mjs';
import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';

export function setupFontSizeTokens(frame, format) {
	if (frame) {
		let fontSizeObject = {};

		frame.children.forEach(type => {
			let name = camelize(type.name);
			let fontSize;

			name = formatName(name);
			if (format == 'js') {
				fontSize = type.style.fontSize / units.globalRemSize + 'rem'
			} else {
				fontSize = {
					value: type.style.fontSize / units.globalRemSize + 'rem', // TODO: Use a converter function?
					type: 'typography',
					comment: type.style.fontSize + 'px'
				}
			}

			fontSizeObject[name] = fontSize;
		});

		return fontSizeObject;
	} else {
		throw new Error('No frame for setupFontSizeTokens()!');
	}
}
