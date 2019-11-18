import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';

export function setupShadowTokens(shadowFrame, format) {
	if (shadowFrame) {
		const shadows = shadowFrame.children;
		const shadowObject = {};
		let normalizedUnit;

		shadows.forEach(shadow => {
			let normalizedName = camelize(shadow.name);
			normalizedName = formatName(normalizedName);

			if (format == 'js') {
				normalizedUnit = shadow.effects[0].offset.x + 'px '
						+ shadow.effects[0].offset.y + 'px '
						+ shadow.effects[0].radius + 'px '
						+ `rgba(${shadow.effects[0].color.r * 255}, ${shadow.effects[0].color.g *
						255}, ${shadow.effects[0].color.b * 255}, ${shadow.effects[0].color.a * 1})`
			} else {
				normalizedUnit = {
					value: shadow.effects[0].offset.x + 'px '
						+ shadow.effects[0].offset.y + 'px '
						+ shadow.effects[0].radius + 'px '
						+ `rgba(${shadow.effects[0].color.r * 255}, ${shadow.effects[0].color.g *
						255}, ${shadow.effects[0].color.b * 255}, ${shadow.effects[0].color.a * 1})`,
					type: 'shadow'
				}
			}

			shadowObject[normalizedName] = normalizedUnit;
		});

		return shadowObject;
	} else {
		throw new Error('No frame for setupShadowTokens()!');
	}
}
