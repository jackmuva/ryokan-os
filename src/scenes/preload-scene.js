import { BATTLE_ASSET_KEYS, BATTLE_BACKGROUND_ASSET_KEYS, CHARACTER_ASSET_KEYS, DATA_ASSET_KEYS, HEALTH_BAR_ASSET_KEYS, UI_ASSET_KEYS, ATTACK_ASSET_KEYS, WORLD_ASSET_KEYS, WORLD_CHARACTER_ASSET_KEYS } from '../asset-utils/asset-keys.js';
import { FONT_NAME } from '../asset-utils/font-keys.js';
import { WebFontFileLoader } from '../asset-utils/web-font-file-loader.js';
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
		const menuBackgroundPath = "assets/images/menu-background";
		const attackPath = "assets/images/attacks/";

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
			`${menuBackgroundPath}/menu.png`
		);
		this.load.image(
			HEALTH_BAR_ASSET_KEYS.MIDDLE,
			`${menuBackgroundPath}/healthbar.png`
		);
		this.load.image(
			HEALTH_BAR_ASSET_KEYS.SHADOW,
			`${menuBackgroundPath}/healthbar-shadow.png`
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

		this.load.spritesheet(ATTACK_ASSET_KEYS.ICE_SHARD, `${attackPath}/Ice\ Effect\ 01/ICE\ VFX\ 1/Ice\ VFX\ 1\ Hit.png`, {
			frameWidth: 32,
			frameHeight: 32,
		});

		this.load.spritesheet(ATTACK_ASSET_KEYS.ICE_SHARD_START, `${attackPath}/Ice\ Effect\ 01/ICE\ VFX\ 1/Ice\ VFX\ 1\ Start.png`, {
			frameWidth: 32,
			frameHeight: 32,
		});

		this.load.spritesheet(ATTACK_ASSET_KEYS.SLASH, `${attackPath}/Smear\ VFX\ 01/Smear\ 01\ Horizontal\ 1.png`, {
			frameWidth: 48,
			frameHeight: 48,
		});

		this.load.image(
			WORLD_ASSET_KEYS.WORLD_BACKGROUND,
			'assets/map/level_background.png'
		);

		this.load.spritesheet(WORLD_CHARACTER_ASSET_KEYS.PLAYER, 'assets/characters/axulart-character/custom.png', {
			frameWidth: 64,
			frameHeight: 88,
		});

		this.load.spritesheet(WORLD_CHARACTER_ASSET_KEYS.PLAYER, 'assets/characters/parabellum-games/characters.png', {
			frameWidth: 16,
			frameHeight: 16,
		});
	}

	create() {
		//this.scene.start(SCENE_KEYS.BATTLE_SCENE);
		this.scene.start(SCENE_KEYS.WORLD_SCENE);
	}

	update() {

	}
}
