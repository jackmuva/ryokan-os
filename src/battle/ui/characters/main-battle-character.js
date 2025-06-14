import { FONT_NAME } from "../../../asset-utils/font-keys.js";
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
			fontFamily: FONT_NAME
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
		super.playEntranceAnimation(callback, MAIN_POSITION.x, MAIN_POSITION.y,);
	}

	/**
	 * @param {() => void} callback
	 * @returns {void}
	 */
	playHealthbarEntranceAnimation(callback) {
		super.playHealthbarEntranceAnimation(callback, HEALTH_POSITION.x, HEALTH_POSITION.y,);
	}

}
