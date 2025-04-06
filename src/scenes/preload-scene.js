import { BATTLE_ASSET_KEYS, BATTLE_BACKGROUND_ASSET_KEYS, CHARACTER_ASSET_KEYS, HEALTH_BAR_ASSET_KEYS, UI_ASSET_KEYS } from '../assets/asset-keys.js';
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
		this.load.image(
			CHARACTER_ASSET_KEYS.BLONDE_ELF,
			'assets/characters/blonde_elf.png'
		);
		this.load.image(
			CHARACTER_ASSET_KEYS.MAIN_CHARACTER,
			'assets/characters/main_char.png'
		);
		this.load.image(
			BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND,
			'assets/images/menu-background/menu.png'
		);
		this.load.image(
			HEALTH_BAR_ASSET_KEYS.MIDDLE,
			'assets/images/menu-background/healthbar.png'
		);
		this.load.image(
			HEALTH_BAR_ASSET_KEYS.SHADOW,
			'assets/images/menu-background/healthbar-shadow.png'
		);


		this.load.image(
			UI_ASSET_KEYS.CURSOR,
			'assets/images/ui/cursor.png'
		);
	}

	create() {
		//starts a new scene and ends this scene, cleaning up all objects with this scene
		this.scene.start(SCENE_KEYS.BATTLE_SCENE);
	}

	update() {

	}
}
