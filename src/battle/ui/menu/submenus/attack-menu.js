import { BATTLE_MENU_OPTIONS } from '../battle-menu-options.js';
import { DIRECTION } from '../../../../common/direction.js';
import { exhaustiveGuard } from '../../../../utils/guard.js';
import { BATTLE_MOVE_OPTIONS } from '../battle-menu-options.js';

const BATTLE_MENU_CURSOR_POS = Object.freeze({
	x: 45,
	y: 36
});


export class AttackMenu {

	/** @param {import('../../../../common/direction.js').DIRECTION} direction */
	updateSelectedBattleMenuOptionFromInput(direction) {
		if (this.selectedBattleMenuOption === BATTLE_MENU_OPTIONS.FIGHT) {
			switch (direction) {
				case DIRECTION.RIGHT:
					this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.ITEM;
					return;
				case DIRECTION.DOWN:
					this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.PASS;
					return;
				case DIRECTION.LEFT:
				case DIRECTION.UP:
				case DIRECTION.NONE:
					return;
				default:
					exhaustiveGuard(direction);
			}
			return;
		} else if (this.selectedBattleMenuOption === BATTLE_MENU_OPTIONS.ITEM) {
			switch (direction) {
				case DIRECTION.LEFT:
					this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
					return;
				case DIRECTION.DOWN:
					this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FLEE;
					return;
				case DIRECTION.RIGHT:
				case DIRECTION.UP:
				case DIRECTION.NONE:
					return;
				default:
					exhaustiveGuard(direction);
			}
			return;
		} else if (this.selectedBattleMenuOption === BATTLE_MENU_OPTIONS.PASS) {
			switch (direction) {
				case DIRECTION.RIGHT:
					this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FLEE;
					return;
				case DIRECTION.UP:
					this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
					return;
				case DIRECTION.LEFT:
				case DIRECTION.DOWN:
				case DIRECTION.NONE:
					return;
				default:
					exhaustiveGuard(direction);
			}
			return;
		} else if (this.selectedBattleMenuOption === BATTLE_MENU_OPTIONS.FLEE) {
			switch (direction) {
				case DIRECTION.LEFT:
					this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.PASS;
					return;
				case DIRECTION.UP:
					this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.ITEM;
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
		exhaustiveGuard(this.selectedBattleMenuOption);
	}

	moveMainBattleMenuCursor() {
		if (this.activeBattleMenu !== ACTIVE_BATTLE_MENU.BATTLE_MAIN) {
			return;
		}
		switch (this.selectedBattleMenuOption) {
			case BATTLE_MENU_OPTIONS.FIGHT:
				this.mainBattleMenuCursorPhaserImageGameObject.setPosition(BATTLE_MENU_CURSOR_POS.x, BATTLE_MENU_CURSOR_POS.y);
				return;
			case BATTLE_MENU_OPTIONS.ITEM:
				this.mainBattleMenuCursorPhaserImageGameObject.setPosition(228, BATTLE_MENU_CURSOR_POS.y);
				return;
			case BATTLE_MENU_OPTIONS.PASS:
				this.mainBattleMenuCursorPhaserImageGameObject.setPosition(BATTLE_MENU_CURSOR_POS.x, 86);
				return;
			case BATTLE_MENU_OPTIONS.FLEE:
				this.mainBattleMenuCursorPhaserImageGameObject.setPosition(228, 86);
				return;
			default:
				exhaustiveGuard(this.selectedBattleMenuOption);
		}
	}

	moveBattleMoveCursor() {
		if (this.activeBattleMenu !== ACTIVE_BATTLE_MENU.ATTACK_SELECT) {
			return;
		}
		switch (this.selectedBattleMoveOption) {
			case BATTLE_MOVE_OPTIONS.ATTACK_1:
				this.attackBattleMenuCursorPhaserImageGameObject.setPosition(BATTLE_MENU_CURSOR_POS.x, BATTLE_MENU_CURSOR_POS.y);
				return;
			case BATTLE_MOVE_OPTIONS.ATTACK_2:
				this.attackBattleMenuCursorPhaserImageGameObject.setPosition(228, BATTLE_MENU_CURSOR_POS.y);
				return;
			case BATTLE_MOVE_OPTIONS.ATTACK_3:
				this.attackBattleMenuCursorPhaserImageGameObject.setPosition(BATTLE_MENU_CURSOR_POS.x, 86);
				return;
			case BATTLE_MOVE_OPTIONS.ATTACK_4:
				this.attackBattleMenuCursorPhaserImageGameObject.setPosition(228, 86);
				return;
			default:
				exhaustiveGuard(this.selectedBattleMoveOption);
		}
	}

	/** @param {import('../../../../common/direction.js').Direction} direction */
	updateSelectedBattleMoveOptionFromInput(direction) {
		if (this.selectedBattleMoveOption === BATTLE_MOVE_OPTIONS.ATTACK_1) {
			switch (direction) {
				case DIRECTION.RIGHT:
					this.selectedBattleMoveOption = BATTLE_MOVE_OPTIONS.ATTACK_2;
					return;
				case DIRECTION.DOWN:
					this.selectedBattleMoveOption = BATTLE_MOVE_OPTIONS.ATTACK_3;
					return;
				case DIRECTION.LEFT:
				case DIRECTION.UP:
				case DIRECTION.NONE:
					return;
				default:
					exhaustiveGuard(direction);
			}
			return;
		} else if (this.selectedBattleMoveOption === BATTLE_MOVE_OPTIONS.ATTACK_2) {
			switch (direction) {
				case DIRECTION.LEFT:
					this.selectedBattleMoveOption = BATTLE_MOVE_OPTIONS.ATTACK_1;
					return;
				case DIRECTION.DOWN:
					this.selectedBattleMoveOption = BATTLE_MOVE_OPTIONS.ATTACK_4;
					return;
				case DIRECTION.RIGHT:
				case DIRECTION.UP:
				case DIRECTION.NONE:
					return;
				default:
					exhaustiveGuard(direction);
			}
			return;
		} else if (this.selectedBattleMoveOption === BATTLE_MOVE_OPTIONS.ATTACK_3) {
			switch (direction) {
				case DIRECTION.RIGHT:
					this.selectedBattleMoveOption = BATTLE_MOVE_OPTIONS.ATTACK_4;
					return;
				case DIRECTION.UP:
					this.selectedBattleMoveOption = BATTLE_MOVE_OPTIONS.ATTACK_1;
					return;
				case DIRECTION.LEFT:
				case DIRECTION.DOWN:
				case DIRECTION.NONE:
					return;
				default:
					exhaustiveGuard(direction);
			}
			return;
		} else if (this.selectedBattleMoveOption === BATTLE_MOVE_OPTIONS.ATTACK_4) {
			switch (direction) {
				case DIRECTION.LEFT:
					this.selectedBattleMoveOption = BATTLE_MOVE_OPTIONS.ATTACK_3;
					return;
				case DIRECTION.UP:
					this.selectedBattleMoveOption = BATTLE_MOVE_OPTIONS.ATTACK_2;
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
		exhaustiveGuard(this.selectedBattleMoveOption);
	}

}
