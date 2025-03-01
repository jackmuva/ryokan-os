import { BATTLE_BACKGROUND_ASSET_KEYS, CHARACTER_ASSET_KEYS } from '../assets/asset-keys.js';
import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './scene-keys.js';

export class BattleScene extends Phaser.Scene {
	constructor() {
		super({
			key: SCENE_KEYS.BATTLE_SCENE,
		});
	}

	create() {
		const battle_scene = this.add.image(0, 0, BATTLE_BACKGROUND_ASSET_KEYS.TOWN).setOrigin(0, 0);
		battle_scene.setDisplaySize(Number(this.sys.game.config.width), Number(this.sys.game.config.height));

		const enemy = this.add.image(768, 500, CHARACTER_ASSET_KEYS.BLONDE_ELF, 0);
		enemy.setDisplaySize(Number(this.sys.game.config.width) / 5, Number(this.sys.game.config.height) / 5);
		const main_char = this.add.image(256, 500, CHARACTER_ASSET_KEYS.MAIN_CHARACTER, 0).setFlipX(true);
		main_char.setDisplaySize(Number(this.sys.game.config.width) / 5, Number(this.sys.game.config.height) / 5);
	}

}
