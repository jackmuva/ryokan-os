import { DIRECTION } from '../../../../common/direction.js';
import { exhaustiveGuard } from '../../../../utils/guard.js';
import { BATTLE_MOVE_OPTIONS } from '../battle-menu-options.js';
import { UI_ASSET_KEYS } from '../../../../assets/asset-keys.js';
import { BATTLE_UI_TEXT_STYLE } from '../battle-menu-config.js';

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

	/** @param {Phaser.Scene} scene **/
	constructor(scene) {
		this.scene = scene;
		this.selectedMove = BATTLE_MOVE_OPTIONS.ATTACK_1;
		this.selectedMoveIndex = undefined;
	}
	createMonsterAttackSubmenu() {
		this.cursorImage = this.scene.add.image(42, 38, UI_ASSET_KEYS.CURSOR, 0).setOrigin(0.5).setScale(2);
		this.moveSelectionSubBattleMenuContainerGameObject = this.scene.add.container(520, 0, [
			this.scene.add.text(55, 22, "slash", BATTLE_UI_TEXT_STYLE),
			this.scene.add.text(240, 22, "-", BATTLE_UI_TEXT_STYLE),
			this.scene.add.text(55, 70, "-", BATTLE_UI_TEXT_STYLE),
			this.scene.add.text(240, 70, "-", BATTLE_UI_TEXT_STYLE),
			this.cursorImage,
		]);
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
	updateSelectedBattleMoveOptionFromInput(direction) {
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
