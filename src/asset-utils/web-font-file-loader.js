import Phaser from "../lib/phaser.js";
import * as WebFontLoader from '../lib/webfontloader.js';
import { FONT_NAME } from './font-keys.js';

export class WebFontFileLoader extends Phaser.Loader.File {
	/** @type {Array<string>} */
	_fontNames;

	/**
	* @param {Phaser.Loader.LoaderPlugin} loader
	* @param {Array<string>} fontNames
	*/
	constructor(loader, fontNames) {
		super(loader, {
			type: 'webfont',
			key: fontNames.toString()
		});
		this._fontNames = fontNames;
	}

	load() {
		WebFontLoader.default.load({
			custom: {
				families: [FONT_NAME]
			},
			active: () => {
				this.loader.nextFile(this, true);
			},
			inactive: () => {
				console.error(`Failed to load fonts ${JSON.stringify(this._fontNames)}`);
				this.loader.nextFile(this, true);
			}
		});
	}

}
