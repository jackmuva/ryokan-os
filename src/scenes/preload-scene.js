import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './scene-keys.js';

export class PreloadScene extends Phaser.Scene {
	constructor() {
		super({
			key: SCENE_KEYS.PRELOAD_SCENE,
			//active: true
		});
	}

	init() {
		console.log('init');
	}

	preload() {
		console.log('preloading');
		//good for loading assets
		this.load.image(
			'background',
			'assets/images/battle-backgrounds/town-background.png'
		);
	}

	create() {
		console.log('create');
		console.log(this.textures.get('background'));
	}

	update() {

	}
}
