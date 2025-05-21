import Phaser from "../../lib/phaser.js";
export class Attack {
	/** @protected @type {Phaser.Scene} */
	_scene;
	/** @protected @type {import("../../types/typedef.js").Coordinate} */
	_position;
	/** @protected @type {boolean} */
	_animationPlaying;
	/** @protected @type {Phaser.GameObjects.Sprite | Phaser.GameObjects.Container | undefined} */
	_attackObject

	/**
	* @param {Phaser.Scene} scene
	* @param {import("../../types/typedef.js").Coordinate} position
	*/
	constructor(scene, position) {
		this._scene = scene;
		this._position = position;
		this._animationPlaying = false;
		this._attackObject = undefined;
	}

	/** @type {Phaser.GameObjects.Sprite | Phaser.GameObjects.Container | undefined}*/
	get attackObject() {
		return this._attackObject;
	}

	/**
	 * @param {() => void} callback
	 * @returns {void}
	 */
	playAnimation(callback) {
		console.error('need to implement playAnimation');
	}
}
