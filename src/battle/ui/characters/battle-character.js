import { HealthBar } from "../menu/health-bar.js";

export class BattleCharacter {
	/** @protected @type {Phaser.Scene} */
	_scene;
	/** @protected @type {import("../../../types/typedef.js").Character} */
	_characterDetails;
	/** @protected @type {Phaser.GameObjects.Image} */
	_characterObject;
	/** @protected @type {HealthBar} */
	_healthBar;
	/** @protected @type {number} */
	_currentHealth;
	/** @protected @type {number} */
	_maxHealth;
	/** @protected @type {import("../../../types/typedef.js").Attack[]} */
	_characterAttacks;

	/**
	* @param {import("../../../types/typedef.js").BattleCharacterConfig} config
	* @param {import("../../../types/typedef.js").Coordinate} position
	*/
	constructor(config, position) {
		this._scene = config.scene;
		this._characterDetails = config.characterDetails;
		this._currentHealth = this._characterDetails.currentHp;
		this._maxHealth = this._characterDetails.maxHp;
		this.characterAttacks = [];

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

	/** @type {boolean} */
	get isFainted() {
		return this._currentHealth <= 0;
	}

	/** @type {string} */
	get name() {
		return this._characterDetails.name;
	}

	/** @type {import("../../../types/typedef.js").Attack[]} */
	get attacks() {
		return [...this._characterAttacks];
	}

	/** @type {number} */
	get baseAttack() {
		return this._characterDetails.baseAttack;
	}

	/** 
	* @param {number} damage
	* @param {() => void} [callback]
	*/
	takeDamage(damage, callback) {
		this._currentHealth -= damage;
		if (this._currentHealth < 0) {
			this._currentHealth = 0;
		}
		this._healthBar.setMeterAnimation(this._currentHealth / this._maxHealth, { callback });
	}
}
