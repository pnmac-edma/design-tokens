import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';

export function setupBorderRadiusTokens(borderFrame, format) {
	if (borderFrame) {
		const borders = borderFrame.children;
		const borderObject = {};
		let normalizedUnit;

		borders.forEach(border => {
			let normalizedName = camelize(border.name);
			normalizedName = formatName(normalizedName);

			if (format == 'js') {
				normalizedUnit = border.cornerRadius + 'px'
			} else {
				normalizedUnit = {
					value: border.cornerRadius + 'px',
					type: 'border'
				}
			}

			borderObject[normalizedName] = normalizedUnit;
		});

		return borderObject;
	} else {
		throw new Error('No frame for setupBorderRadiusTokens()!');
	}
}
