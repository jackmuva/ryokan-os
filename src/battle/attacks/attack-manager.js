import Phaser from "../../lib/phaser.js";
import { exhaustiveGuard } from "../../utils/guard.js";
import { ATTACK_KEYS } from "./attack-keys.js"
import { IceShardAttack } from "./ice-shard-attack.js";
import { SlashAttack } from "./slash-attack.js";

/**
 * @typedef {keyof typeof ATTACK_TARGET} AttackTarget
 */

/** @enum {AttackTarget} */
export const ATTACK_TARGET = Object.freeze({
	PLAYER: 'PLAYER',
	ENEMY: 'ENEMY',
});

export class AttackManager {

	/** @type {Phaser.Scene}*/
	_scene;
	/** @type {boolean} */
	_skipAnimation;
	/** @type {IceShardAttack} */
	_iceShardAttack;
	/** @type {SlashAttack} */
	_slashAttack;

	/**
	* @param {Phaser.Scene} scene
	* @param {boolean} skipAnimation
	*/
	constructor(scene, skipAnimation) {
		this._scene = scene;
		this._skipAnimation = skipAnimation;


	}

	/**
	* @param {import("./attack-keys").AttackKeys } attack
	* @param {AttackTarget} target 
	* @param {() => void} [callback]
	* @returns {void}
	*/
	playAttackAnimation(attack, target, callback) {
		if (this._skipAnimation) {
			callback();
			return;
		}

		let x = 760;
		let y = 470
		if (target === ATTACK_TARGET.PLAYER) {
			x = 260;
		}

		switch (attack) {
			case ATTACK_KEYS.ICE_SHARD:
				if (!this._iceShardAttack) {
					this._iceShardAttack = new IceShardAttack(this._scene, { x, y });
				}
				this._iceShardAttack.attackObject.setPosition(x, y);
				this._iceShardAttack.playAnimation(callback);
				break;
			case ATTACK_KEYS.SLASH:
				if (!this._slashAttack) {
					this._slashAttack = new SlashAttack(this._scene, { x, y });
				}
				this._slashAttack.attackObject.setPosition(x, y);
				this._slashAttack.playAnimation(callback);
				break;
			default:
				exhaustiveGuard(attack);
		}
	}
}
