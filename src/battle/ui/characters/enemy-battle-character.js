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
	playEnemyEntranceAnimation(callback) {
		super.playEntranceAnimation(ENEMY_POSITION.x, ENEMY_POSITION.y, callback);
	}

	/**
	 * @param {() => void} callback
	 * @returns {void}
	 */
	playEnemyHealthbarEntranceAnimation(callback) {
		super.playHealthbarEntranceAnimation(HEALTH_POSITION.x, HEALTH_POSITION.y, callback);
	}
}
