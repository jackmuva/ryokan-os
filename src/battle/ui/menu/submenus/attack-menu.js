import { DIRECTION } from '../../../../common/direction.js';
import { exhaustiveGuard } from '../../../../utils/guard.js';
import { BATTLE_MOVE_OPTIONS } from '../battle-menu-options.js';
import { UI_ASSET_KEYS } from '../../../../asset-utils/asset-keys.js';
import { BATTLE_UI_TEXT_STYLE } from '../battle-menu-config.js';
import { BattleCharacter } from '../../characters/battle-character.js';

const BATTLE_MENU_CURSOR_POS = Object.freeze({
	x: 45,
	y: 36
});


export class AttackMenu {

	/** @type {Phaser.GameObjects.Image} **/
	cursorImage;
	/** @type {import("../battle-menu-options.js").BattleMoveOptions} */
	selectedMove;
	/** @type{number | undefined} */
	selectedMoveIndex;
	/** @type {Phaser.GameObjects.Container} **/
	subMenuObject;
	/** @type {BattleCharacter} */
	#activeCharacter;

	/** 
	 * @param {Phaser.Scene} scene 
	 * @param {BattleCharacter} activeCharacter 
	*/
	constructor(scene, activeCharacter) {
		this.scene = scene;
		this.#activeCharacter = activeCharacter;
		this.selectedMove = BATTLE_MOVE_OPTIONS.ATTACK_1;
		this.selectedMoveIndex = undefined;
		this.createSubMenu();
	}

	createSubMenu() {
		this.cursorImage = this.scene.add.image(42, 38, UI_ASSET_KEYS.CURSOR, 0).setOrigin(0.5).setScale(2);

		/** @type {string[]} */
		const attackNames = [];
		for (let i = 0; i < 4; i += 1) {
			attackNames.push(this.#activeCharacter.attacks[i]?.name || '-');
		}

		this.subMenuObject = this.scene.add.container(520, 0, [
			this.scene.add.text(55, 22, attackNames[0], BATTLE_UI_TEXT_STYLE),
			this.scene.add.text(240, 22, attackNames[1], BATTLE_UI_TEXT_STYLE),
			this.scene.add.text(55, 70, attackNames[2], BATTLE_UI_TEXT_STYLE),
			this.scene.add.text(240, 70, attackNames[3], BATTLE_UI_TEXT_STYLE),
			this.cursorImage,
		]);
		this.hideSubMenu();
	}

	showSubMenu() {
		this.subMenuObject.setAlpha(1);

		this.selectedBattleMoveOption = BATTLE_MOVE_OPTIONS.ATTACK_1;
		this.cursorImage.setPosition(BATTLE_MENU_CURSOR_POS.x, BATTLE_MENU_CURSOR_POS.y);
	}

	hideSubMenu() {
		this.subMenuObject.setAlpha(0);
		this.selectedMoveIndex = undefined;
	}

	moveBattleMoveCursor() {
		switch (this.selectedMove) {
			case BATTLE_MOVE_OPTIONS.ATTACK_1:
				this.cursorImage.setPosition(BATTLE_MENU_CURSOR_POS.x, BATTLE_MENU_CURSOR_POS.y);
				return;
			case BATTLE_MOVE_OPTIONS.ATTACK_2:
				this.cursorImage.setPosition(228, BATTLE_MENU_CURSOR_POS.y);
				return;
			case BATTLE_MOVE_OPTIONS.ATTACK_3:
				this.cursorImage.setPosition(BATTLE_MENU_CURSOR_POS.x, 86);
				return;
			case BATTLE_MOVE_OPTIONS.ATTACK_4:
				this.cursorImage.setPosition(228, 86);
				return;
			default:
				exhaustiveGuard(this.selectedMove);
		}
	}

	/** @param {import('../../../../common/direction.js').Direction} direction */
	updateMoveFromInput(direction) {
		if (this.selectedMove === BATTLE_MOVE_OPTIONS.ATTACK_1) {
			switch (direction) {
				case DIRECTION.RIGHT:
					this.selectedMove = BATTLE_MOVE_OPTIONS.ATTACK_2;
					return;
				case DIRECTION.DOWN:
					this.selectedMove = BATTLE_MOVE_OPTIONS.ATTACK_3;
					return;
				case DIRECTION.LEFT:
				case DIRECTION.UP:
				case DIRECTION.NONE:
					return;
				default:
					exhaustiveGuard(direction);
			}
			return;
		} else if (this.selectedMove === BATTLE_MOVE_OPTIONS.ATTACK_2) {
			switch (direction) {
				case DIRECTION.LEFT:
					this.selectedMove = BATTLE_MOVE_OPTIONS.ATTACK_1;
					return;
				case DIRECTION.DOWN:
					this.selectedMove = BATTLE_MOVE_OPTIONS.ATTACK_4;
					return;
				case DIRECTION.RIGHT:
				case DIRECTION.UP:
				case DIRECTION.NONE:
					return;
				default:
					exhaustiveGuard(direction);
			}
			return;
		} else if (this.selectedMove === BATTLE_MOVE_OPTIONS.ATTACK_3) {
			switch (direction) {
				case DIRECTION.RIGHT:
					this.selectedMove = BATTLE_MOVE_OPTIONS.ATTACK_4;
					return;
				case DIRECTION.UP:
					this.selectedMove = BATTLE_MOVE_OPTIONS.ATTACK_1;
					return;
				case DIRECTION.LEFT:
				case DIRECTION.DOWN:
				case DIRECTION.NONE:
					return;
				default:
					exhaustiveGuard(direction);
			}
			return;
		} else if (this.selectedMove === BATTLE_MOVE_OPTIONS.ATTACK_4) {
			switch (direction) {
				case DIRECTION.LEFT:
					this.selectedMove = BATTLE_MOVE_OPTIONS.ATTACK_3;
					return;
				case DIRECTION.UP:
					this.selectedMove = BATTLE_MOVE_OPTIONS.ATTACK_2;
					return;
				case DIRECTION.RIGHT:
				case DIRECTION.DOWN:
				case DIRECTION.NONE:
					return;
				default:
					exhaustiveGuard(direction);
			}
			return;
		}
		exhaustiveGuard(this.selectedMove);
	}

	handlePlayerChooseAttack() {
		let selectedMoveIndex = 0;
		switch (this.selectedMove) {
			case BATTLE_MOVE_OPTIONS.ATTACK_1:
				selectedMoveIndex = 0
				break;
			case BATTLE_MOVE_OPTIONS.ATTACK_2:
				selectedMoveIndex = 1
				break;
			case BATTLE_MOVE_OPTIONS.ATTACK_3:
				selectedMoveIndex = 2
				break;
			case BATTLE_MOVE_OPTIONS.ATTACK_4:
				selectedMoveIndex = 3
				break;
			default:
				exhaustiveGuard(this.selectedMove);
		}
		this.selectedMoveIndex = selectedMoveIndex;
	}
}
