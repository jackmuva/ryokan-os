import { WORLD_CHARACTER_ASSET_KEYS } from "../../asset-utils/asset-keys.js";
import { Character } from "./character.js";

/** 
 * @typedef {Omit<import("./character.js").CharacterConfig, 'assetKey' | 'assetFrame'>} PlayerConfig
 */

export class Player extends Character {

	/** @param {PlayerConfig} config */
	constructor(config) {
		super({
			...config,
			assetKey: WORLD_CHARACTER_ASSET_KEYS.PLAYER,
			assetFrame: 7
		});
	}
}
