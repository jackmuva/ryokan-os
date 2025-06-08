import Phaser from "../../../lib/phaser.js";
import { HEALTH_BAR_ASSET_KEYS } from "../../../asset-utils/asset-keys.js";

export class HealthBar {
	/** @type {Phaser.Scene} */
	scene;
	/** @type {number} */
	x;
	/** @type {number} */
	y;
	/** @type {number} */
	fullWidth;
	/** @type {number} */
	scaleX;
	/** @type {number} */
	scaleY;
	/** @type {Phaser.GameObjects.Image} */
	remainingHealth;
	/** @type {Phaser.GameObjects.Image} */
	shadow;
	/** @type {Phaser.GameObjects.Container} */
	healthBarContainer;

	/** 
	* @param {Phaser.Scene} scene 
	* @param { number } x 
	* @param { number } y 
	*/
	constructor(scene, x, y) {
		this.scene = scene;
		this.fullWidth = 200;
		this.scaleX = 1;
		this.scaleY = 0.5;
		this.x = x;
		this.y = y;
		this.healthBarContainer = this.scene.add.container(x, y, []);
		this.createHealth();
		this.setMeterPercentage(1);
	}

	get container() {
		return this.healthBarContainer;
	}

	/** 
	 * @returns {void}
	**/
	createHealth() {
		this.remainingHealth = this.scene.add.image(this.x, this.y, HEALTH_BAR_ASSET_KEYS.MIDDLE).setDepth(1).setOrigin(0, 0.5).setScale(this.scaleX, this.scaleY);
		this.shadow = this.scene.add.image(this.x, this.y, HEALTH_BAR_ASSET_KEYS.SHADOW).setDepth(0).setOrigin(0, 0.5).setScale(this.scaleX, this.scaleY);
		this.remainingHealth.displayWidth = this.fullWidth;
		this.shadow.displayWidth = this.fullWidth;
		this.healthBarContainer = this.scene.add.container(this.x, this.y, [this.shadow, this.remainingHealth]);
	}

	/**
	* @param {number} percent
	*/
	setMeterPercentage(percent = 1) {
		const width = this.fullWidth * percent;
		this.remainingHealth.displayWidth = width;
	}

	/**
	* @param {number} percent
	* @param {object} options
	*/
	setMeterAnimation(percent, options) {
		const width = this.fullWidth * percent;

		this.scene.tweens.add({
			targets: this.remainingHealth,
			displayWidth: width,
			duration: options?.duration || 1000,
			ease: Phaser.Math.Easing.Sine.Out,
			onUpdate: () => {
				const isVisible = this.remainingHealth.displayWidth > 0;
				this.remainingHealth.visible = isVisible;

			},
			onComplete: options?.callback
		});
	}
}
