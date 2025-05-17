import { BattleCharacter } from "./battle-character.js";

/** @type {import("../../../types/typedef.js").Coordinate} */
const ENEMY_POSITION = Object.freeze({
	x: 768,
	y: 500
});

const HEALTH_POSITION = Object.freeze({
	x: 700,
	y: 220
});


export class EnemyBattleCharacter extends BattleCharacter {
	/**
	* @param {import("../../../types/typedef.js").BattleCharacterConfig} config
	*/
	constructor(config) {
		super(config, ENEMY_POSITION, HEALTH_POSITION);
	}

	/**
	 * @param {() => void} callback
	 * @returns {void}
	 */
	playEntranceAnimation(callback) {
		const startXPos = this._scene.game.canvas.width + 30;
		const endXPos = ENEMY_POSITION.x;
		this._characterObject.setPosition(startXPos, ENEMY_POSITION.y);
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
		const startXPos = this._scene.game.canvas.width + 30;
		const endXPos = HEALTH_POSITION.x;
		this._healthBarContainer.setPosition(startXPos, HEALTH_POSITION.y);
		this._healthBarContainer.setAlpha(1);

		this._scene.tweens.add({
			delay: 0,
			duration: 500,
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
}
