import { HealthBar } from "../menu/health-bar.js";
/**
 * @typedef BattleCharacterConfig
 * @type {Object}
 * @property {Phaser.Scene} scene
 * @property {Character} characterDetails
*/

/**
 * @typedef Character 
 * @type {Object}
 * @property {string} name 
 * @property {string} assetKey 
 * @property {number} [assetFrame=0] 
 * @property {number} maxHp 
 * @property {number} currentHp 
 * @property {number} baseAttack 
 * @property {string[]} attackIds 
*/

/** 
 * @typedef Coordinate
 * @type {Object}
 * @property {number} x
 * @property {number} y
*/

export class BattleCharacter {
	/** @protected @type {Phaser.Scene} */
	_scene;
	/** @protected @type {Character} */
	_characterDetails;
	/** @protected @type {Phaser.GameObjects.Image} */
	_characterObject;
	/** @protected @type {HealthBar} */
	_healthBar;

	/**
	* @param {BattleCharacterConfig} config
	* @param {Coordinate} position
	*/
	constructor(config, position) {
		this._scene = config.scene;
		this._characterDetails = config.characterDetails;

		this._healthBar = new HealthBar(this._scene, 20, 34);

		this._characterObject = this._scene.add.image(position.x, position.y, this._characterDetails.assetKey, this._characterDetails.assetFrame || 0);
		this._characterObject.setDisplaySize(Number(this._scene.sys.game.config.width) / 5, Number(this._scene.sys.game.config.height) / 5);
	}
	get healthBar() {
		return this._healthBar;
	}
	get characterObject() {
		return this._characterObject;
	}
}
