import Phaser from "../../../lib/phaser.js";
import { HEALTH_BAR_ASSET_KEYS } from "../../../assets/asset-keys.js";

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
	middle;
	/** @type {Phaser.GameObjects.Container} */
	healthBarContainer;

	/** 
	* @param {Phaser.Scene} scene 
	* @param { number } x 
	* @param { number } y 
	*/
	constructor(scene, x, y) {
		this.scene = scene;
		this.fullWidtn = 260;
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
		this.middle = this.scene.add.image(this.x, this.y, HEALTH_BAR_ASSET_KEYS.MIDDLE).setOrigin(0, 0.5).setScale(this.scaleX, this.scaleY);
		this.middle.displayWidth = this.fullWidtn;
		this.healthBarContainer = this.scene.add.container(this.x, this.y, [this.middle]);
	}

	/**
	* @param {number} percent
	*/
	setMeterPercentage(percent = 1) {
		const width = this.fullWidtn * percent;
		this.middle.displayWidth = width;
	}
}
