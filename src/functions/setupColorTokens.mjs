import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { roundColorValue } from './roundColorValue.mjs';

export function setupColorTokens(colorFrame, format) {
	if (colorFrame) {
		let colors = {};
		let colorString;
		let devName;
		let friendlyName;
		let contrastRatio;
		let contrastCompliance;
		let contrastColor;
		let lightColor;
		let lightCompliance;
		let lightRatio;

		colorFrame.children.forEach(color => {
			devName = color.name;
			friendlyName = color.children[0].name;
			contrastRatio = color.children[2].name;
			contrastCompliance = color.children[1].name;
			contrastColor = `rgba(${roundColorValue(color.children[2].fills[0].color.r, 255)}, ${roundColorValue(color.children[2].fills[0].color.g, 255)}, ${roundColorValue(color.children[2].fills[0].color.b, 255)}, ${roundColorValue(color.children[2].fills[0].color.a, 255)})`;

			if (color.children.length === 5) {
				lightRatio = color.children[4].name;
				lightCompliance = color.children[3].name;
				lightColor = `rgba(${roundColorValue(color.children[3].fills[0].color.r, 255)}, ${roundColorValue(color.children[3].fills[0].color.g, 255)}, ${roundColorValue(color.children[3].fills[0].color.b, 255)}, ${roundColorValue(color.children[3].fills[0].color.a, 255)})`;
			}

			if (format == 'js') {
				colorString = `rgba(${roundColorValue(color.background[0].color.r, 255)}, ${roundColorValue(color.background[0].color.g,255)}, ${roundColorValue(color.background[0].color.b, 255)}, ${roundColorValue(color.background[0].color.a,1)})`;
			} else {
				if (color.children.length === 5) {
					colorString = {
						value: `rgba(${roundColorValue(color.background[0].color.r, 255)}, ${roundColorValue(color.background[0].color.g,255)}, ${roundColorValue(color.background[0].color.b, 255)}, ${roundColorValue(color.background[0].color.a,1)})`,
						type: 'color',
						comment: `${friendlyName}`,
						ratio: `${contrastRatio}`,
						against: `${contrastColor}`,
						compliance: `${contrastCompliance}`,
						lightRatio: `${lightRatio}`,
						lightAgainst: `${lightColor}`,
						lightCompliance: `${lightCompliance}`
					}
				} else {
					colorString = {
						value: `rgba(${roundColorValue(color.background[0].color.r, 255)}, ${roundColorValue(color.background[0].color.g,255)}, ${roundColorValue(color.background[0].color.b, 255)}, ${roundColorValue(color.background[0].color.a,1)})`,
						type: 'color',
						comment: `${friendlyName}`,
						ratio: `${contrastRatio}`,
						against: `${contrastColor}`,
						compliance: `${contrastCompliance}`
					}
				}
			};

			let normalizedName = camelize(devName);
			normalizedName = formatName(normalizedName);
			colors[normalizedName] = colorString;
		});

		return colors;
	} else {
		throw new Error('No frame for setupColorTokens()!');
	}
}
