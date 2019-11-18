import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';

export function setupBreakpointTokens(breakpointFrame, format) {
	if (breakpointFrame) {
		const breakpoints = breakpointFrame.children;
		const breakpointObject = {};
		let normalizedBreakpoint;

		breakpoints.forEach(breakpoint => {
			let normalizedName = camelize(breakpoint.name);
			normalizedName = formatName(normalizedName);

			if (format == 'js') {
				normalizedBreakpoint = breakpoint.absoluteBoundingBox.width + 'px'
			} else {
				normalizedBreakpoint = {
					value: breakpoint.absoluteBoundingBox.width + 'px',
					type: 'layout'
				}
			}

			breakpointObject[normalizedName] = normalizedBreakpoint;
		});

		return breakpointObject;
	} else {
		throw new Error('No frame for setupBreakpointTokens()!');
	}
}
