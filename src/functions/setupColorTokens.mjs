import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { roundColorValue } from './roundColorValue.mjs';

const _rgbToHsl = rgbStr => {
	const [r, g, b] = rgbStr.slice(4, -1).split(',').map(Number)
	const max = Math.max(r, g, b)
	const min = Math.min(r, g, b)
	const l = Math.floor((max + min) / ((0xff * 2) / 100))

	if (max === min) return `hsl(${[0, 0 + '%', l + '%']})`
	const d = max - min
	const s = Math.floor((d / (l > 50 ? 0xff * 2 - max - min : max + min)) * 100)

	if (max === r) return `hsl(${[Math.floor(((g - b) / d + (g < b && 6)) * 60), s + '%', l + '%']})`
	return max === g
	  ? `hsl(${[Math.floor(((b - r) / d + 2) * 60), s + '%', l + '%']})`
	  : `hsl(${[Math.floor(((r - g) / d + 4) * 60), s + '%', l + '%']})`
}

export function setupColorTokens(colorFrame, format) {
	if (colorFrame) {
		let colors = {};
		let colorString;
		let groupName;
		let devName;
		let friendlyName;
		let contrastRatio;
		let contrastCompliance;
		let contrastColor;
		let normalizedName;

		colorFrame.children.forEach(colorGroup => {
			groupName = colorGroup.name;

			colorGroup.children.forEach(color => {
				devName = color.name;
				friendlyName = color.children[0].name;
				contrastRatio = color.children[2].name;
				contrastCompliance = color.children[1].name;
				contrastColor = _rgbToHsl(`rgb(${roundColorValue(color.children[2].fills[0].color.r, 255)}, ${roundColorValue(color.children[2].fills[0].color.g, 255)}, ${roundColorValue(color.children[2].fills[0].color.b, 255)})`);

				if (format == 'js') {
					colorString = _rgbToHsl(`rgb(${roundColorValue(color.background[0].color.r, 255)}, ${roundColorValue(color.background[0].color.g,255)}, ${roundColorValue(color.background[0].color.b, 255)})`);
				} else {
					colorString = {
						value: _rgbToHsl(`rgb(${roundColorValue(color.background[0].color.r, 255)}, ${roundColorValue(color.background[0].color.g,255)}, ${roundColorValue(color.background[0].color.b, 255)})`),
						type: 'color',
						group: `${groupName}`,
						comment: `${friendlyName}`,
						ratio: `${contrastRatio}`,
						against: `${contrastColor}`,
						compliance: `${contrastCompliance}`
					}
				};
				normalizedName = camelize(devName);
				normalizedName = formatName(normalizedName);
				colors[normalizedName] = colorString;
			});

		});

		return colors;
	} else {
		throw new Error('No frame for setupColorTokens()!');
	}
}
