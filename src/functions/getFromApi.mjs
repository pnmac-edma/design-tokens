import { writeFile } from './writeFile.mjs';
import fetch from 'node-fetch';

export async function getFromApi(figmaApiKey, figmaId) {
	let data = {};

	const url = 'https://api.figma.com/v1/files/' + figmaId;

	await fetch(url, {
		headers: {
			'X-Figma-Token': figmaApiKey
		}
	})
		.then(res => res.json())
		.then(json => {
			data = json;
			writeFile(JSON.stringify(json), './', '_raw.json');
		});

	return data;
}
