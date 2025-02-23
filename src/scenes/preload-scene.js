import { BATTLE_BACKGROUND_ASSET_KEYS } from '../assets/asset-keys.js';
import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './scene-keys.js';

export class PreloadScene extends Phaser.Scene {
	constructor() {
		super({
			key: SCENE_KEYS.PRELOAD_SCENE,
		});
	}

	init() {
		console.log('init');
	}

	preload() {
		console.log('preloading');
		//good for loading assets
		this.load.image(
			BATTLE_BACKGROUND_ASSET_KEYS.TOWN,
			'assets/images/battle-backgrounds/town-background.png'
		);
		//this.load.image(
		//	BATTLE_BACKGROUND_ASSET_KEYS.TOWN,
		//	'assets/images/battle-backgrounds/town-background.png'
		//);
		//this.load.image(
		//	BATTLE_BACKGROUND_ASSET_KEYS.TOWN,
		//	'assets/images/battle-backgrounds/town-background.png'
		//);
		//this.load.image(
		//	BATTLE_BACKGROUND_ASSET_KEYS.TOWN,
		//	'assets/images/battle-backgrounds/town-background.png'
		//);
	}

	create() {
		console.log('create');
		this.add.image(0, 0, BATTLE_BACKGROUND_ASSET_KEYS.TOWN).setOrigin(0);
	}

	update() {

	}
}
