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
				if (shadow.effects[1]) {
					normalizedUnit = '';
					shadow.effects.forEach((effect, i) => {
						normalizedUnit += effect.offset.x + 'px '
							+ effect.offset.y + 'px '
							+ effect.radius + 'px '
							+ `rgba(${effect.color.r * 255}, ${effect.color.g *
							255}, ${effect.color.b * 255}, ${effect.color.a * 1})`
						if (!Object.is(shadow.effects.length - 1, i)) {
							normalizedUnit += ', '
						}
					});
				} else {
					normalizedUnit = shadow.effects[0].offset.x + 'px '
						+ shadow.effects[0].offset.y + 'px '
						+ shadow.effects[0].radius + 'px '
						+ `rgba(${shadow.effects[0].color.r * 255}, ${shadow.effects[0].color.g *
						255}, ${shadow.effects[0].color.b * 255}, ${shadow.effects[0].color.a * 1})`
				}
			} else {
				if (shadow.effects[1]) {
					normalizedUnit = '';
					let concatVal = '';
					shadow.effects.forEach((effect, i) => {
						concatVal += effect.offset.x + 'px '
							+ effect.offset.y + 'px '
							+ effect.radius + 'px '
							+ `rgba(${effect.color.r * 255}, ${effect.color.g *
							255}, ${effect.color.b * 255}, ${effect.color.a * 1})`;
						if (!Object.is(shadow.effects.length - 1, i)) {
							concatVal += ', '
						}
						normalizedUnit = {
							value: concatVal,
							type: 'shadow'
						}
					});
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
			}

			shadowObject[normalizedName] = normalizedUnit;
		});

		return shadowObject;
	} else {
		throw new Error('No frame for setupShadowTokens()!');
	}
}
