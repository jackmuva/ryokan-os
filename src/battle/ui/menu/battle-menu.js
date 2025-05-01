import { CHARACTER_ASSET_KEYS, UI_ASSET_KEYS } from "../../../assets/asset-keys.js";
import { exhaustiveGuard } from "../../../utils/guard.js";
import { BATTLE_MENU_OPTIONS, ACTIVE_BATTLE_MENU } from "./battle-menu-options.js";
import { BATTLE_UI_TEXT_STYLE } from "./battle-menu-config.js";
import { AttackMenu } from "./submenus/attack-menu.js";
import { DIRECTION } from "../../../common/direction.js";
import { BattleCharacter } from "../characters/battle-character.js";

const BATTLE_MENU_CURSOR_POS = Object.freeze({
	x: 45,
	y: 36
});


export class BattleMenu {
	/** @type {Phaser.Scene} **/
	scene;
	/** @type {Phaser.GameObjects.Container} **/
	mainMenu;
	/** @type {Phaser.GameObjects.Text} **/
	menuTextLine1;
	/** @type {Phaser.GameObjects.Text} **/
	menuTextLine2;
	/** @type {Phaser.GameObjects.Image} **/
	cursorImage;
	/** @type {import("./battle-menu-options.js").BattleMenuOptions} */
	selectedMenuOption;
	/** @type {Array<string>} */
	queuedInfoPanelMessages;
	/** @type {() => void | Phaser.Time.TimerEvent | undefined} */
	queuedInfoPanelCallback;
	/** @type{boolean} */
	waitingForPlayerInput;
	/** @type {import("./submenus/attack-menu.js").AttackMenu} */
	attackSubMenu;
	/** @type {import("./battle-menu-options.js").ACTIVE_BATTLE_MENU} */
	activeBattleMenu;
	/** @type {BattleCharacter} */
	activeCharacter;


	/** 
	 * @param {Phaser.Scene} scene 
	 * @param {BattleCharacter} activeCharacter 
	*/
	constructor(scene, activeCharacter) {
		this.scene = scene;
		this.activeCharacter = activeCharacter;
		this.activeBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_MAIN;
		this.selectedMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
		this.queuedInfoPanelCallback = undefined;
		this.queuedInfoPanelMessages = [];
		this.waitingForPlayerInput = false;
		this.createMainInfoPane();
		this.createMainBattleMenu();
		this.attackSubMenu = new AttackMenu(scene, activeCharacter);
	}

	/** @types {number | undefined} */
	get selectedAttack() {
		if (this.activeBattleMenu === ACTIVE_BATTLE_MENU.ATTACK_SELECT) {
			return this.attackSubMenu.selectedMoveIndex;
		}
		return undefined;
	}
	showMainBattleMenu() {
		this.activeBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_MAIN;
		this.mainMenu.setAlpha(1);
		this.menuTextLine1.setAlpha(1);
		this.menuTextLine2.setAlpha(1);

		this.selectedMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
		this.cursorImage.setPosition(BATTLE_MENU_CURSOR_POS.x, BATTLE_MENU_CURSOR_POS.y);
	}

	hideMainBattleMenu() {
		this.mainMenu.setAlpha(0);
		this.menuTextLine1.setAlpha(0);
		this.menuTextLine2.setAlpha(0);
	}

	showMonsterAttackSubMenu() {
		this.activeBattleMenu = ACTIVE_BATTLE_MENU.ATTACK_SELECT;
		this.attackSubMenu.showSubMenu();
	}


	hideMonsterAttackSubMenu() {
		this.activeBattleMenu = ACTIVE_BATTLE_MENU.BATTLE_MAIN;
		this.attackSubMenu.hideSubMenu();
	}

	/** @param {import('../../../common/direction.js').Direction | 'OK' | 'CANCEL' } input */
	handlePlayerInput(input) {
		if (this.waitingForPlayerInput && (input === 'CANCEL' || input === "OK")) {
			this.updateInfoPaneWithMessage();
			return;
		}

		if (input === 'CANCEL') {
			this.switchToMainBattleMenu();
			return;
		} else if (input === 'OK') {
			if (this.activeBattleMenu === ACTIVE_BATTLE_MENU.BATTLE_MAIN) {
				this.handlePlayerChooseMainBattleOption();
			} else if (this.activeBattleMenu === ACTIVE_BATTLE_MENU.ATTACK_SELECT) {
				this.attackSubMenu.handlePlayerChooseAttack();
			}
			return;
		}

		if (this.activeBattleMenu === ACTIVE_BATTLE_MENU.BATTLE_MAIN) {
			this.updateSelectedBattleMenuOptionFromInput(input);
			this.moveMainBattleMenuCursor();
		} else if (this.activeBattleMenu === ACTIVE_BATTLE_MENU.ATTACK_SELECT) {
			this.attackSubMenu.updateMoveFromInput(input);
			this.attackSubMenu.moveBattleMoveCursor();
		}
	}

	/** @param {import("../../../common/direction.js").DIRECTION} direction */
	updateSelectedBattleMenuOptionFromInput(direction) {
		if (this.selectedMenuOption === BATTLE_MENU_OPTIONS.FIGHT) {
			switch (direction) {
				case DIRECTION.RIGHT:
					this.selectedMenuOption = BATTLE_MENU_OPTIONS.ITEM;
					return;
				case DIRECTION.DOWN:
					this.selectedMenuOption = BATTLE_MENU_OPTIONS.PASS;
					return;
				case DIRECTION.LEFT:
				case DIRECTION.UP:
				case DIRECTION.NONE:
					return;
				default:
					exhaustiveGuard(direction);
			}
			return;
		} else if (this.selectedMenuOption === BATTLE_MENU_OPTIONS.ITEM) {
			switch (direction) {
				case DIRECTION.LEFT:
					this.selectedMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
					return;
				case DIRECTION.DOWN:
					this.selectedMenuOption = BATTLE_MENU_OPTIONS.FLEE;
					return;
				case DIRECTION.RIGHT:
				case DIRECTION.UP:
				case DIRECTION.NONE:
					return;
				default:
					exhaustiveGuard(direction);
			}
			return;
		} else if (this.selectedMenuOption === BATTLE_MENU_OPTIONS.PASS) {
			switch (direction) {
				case DIRECTION.RIGHT:
					this.selectedMenuOption = BATTLE_MENU_OPTIONS.FLEE;
					return;
				case DIRECTION.UP:
					this.selectedMenuOption = BATTLE_MENU_OPTIONS.FIGHT;
					return;
				case DIRECTION.LEFT:
				case DIRECTION.DOWN:
				case DIRECTION.NONE:
					return;
				default:
					exhaustiveGuard(direction);
			}
			return;
		} else if (this.selectedMenuOption === BATTLE_MENU_OPTIONS.FLEE) {
			switch (direction) {
				case DIRECTION.LEFT:
					this.selectedMenuOption = BATTLE_MENU_OPTIONS.PASS;
					return;
				case DIRECTION.UP:
					this.selectedMenuOption = BATTLE_MENU_OPTIONS.ITEM;
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
		exhaustiveGuard(this.selectedMenuOption);
	}

	/** 
	* @param {Array<string>} messages 
	* @param {() => void | Phaser.Time.TimerEvent} [callback] 
	*/
	updateInfoPaneMessagesAndWaitForInput(messages, callback) {
		this.queuedInfoPanelMessages = messages;
		this.queuedInfoPanelCallback = callback;

		this.updateInfoPaneWithMessage();
	}

	updateInfoPaneWithMessage() {
		this.waitingForPlayerInput = false;
		this.menuTextLine1.setText('').setAlpha(1);

		if (this.queuedInfoPanelMessages.length === 0) {
			if (this.queuedInfoPanelCallback) {
				this.queuedInfoPanelCallback();
				this.queuedInfoPanelCallback = undefined;
				return;
			}
		}
		const messageToDisplay = this.queuedInfoPanelMessages.shift();
		this.menuTextLine1.setText(messageToDisplay);
		this.waitingForPlayerInput = true;
	}

	handlePlayerChooseMainBattleOption() {
		this.hideMainBattleMenu();
		if (this.selectedMenuOption === BATTLE_MENU_OPTIONS.FIGHT) {
			this.activeBattleMenu = ACTIVE_BATTLE_MENU.ATTACK_SELECT;
			this.showMonsterAttackSubMenu();
			return;
		} else if (this.selectedMenuOption === BATTLE_MENU_OPTIONS.ITEM) {
			this.activeBattleMenu = ACTIVE_BATTLE_MENU.ITEM_SELECT;
			this.updateInfoPaneMessagesAndWaitForInput(['Your bag is empty'], () => {
				this.switchToMainBattleMenu();
			});
			return;
		} else if (this.selectedMenuOption === BATTLE_MENU_OPTIONS.FLEE) {
			this.activeBattleMenu = ACTIVE_BATTLE_MENU.FLEE;
			this.updateInfoPaneMessagesAndWaitForInput(['You fail to flee'], () => {
				this.switchToMainBattleMenu();
			});
			return;
		} else if (this.selectedMenuOption === BATTLE_MENU_OPTIONS.PASS) {
			this.activeBattleMenu = ACTIVE_BATTLE_MENU.PASS;
			this.updateInfoPaneMessagesAndWaitForInput(['Turn passed'], () => {
				this.switchToMainBattleMenu();
			});
			return;
		}

		exhaustiveGuard(this.selectedMenuOption);
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
		this.menuTextLine1 = this.scene.add.text(20, 40, "what should ", BATTLE_UI_TEXT_STYLE);
		this.menuTextLine2 = this.scene.add.text(20, 78, `${this.activeCharacter.name} do next?`, BATTLE_UI_TEXT_STYLE);
		this.cursorImage = this.scene.add.image(BATTLE_MENU_CURSOR_POS.x, BATTLE_MENU_CURSOR_POS.y, UI_ASSET_KEYS.CURSOR, 0).setOrigin(0.5).setScale(2.0);

		this.mainMenu = this.scene.add.container(520, 0, [
			this.scene.add.text(55, 22, BATTLE_MENU_OPTIONS.FIGHT, BATTLE_UI_TEXT_STYLE),
			this.scene.add.text(240, 22, BATTLE_MENU_OPTIONS.ITEM, BATTLE_UI_TEXT_STYLE),
			this.scene.add.text(55, 70, BATTLE_MENU_OPTIONS.PASS, BATTLE_UI_TEXT_STYLE),
			this.scene.add.text(240, 70, BATTLE_MENU_OPTIONS.FLEE, BATTLE_UI_TEXT_STYLE),
			this.cursorImage,
		]);

		this.hideMainBattleMenu();
	}


	moveMainBattleMenuCursor() {
		if (this.activeBattleMenu !== ACTIVE_BATTLE_MENU.BATTLE_MAIN) {
			return;
		}
		switch (this.selectedMenuOption) {
			case BATTLE_MENU_OPTIONS.FIGHT:
				this.cursorImage.setPosition(BATTLE_MENU_CURSOR_POS.x, BATTLE_MENU_CURSOR_POS.y);
				return;
			case BATTLE_MENU_OPTIONS.ITEM:
				this.cursorImage.setPosition(228, BATTLE_MENU_CURSOR_POS.y);
				return;
			case BATTLE_MENU_OPTIONS.PASS:
				this.cursorImage.setPosition(BATTLE_MENU_CURSOR_POS.x, 86);
				return;
			case BATTLE_MENU_OPTIONS.FLEE:
				this.cursorImage.setPosition(228, 86);
				return;
			default:
				exhaustiveGuard(this.selectedMenuOption);
		}
	}


	switchToMainBattleMenu() {
		this.hideMonsterAttackSubMenu();
		this.showMainBattleMenu();
	}
}
