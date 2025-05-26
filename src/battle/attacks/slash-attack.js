import Phaser from "../../lib/phaser.js";
import { ATTACK_ASSET_KEYS } from "../../assets/asset-keys.js";
import { Attack } from "./attack.js";

export class SlashAttack extends Attack {
	/** @protected @type {Phaser.GameObjects.Container} */
	_attackObject;
	/** @protected @type {Phaser.GameObjects.Sprite} */
	_attackObject1;
	/** @protected @type {Phaser.GameObjects.Sprite} */
	_attackObject2;
	/** @protected @type {Phaser.GameObjects.Sprite} */
	_attackObject3;

	/**
	* @param {Phaser.Scene} scene
	* @param {import("../../types/typedef.js").Coordinate} position
	*/
	constructor(scene, position) {
		super(scene, position);

		this._scene.anims.create({
			key: ATTACK_ASSET_KEYS.SLASH,
			frames: this._scene.anims.generateFrameNumbers(ATTACK_ASSET_KEYS.SLASH),
			frameRate: 4,
			repeat: 0,
			delay: 0
		});
		this._attackObject1 = this._scene.add.sprite(
			0,
			0,
			ATTACK_ASSET_KEYS.SLASH,
			0,
		)
			.setOrigin(0.5)
			.setScale(4)
		this._attackObject2 = this._scene.add.sprite(
			30,
			0,
			ATTACK_ASSET_KEYS.SLASH,
			0,
		)
			.setOrigin(0.5)
			.setScale(4)

		this._attackObject3 = this._scene.add.sprite(
			-30,
			0,
			ATTACK_ASSET_KEYS.SLASH,
			0,
		)
			.setOrigin(0.5)
			.setScale(4)

		this._attackObject = this._scene.add.container(this._position.x, this._position.y, [this._attackObject1, this._attackObject2, this._attackObject3]).setAlpha(0);
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

		this._attackObject1.play(ATTACK_ASSET_KEYS.SLASH);
		this._attackObject2.play(ATTACK_ASSET_KEYS.SLASH);
		this._attackObject3.play(ATTACK_ASSET_KEYS.SLASH);
		this._attackObject1.once(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + ATTACK_ASSET_KEYS.SLASH, () => {
			this._animationPlaying = false;
			this._attackObject1.setFrame(0);
			this._attackObject2.setFrame(0);
			this._attackObject3.setFrame(0);
			this._attackObject.setAlpha(0);

			if (callback) {
				callback();
			}
		});
	}

}
