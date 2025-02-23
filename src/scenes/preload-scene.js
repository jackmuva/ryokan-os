import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './scene-keys.js';

export class PreloadScene extends Phaser.Scene {
	constructor() {
		super({
			key: SCENE_KEYS.PRELOAD_SCENE,
			//active: use if we want scene to start by default
		});
		console.log(SCENE_KEYS.PRELOAD_SCENE);
	}

	init() {

	}

	preload() {
		//good for loading assets
		this.load.image({
			key: 'background',
			url: 'assets/images/battle-backgrounds/town-background.png'
		});
	}

	create() {
		this.textures.get('preload');
	}

	update() {

	}
}
