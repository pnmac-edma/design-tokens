import { setupColorTokens } from './setupColorTokens.mjs';
import { setupSpacingTokens } from './setupSpacingTokens.mjs';
import { setupBorderSizeTokens } from './setupBorderSizeTokens.mjs';
import { setupBorderRadiusTokens } from './setupBorderRadiusTokens.mjs';
import { setupBreakpointTokens } from './setupBreakpointTokens.mjs';
import { setupFontTokens } from './setupFontTokens.mjs';
import { setupFontSizeTokens } from './setupFontSizeTokens.mjs';
import { setupFontWeightTokens } from './setupFontWeightTokens.mjs';
import { setupLineHeightTokens } from './setupLineHeightTokens.mjs';
import { setupZindexTokens } from './setupZindexTokens.mjs';
import { setupShadowTokens } from './setupShadowTokens.mjs';

export function processTokens(sheet, name, format) {
	if (sheet && name) {
		const _name = name.toLowerCase();
		let processedTokens = undefined;

		// Design tokens
		if (_name === 'c' || _name === 'color' || _name === 'colour' || _name === 'colors' || _name === 'colours' || _name === 'brandcolor') {
			processedTokens = setupColorTokens(sheet, format);
		}
		if (_name === 'spacing' || _name === 'spacings') {
			processedTokens = setupSpacingTokens(sheet, format);
		}
		if (_name === 'bordersize' || _name === 'bordersizes') {
			processedTokens = setupBorderSizeTokens(sheet, format);
		}
		if (_name === 'borderradius') {
			processedTokens = setupBorderRadiusTokens(sheet, format);
		}
		if (_name === 'breakpoint' || _name === 'breakpoints') {
			processedTokens = setupBreakpointTokens(sheet, format);
		}
		if (_name === 'font' || _name === 'fonts') {
			processedTokens = setupFontTokens(sheet, format);
		}
		if (_name === 'fontsize' || _name === 'fontsizes') {
			processedTokens = setupFontSizeTokens(sheet, format);
		}
		if (_name === 'weight' || _name === 'weights') {
			processedTokens = setupFontWeightTokens(sheet, format);
		}
		if (_name === 'lineheight' || _name === 'lineheights') {
			processedTokens = setupLineHeightTokens(sheet, format);
		}
		if (_name === 'z' || _name === 'zindex') {
			processedTokens = setupZindexTokens(sheet, format);
		}
		if (_name === 'shadow' || _name === 'shadows') {
			processedTokens = setupShadowTokens(sheet, format);
		}

		return processedTokens;
	} else {
		throw new Error('No sheet or name for processTokens()!');
	}
}
