import { BattleCharacter } from "./battle-character.js";

/** @type {import("../../../types/typedef.js").Coordinate} */
const MAIN_POSITION = Object.freeze({
	x: 256,
	y: 500
});

const HEALTH_POSITION = Object.freeze({
	x: 100,
	y: 220
});



export class MainBattleCharacter extends BattleCharacter {
	/** @type {Phaser.GameObjects.Text}*/
	healthBarDetails;

	/**
	* @param {import("../../../types/typedef.js").BattleCharacterConfig} config
	*/
	constructor(config) {
		super(config, MAIN_POSITION, HEALTH_POSITION);
		this._characterObject.setFlipX(true);
		this.addHealthBarDetails();
	}

	setHealthBarText() {
		this.healthBarDetails.setText(`${this._currentHealth}/${this._maxHealth}`);
	}

	addHealthBarDetails() {
		this.healthBarDetails = this._scene.add.text(240, 82, '', {
			color: '#7E3D3F',
			fontSize: '12px',
		}).setOrigin(1, 0);
		this.setHealthBarText();
		this._healthBarContainer.add(this.healthBarDetails);
	}

	/** 
		* @param {number} damage
		* @param {() => void} [callback]
		*/
	takeDamage(damage, callback) {
		super.takeDamage(damage, callback);
		this.setHealthBarText();
	}

	/**
	 * @param {() => void} callback
	 * @returns {void}
	 */
	playEntranceAnimation(callback) {
		const startXPos = -30;
		const endXPos = MAIN_POSITION.x;
		this._characterObject.setPosition(startXPos, MAIN_POSITION.y);
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
	 * @param {() => void} callback
	 * @returns {void}
	 */
	playHealthbarEntranceAnimation(callback) {
		const startXPos = -30;
		const endXPos = HEALTH_POSITION.x;
		this._healthBarContainer.setPosition(startXPos, HEALTH_POSITION.y);
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
		throw new Error('playDamageAnimation not implemented');
	}

	/**
	 * @param {() => void} callback
	 * @returns {void}
	 */
	playDefeatAnimation(callback) {
		throw new Error('playDefeatAnimation not implemented');
	}


}
