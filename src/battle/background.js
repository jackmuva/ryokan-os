import { BATTLE_BACKGROUND_ASSET_KEYS } from "../assets/asset-keys";

export class Background {
	/** @type {Phaser.Scene} */
	scene;
	/** @type {Phaser.GameObjects.Image} */
	background;

	/** @param {Phaser.Scene} scene */
	constructor(scene) {
		this.scene = scene;

		this.background = this.scene.add.image(0, 0, BATTLE_BACKGROUND_ASSET_KEYS.TOWN).setOrigin(0).setAlpha(0);
	}

	showTown() {
		this.background.setTexture(BATTLE_BACKGROUND_ASSET_KEYS.TOWN).setAlpha(1);
	}

}
