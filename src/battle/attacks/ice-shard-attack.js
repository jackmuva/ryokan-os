import Phaser from "../../lib/phaser.js";
import { ATTACK_ASSET_KEYS } from "../../asset-utils/asset-keys.js";
import { Attack } from "./attack.js";

export class IceShardAttack extends Attack {
	/** @protected @type {Phaser.GameObjects.Sprite} */
	_attackObject;

	/**
	* @param {Phaser.Scene} scene
	* @param {import("../../types/typedef.js").Coordinate} position
	*/
	constructor(scene, position) {
		super(scene, position);

		this._scene.anims.create({
			key: ATTACK_ASSET_KEYS.ICE_SHARD,
			frames: this._scene.anims.generateFrameNumbers(ATTACK_ASSET_KEYS.ICE_SHARD),
			frameRate: 8,
			repeat: 0,
			delay: 0
		});

		this._scene.anims.create({
			key: ATTACK_ASSET_KEYS.ICE_SHARD_START,
			frames: this._scene.anims.generateFrameNumbers(ATTACK_ASSET_KEYS.ICE_SHARD_START),
			frameRate: 8,
			repeat: 0,
			delay: 0
		});


		this._attackObject = this._scene.add.sprite(
			this._position.x,
			this._position.y,
			ATTACK_ASSET_KEYS.ICE_SHARD,
			5,
		)
			.setOrigin(0.5)
			.setScale(4)
			.setAlpha(0);
	}

	/**
	 * @param {() => void} [callback]
	 * @returns {void}
	 */
	playAnimation(callback) {
		if (this._animationPlaying) {
			return;
		}
		this._animationPlaying;
		this._attackObject.setAlpha(1);

		this._attackObject.play(ATTACK_ASSET_KEYS.ICE_SHARD_START);
		this._attackObject.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + ATTACK_ASSET_KEYS.ICE_SHARD_START, () => {
			this._attackObject.play(ATTACK_ASSET_KEYS.ICE_SHARD);
		});
		this._attackObject.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + ATTACK_ASSET_KEYS.ICE_SHARD, () => {
			this._animationPlaying = false;
			this._attackObject.setAlpha(0).setFrame(0);

			if (callback) {
				callback();
			}
		});
	}

}
