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
		super.playEntranceAnimation(callback, ENEMY_POSITION.x, ENEMY_POSITION.y,);
	}

	/**
	 * @param {() => void} callback
	 * @returns {void}
	 */
	playHealthbarEntranceAnimation(callback) {
		super.playHealthbarEntranceAnimation(callback, HEALTH_POSITION.x, HEALTH_POSITION.y,);
	}
}
