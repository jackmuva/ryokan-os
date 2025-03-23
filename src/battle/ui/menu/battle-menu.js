import { CHARACTER_ASSET_KEYS, UI_ASSET_KEYS } from "../../../assets/asset-keys.js";
import { DIRECTION } from "../../../common/direction.js";
import { exhaustiveGuard } from "../../../utils/guard.js";

/** @typedef {keyof typeof BATTLE_MENU_OPTIONS} BattleMenuOptions*/
/** @enum {BattleMenuOptions} */
const BATTLE_MENU_OPTIONS = Object.freeze({
	FIGHT: 'FIGHT',
	PASS: 'PASS',
	ITEM: 'ITEM',
	FLEE: 'FLEE'
});

const battleUiStyle = {
	color: 'black',
	fontSize: '30px'
}

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
	/** @type {BattleMenuOptions} */
	selectedBattleMenuOption;
	/** @type {Phaser.GameObjects.Image} **/
	attackBattleMenuCursorPhaserImageGameObject;

	/** @param {Phaser.Scene} scene **/
	constructor(scene) {
		this.scene = scene;
		this.selectedBattleMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
		this.createMainInfoPane();
		this.createMainBattleMenu();
		this.createMonsterAttackSubmenu();
	}

	showMainBattleMenu() {
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
		this.moveSelectionSubBattleMenuContainerGameObject.setAlpha(1);
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

		this.updateSelectedBattleMenuOptionFromInput(input);
		this.moveMainBattleMenuCursor();
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
		this.battleTextGameObjectLine1 = this.scene.add.text(20, 40, "what should ", battleUiStyle);
		this.battleTextGameObjectLine2 = this.scene.add.text(20, 78, `${CHARACTER_ASSET_KEYS.MAIN_CHARACTER} do next?`, battleUiStyle);
		this.mainBattleMenuCursorPhaserImageGameObject = this.scene.add.image(BATTLE_MENU_CURSOR_POS.x, BATTLE_MENU_CURSOR_POS.y, UI_ASSET_KEYS.CURSOR, 0).setOrigin(0.5).setScale(2.0);

		this.mainBattleMenuPhaserContainerGameObject = this.scene.add.container(520, 0, [
			this.scene.add.text(55, 22, BATTLE_MENU_OPTIONS.FIGHT, battleUiStyle),
			this.scene.add.text(240, 22, BATTLE_MENU_OPTIONS.ITEM, battleUiStyle),
			this.scene.add.text(55, 70, BATTLE_MENU_OPTIONS.PASS, battleUiStyle),
			this.scene.add.text(240, 70, BATTLE_MENU_OPTIONS.FLEE, battleUiStyle),
			this.mainBattleMenuCursorPhaserImageGameObject,
		]);

		this.hideMainBattleMenu();
	}

	createMonsterAttackSubmenu() {
		this.attackBattleMenuCursorPhaserImageGameObject = this.scene.add.image(42, 38, UI_ASSET_KEYS.CURSOR, 0).setOrigin(0.5).setScale(2);
		this.moveSelectionSubBattleMenuContainerGameObject = this.scene.add.container(0, 0, [
			this.scene.add.text(55, 22, "slash", battleUiStyle),
			this.scene.add.text(240, 22, "-", battleUiStyle),
			this.scene.add.text(55, 70, "-", battleUiStyle),
			this.scene.add.text(240, 70, "-", battleUiStyle),
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
}
