import { BATTLE_BACKGROUND_ASSET_KEYS } from "../asset-utils/asset-keys.js";
import Phaser from "../lib/phaser.js";

export class Background {
	/** @type {Phaser.Scene} */
	scene;
	/** @type {Phaser.GameObjects.Image} */
	background;

	/** @param {Phaser.Scene} scene */
	constructor(scene) {
		this.scene = scene;
		this.background = this.scene.add.image(0, 0, BATTLE_BACKGROUND_ASSET_KEYS.TOWN)
			.setOrigin(0, 0)
			.setAlpha(0)
			.setDisplaySize(Number(this.scene.sys.game.config.width), Number(this.scene.sys.game.config.height));
	}

	showTown() {
		this.background.setTexture(BATTLE_BACKGROUND_ASSET_KEYS.TOWN).setAlpha(1);
	}

}
