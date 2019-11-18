import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';

export function setupZindexTokens(ZindexFrame, format) {
	if (ZindexFrame) {
		const Zindexes = ZindexFrame.children;
		const ZindexObject = {};
		let normalizedUnit;

		Zindexes.forEach(Zindex => {
			let normalizedName = camelize(Zindex.name);
			normalizedName = formatName(normalizedName);

			if (format == 'js') {
				normalizedUnit = Zindex.effects[0].offset.x
			} else {
				normalizedUnit = {
					value: Zindex.effects[0].offset.x,
					type: 'layout'
				}
			}

			ZindexObject[normalizedName] = normalizedUnit;
		});

		return ZindexObject;
	} else {
		throw new Error('No frame for setupZindexTokens()!');
	}
}
