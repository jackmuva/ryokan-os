
import { DATA_ASSET_KEYS } from "../asset-utils/asset-keys.js";
export class DataUtils {
	/** 
	 * @param {Phaser.Scene} scene
	 * @param {Number} attackId
	 */
	static getMonsterAttack(scene, attackId) {
		/** @type {import("../types/typedef.js").Attack[]}*/
		const data = scene.cache.json.get(DATA_ASSET_KEYS.ATTACKS);
		return data.find((attack) => attack.id === attackId);
	}
}
