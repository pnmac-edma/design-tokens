import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { normalizeUnits } from './normalizeUnits.mjs';

export function setupSpacingTokens(spacingFrame, format) {
	if (spacingFrame) {
		const spacings = spacingFrame.children;
		const spacingObject = {};
		let normalizedUnit;

		spacings.forEach(spacing => {
			let normalizedName = camelize(spacing.name);
			normalizedName = formatName(normalizedName);

			if (format == 'js') {
				normalizedUnit = normalizeUnits(spacing.absoluteBoundingBox.height, 'px', 'em')
			} else {
				normalizedUnit = {
					value: normalizeUnits(spacing.absoluteBoundingBox.height, 'px', 'em'),
					type: 'layout',
					comment: spacing.absoluteBoundingBox.height + 'px'
				}
			}

			spacingObject[normalizedName] = normalizedUnit;
		});

		return spacingObject;
	} else {
		throw new Error('No frame for setupSpacingTokens()!');
	}
}
