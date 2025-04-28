import { HealthBar } from "../menu/health-bar.js";
import { BATTLE_ASSET_KEYS } from "../../../assets/asset-keys.js";
import { CHARACTER_ASSET_KEYS } from "../../../assets/asset-keys.js";

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
	/** @protected @type {Phaser.GameObjects.Container} */
	_healthBarContainer;


	/**
	* @param {import("../../../types/typedef.js").BattleCharacterConfig} config
	* @param {import("../../../types/typedef.js").Coordinate} position
	* @param {import("../../../types/typedef.js").Coordinate} healthBarPosition
	*/
	constructor(config, position, healthBarPosition) {
		this._scene = config.scene;
		this._characterDetails = config.characterDetails;
		this._currentHealth = this._characterDetails.currentHp;
		this._maxHealth = this._characterDetails.maxHp;
		this.characterAttacks = [];

		this._characterObject = this._scene.add.image(position.x, position.y, this._characterDetails.assetKey, this._characterDetails.assetFrame || 0);
		this._characterObject.setDisplaySize(Number(this._scene.sys.game.config.width) / 5, Number(this._scene.sys.game.config.height) / 5);

		this.createHealthBar(healthBarPosition.x, healthBarPosition.y);
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

	/** @type {number} */
	get level() {
		return this._characterDetails.level;
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

	/**
	* @param {number} x
	* @param {number} y
	*/
	createHealthBar(x, y) {
		this._healthBar = new HealthBar(this._scene, 20, 34);

		const health = this._healthBar.container;
		const name = this._scene.add.text(30, 20, this._characterDetails.assetKey, {
			color: '#7E3D3F',
			fontSize: '20px',
		});
		const healthBarBackground = this._scene.add.image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND)
			.setOrigin(0)
			.setDisplaySize(Number(this._scene.sys.game.config.width) / 4, Number(this._scene.sys.game.config.height) / 4);
		const levelText = this._scene.add.text(name.width + 35, 23, `L${this.level}`, {
			color: '#ED474B',
			fontSize: '16px',
		})
		const hpText = this._scene.add.text(12, 62, 'HP', {
			color: '#FF6505',
			fontSize: '14px',
			fontStyle: 'italic'
		})

		this._healthBarContainer = this._scene.add.container(x, y, [
			healthBarBackground,
			name,
			health,
			levelText,
			hpText
		]);

	}
}
