import { CHARACTER_ASSET_KEYS, UI_ASSET_KEYS } from "../../../assets/asset-keys.js";
import { DIRECTION } from "../../../common/direction.js";
import { exhaustiveGuard } from "../../../utils/guard.js";
import { BATTLE_MOVE_OPTIONS, BATTLE_MENU_OPTIONS, ACTIVE_BATTLE_MENU } from "./battle-menu-options.js";
import { BATTLE_UI_TEXT_STYLE } from "./battle-menu-config.js";



const BATTLE_MENU_CURSOR_POS = Object.freeze({
	x: 45,
	y: 36
});


export class BattleMenu {
	/** @type {Phaser.Scene} **/
	scene;
	/** @type {Phaser.GameObjects.Container} **/
	mainBattleMenuPhaserContainerGameObject;
	/** @type {Phaser.GameObjects.Container} **/
	moveSelectionSubBattleMenuContainerGameObject;
	/** @type {Phaser.GameObjects.Text} **/
	battleTextGameObjectLine1;
	/** @type {Phaser.GameObjects.Text} **/
	battleTextGameObjectLine2;
	/** @type {Phaser.GameObjects.Image} **/
	mainBattleMenuCursorPhaserImageGameObject;
	/** @type {import("./battle-menu-options.js").BattleMenuOptions} */
	selectedBattleMenuOption;
	/** @type {Phaser.GameObjects.Image} **/
	attackBattleMenuCursorPhaserImageGameObject;
	/** @type {import("./battle-menu-options.js").BattleMoveOptions} */
	selectedBattleMoveOption;
	/** @type import("./battle-menu-options.js").ActiveBattleMenu */
	activeBattleMenu;

	/** @param {Phaser.Scene} scene **/
	constructor(scene) {
		this.scene = scene;
		this.activeBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_MAIN;
		this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
		this.selectedBattleMoveOption = BATTLE_MOVE_OPTIONS.ATTACK_1;
		this.createMainInfoPane();
		this.createMainBattleMenu();
		this.createMonsterAttackSubmenu();
	}

	showMainBattleMenu() {
		this.activeBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_MAIN;
		this.mainBattleMenuPhaserContainerGameObject.setAlpha(1);
		this.battleTextGameObjectLine1.setAlpha(1);
		this.battleTextGameObjectLine2.setAlpha(1);

		this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
		this.mainBattleMenuCursorPhaserImageGameObject.setPosition(BATTLE_MENU_CURSOR_POS.x, BATTLE_MENU_CURSOR_POS.y);
	}

	hideMainBattleMenu() {
		this.mainBattleMenuPhaserContainerGameObject.setAlpha(0);
		this.battleTextGameObjectLine1.setAlpha(0);
		this.battleTextGameObjectLine2.setAlpha(0);
	}

	showMonsterAttackSubMenu() {
		this.activeBattleMenu = ACTIVE_BATTLE_MENU.ATTACK_SELECT;
		this.moveSelectionSubBattleMenuContainerGameObject.setAlpha(1);

		this.selectedBattleMoveOption = BATTLE_MOVE_OPTIONS.ATTACK_1;
		this.attackBattleMenuCursorPhaserImageGameObject.setPosition(BATTLE_MENU_CURSOR_POS.x, BATTLE_MENU_CURSOR_POS.y);
	}


	hideMonsterAttackSubMenu() {
		this.moveSelectionSubBattleMenuContainerGameObject.setAlpha(0);
	}

	/** @param {import('../../../common/direction.js').Direction | 'OK' | 'CANCEL' } input */
	handlePlayerInput(input) {
		if (input === 'CANCEL') {
			this.hideMonsterAttackSubMenu();
			this.showMainBattleMenu();
			return;
		} else if (input === 'OK') {
			this.hideMainBattleMenu();
			this.showMonsterAttackSubMenu();
			return;
		}

		if (this.activeBattleMenu === ACTIVE_BATTLE_MENU.BATTLE_MAIN) {
			this.updateSelectedBattleMenuOptionFromInput(input);
			this.moveMainBattleMenuCursor();
		} else if (this.activeBattleMenu === ACTIVE_BATTLE_MENU.ATTACK_SELECT) {
			this.updateSelectedBattleMoveOptionFromInput(input);
			this.moveBattleMoveCursor();
		}
	}

	createMainInfoPane() {
		const padding = 4;
		const rectHeight = 132;
		this.scene.add.rectangle(0 + padding, 0 + padding, this.scene.scale.width - (padding * 2), rectHeight,
			0xede4f3, 1).setOrigin(0).setStrokeStyle(8, 0xe4434a, 1);
	}

	createMainInfoSubPane() {
		const padding = 4;
		const rectWidth = 500;
		const rectHeight = 132;
		return this.scene.add.rectangle(0 + padding, 0 + padding, rectWidth, rectHeight,
			0xede4f3, 1).setOrigin(0).setStrokeStyle(8, 0x905ac2, 1);
	}

	createMainBattleMenu() {
		this.createMainInfoSubPane();
		this.battleTextGameObjectLine1 = this.scene.add.text(20, 40, "what should ", BATTLE_UI_TEXT_STYLE);
		this.battleTextGameObjectLine2 = this.scene.add.text(20, 78, `${CHARACTER_ASSET_KEYS.MAIN_CHARACTER} do next?`, BATTLE_UI_TEXT_STYLE);
		this.mainBattleMenuCursorPhaserImageGameObject = this.scene.add.image(BATTLE_MENU_CURSOR_POS.x, BATTLE_MENU_CURSOR_POS.y, UI_ASSET_KEYS.CURSOR, 0).setOrigin(0.5).setScale(2.0);

		this.mainBattleMenuPhaserContainerGameObject = this.scene.add.container(520, 0, [
			this.scene.add.text(55, 22, BATTLE_MENU_OPTIONS.FIGHT, BATTLE_UI_TEXT_STYLE),
			this.scene.add.text(240, 22, BATTLE_MENU_OPTIONS.ITEM, BATTLE_UI_TEXT_STYLE),
			this.scene.add.text(55, 70, BATTLE_MENU_OPTIONS.PASS, BATTLE_UI_TEXT_STYLE),
			this.scene.add.text(240, 70, BATTLE_MENU_OPTIONS.FLEE, BATTLE_UI_TEXT_STYLE),
			this.mainBattleMenuCursorPhaserImageGameObject,
		]);

		this.hideMainBattleMenu();
	}

	createMonsterAttackSubmenu() {
		this.attackBattleMenuCursorPhaserImageGameObject = this.scene.add.image(42, 38, UI_ASSET_KEYS.CURSOR, 0).setOrigin(0.5).setScale(2);
		this.moveSelectionSubBattleMenuContainerGameObject = this.scene.add.container(520, 0, [
			this.scene.add.text(55, 22, "slash", BATTLE_UI_TEXT_STYLE),
			this.scene.add.text(240, 22, "-", BATTLE_UI_TEXT_STYLE),
			this.scene.add.text(55, 70, "-", BATTLE_UI_TEXT_STYLE),
			this.scene.add.text(240, 70, "-", BATTLE_UI_TEXT_STYLE),
			this.attackBattleMenuCursorPhaserImageGameObject,
		]);
		this.hideMonsterAttackSubMenu();
	}

	/** @param {import('../../../common/direction.js').Direction} direction */
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

	/** @param {import('../../../common/direction.js').Direction} direction */
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
