import { HealthBar } from "../menu/health-bar.js";
import { BATTLE_ASSET_KEYS } from "../../../assets/asset-keys.js";
import { DataUtils } from "../../../utils/data-utils.js";

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
	/** @protected @type {boolean} */
	_skipAnimations;


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
		this._characterAttacks = [];
		this._skipAnimations = config.skipAnimations || false;

		this._characterObject = this._scene.add.image(position.x, position.y, this._characterDetails.assetKey, this._characterDetails.assetFrame || 0);
		this._characterObject.setDisplaySize(Number(this._scene.sys.game.config.width) / 5, Number(this._scene.sys.game.config.height) / 5);
		this._characterObject.setAlpha(0);

		this.createHealthBar(healthBarPosition.x, healthBarPosition.y);

		this._characterDetails.attackIds.forEach((attackId) => {
			const charAttack = DataUtils.getMonsterAttack(this._scene, attackId);
			if (charAttack !== undefined) {
				this._characterAttacks.push(charAttack);
			}
		});
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
	 * @param {() => void} callback
	 * @returns {void}
	 */
	playEntranceAnimation(x, y, callback) {
		const startXPos = -30;
		const endXPos = x;

		if (this._skipAnimations) {
			this._characterObject.setX(x).setAlpha(1);
			callback();
			return;
		}


		this._characterObject.setPosition(startXPos, y);
		this._characterObject.setAlpha(1);

		this._scene.tweens.add({
			delay: 0,
			duration: 500,
			x: {
				from: startXPos,
				start: startXPos,
				to: endXPos,
			},
			targets: this._characterObject,
			onComplete: () => {
				callback();
			}
		});
	}

	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {() => void} callback
	 * @returns {void}
	 */
	playHealthbarEntranceAnimation(x, y, callback) {
		const startXPos = -30;
		const endXPos = x;

		if (this._skipAnimations) {
			this._healthBarContainer.setX(x).setAlpha(1);
			callback();
			return;
		}

		this._healthBarContainer.setPosition(startXPos, y);
		this._healthBarContainer.setAlpha(1);

		this._scene.tweens.add({
			delay: 0,
			duration: 700,
			x: {
				from: startXPos,
				start: startXPos,
				to: endXPos,
			},
			targets: this._healthBarContainer,
			onComplete: () => {
				callback();
			}
		});
	}

	/**
		 * @param {() => void} callback
		 * @returns {void}
		 */
	playDamageAnimation(callback) {
		if (this._skipAnimations) {
			this._characterObject.setAlpha(1);
			callback();
			return;
		}

		this._scene.tweens.add({
			delay: 0,
			duration: 150,
			targets: this.characterObject,
			alpha: {
				from: 1,
				start: 1,
				to: 0
			},
			repeat: 10,
			onComplete: () => {
				this.characterObject.setAlpha(1);
				callback();
			}
		});

	}

	/**
	 * @param {() => void} callback
	 * @returns {void}
	 */
	playDefeatAnimation(callback) {
		const startYPos = this.characterObject.y;
		const endYPos = this._scene.game.canvas.height + 70;

		if (this._skipAnimations) {
			this._characterObject.setY(endYPos);
			callback();
			return;
		}


		this._scene.tweens.add({
			delay: 0,
			duration: 900,
			y: {
				from: startYPos,
				start: startYPos,
				to: endYPos,
			},
			targets: this._characterObject,
			onComplete: () => {
				callback();
			}
		});

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
		]).setAlpha(0);;
	}
}
