import { BATTLE_ASSET_KEYS, BATTLE_BACKGROUND_ASSET_KEYS, CHARACTER_ASSET_KEYS, DATA_ASSET_KEYS, HEALTH_BAR_ASSET_KEYS, UI_ASSET_KEYS, ATTACK_ASSET_KEYS } from '../assets/asset-keys.js';
import { FONT_NAME } from '../assets/font-keys.js';
import { WebFontFileLoader } from '../assets/web-font-file-loader.js';
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

		this.load.json(
			DATA_ASSET_KEYS.ATTACKS,
			'assets/data/attacks.json'
		);

		this.load.addFile(new WebFontFileLoader(this.load, [FONT_NAME]));

		this.load.spritesheet(ATTACK_ASSET_KEYS.ICE_SHARD, 'assets/images/attacks/Ice\ Effect\ 01/ICE\ VFX\ 1/Ice\ VFX\ 1\ Hit.png', {
			frameWidth: 32,
			frameHeight: 32,
		});

		this.load.spritesheet(ATTACK_ASSET_KEYS.ICE_SHARD_START, 'assets/images/attacks/Ice\ Effect\ 01/ICE\ VFX\ 1/Ice\ VFX\ 1\ Start.png', {
			frameWidth: 32,
			frameHeight: 32,
		});

		this.load.spritesheet(ATTACK_ASSET_KEYS.SLASH, 'assets/images/attacks/Smear\ VFX\ 01/Smear\ 01\ Horizontal\ 1.png', {
			frameWidth: 48,
			frameHeight: 48,
		});

	}

	create() {
		this.scene.start(SCENE_KEYS.BATTLE_SCENE);
	}

	update() {

	}
}
