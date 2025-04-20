import { BattleCharacter } from "./battle-character.js";

/** @type {import("../../../types/typedef.js").Coordinate} */
const MAIN_POSITION = Object.freeze({
	x: 256,
	y: 500
});

export class MainBattleCharacter extends BattleCharacter {
	/**
	* @param {import("../../../types/typedef.js").BattleCharacterConfig} config
	*/
	constructor(config) {
		super(config, MAIN_POSITION);
	}
}
