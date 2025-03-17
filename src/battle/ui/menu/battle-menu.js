import { CHARACTER_ASSET_KEYS } from "../../../assets/asset-keys.js";

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

	/** @param {Phaser.Scene} scene **/
	constructor(scene) {
		this.scene = scene;
		this.createMainInfoPane();
		this.createMainBattleMenu();
		this.createMainBattleMenu();
		this.createMonsterAttackSubmenu();
	}

	showMainBattleMenu() {
		this.mainBattleMenuPhaserContainerGameObject.setAlpha(1);
		this.battleTextGameObjectLine1.setAlpha(1);
		this.battleTextGameObjectLine2.setAlpha(1);
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
		this.battleTextGameObjectLine1 = this.scene.add.text(20, 40, "what should ", battleUiStyle);
		this.battleTextGameObjectLine2 = this.scene.add.text(20, 78, `${CHARACTER_ASSET_KEYS.MAIN_CHARACTER} do next?`, battleUiStyle);
		this.mainBattleMenuPhaserContainerGameObject = this.scene.add.container(520, 0, [
			this.createMainInfoSubPane(),
			this.scene.add.text(55, 22, BATTLE_MENU_OPTIONS.FIGHT, battleUiStyle),
			this.scene.add.text(240, 22, BATTLE_MENU_OPTIONS.ITEM, battleUiStyle),
			this.scene.add.text(55, 70, BATTLE_MENU_OPTIONS.PASS, battleUiStyle),
			this.scene.add.text(240, 70, BATTLE_MENU_OPTIONS.FLEE, battleUiStyle),
		]);

		this.hideMainBattleMenu();
	}

	createMonsterAttackSubmenu() {
		this.moveSelectionSubBattleMenuContainerGameObject = this.scene.add.container(0, 0, [
			this.scene.add.text(55, 22, "slash", battleUiStyle),
			this.scene.add.text(240, 22, "-", battleUiStyle),
			this.scene.add.text(55, 70, "-", battleUiStyle),
			this.scene.add.text(240, 70, "-", battleUiStyle),
		]);
		this.hideMonsterAttackSubMenu();
	}

}
