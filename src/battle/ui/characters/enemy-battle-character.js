import { BattleCharacter } from "./battle-character.js";

/** @type {import("../../../types/typedef.js").Coordinate} */
const ENEMY_POSITION = Object.freeze({
	x: 768,
	y: 500
});

export class EnemyBattleCharacter extends BattleCharacter {
	/**
	* @param {import("../../../types/typedef.js").BattleCharacterConfig} config
	*/
	constructor(config) {
		super(config, ENEMY_POSITION);
	}
}
