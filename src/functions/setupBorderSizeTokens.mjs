import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';

export function setupBorderSizeTokens(borderFrame, format) {
	if (borderFrame) {
		const borders = borderFrame.children;
		const borderObject = {};
		let normalizedUnit;

		borders.forEach(border => {
			let normalizedName = camelize(border.name);
			normalizedName = formatName(normalizedName);

			if (format == 'js') {
				normalizedUnit = border.strokeWeight + 'px'
			} else {
				normalizedUnit = {
					value: border.strokeWeight + 'px',
					type: 'border'
				}
			}

			borderObject[normalizedName] = normalizedUnit;
		});

		return borderObject;
	} else {
		throw new Error('No frame for setupBorderSizeTokens()!');
	}
}
