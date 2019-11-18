import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';

export function setupFontWeightTokens(frame, format) {
	if (frame) {
		let fontWeightObject = {};
		let fontWeight;

		frame.children.forEach(type => {
			let name = camelize(type.name);
			name = formatName(name);

			if (format == 'js') {
				fontWeight = type.style.fontWeight
			} else {
				fontWeight = {
					value: type.style.fontWeight,
					type: 'typography'
				}
			}

			fontWeightObject[name] = fontWeight;
		});

		return fontWeightObject;
	} else {
		throw new Error('No frame for setupFontWeightTokens()!');
	}
}
