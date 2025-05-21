import Phaser from "../../lib/phaser.js";
import { ATTACK_ASSET_KEYS } from "../../assets/asset-keys.js";
import { Attack } from "./attack.js";

export class IceShardAttack extends Attack {
	/** @protected @type {Phaser.GameObjects.Sprite} */
	_attackObject

	/**
	* @param {Phaser.Scene} scene
	* @param {import("../../types/typedef.js").Coordinate} position
	*/
	constructor(scene, position) {
		super(scene, position);

		this._attackObject = this._scene.add.sprite(
			this._position.x,
			this._position.y,
			ATTACK_ASSET_KEYS.ICE_SHARD,
			5,
		)
			.setOrigin(0.5)
			.setScale(4)
			.setAlpha(1);
	}
}
