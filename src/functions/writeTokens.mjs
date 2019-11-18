import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { processTokens } from './processTokens.mjs';
import { writeFile } from './writeFile.mjs';

export function writeTokens(tokens, format) {
	if (tokens.length > 0) {
		tokens.forEach(token => {
			let tokenName = camelize(token.name);
			tokenName = formatName(tokenName);

			const processedToken = processTokens(token, tokenName, format);

			if (format == 'd.ts') {
				if (tokenName == 'color') {
					writeFile(processedToken, `js`, 'color', true, format);
				} else if (tokenName == 'brandColor') {
					writeFile(processedToken, `js`, 'brand', true, format);
				} else {
					writeFile(processedToken, `js`, tokenName, true, format);
				}
			} else if (tokenName == 'color') {
				writeFile(processedToken, `${format}`, 'color', true, format);
			} else if (tokenName == 'brandColor') {
				writeFile(processedToken, `${format}`, 'brand', true, format);
			} else {
				writeFile(processedToken, `${format}`, tokenName, true, format);
			}
		});
	} else {
		throw new Error('Less than one token provided to writeTokens()!');
	}
}
