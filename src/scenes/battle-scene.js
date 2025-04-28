import { CHARACTER_ASSET_KEYS } from '../assets/asset-keys.js';
import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './scene-keys.js';
import { BattleMenu } from '../battle/ui/menu/battle-menu.js';
import { DIRECTION } from '../common/direction.js';
import { Background } from '../battle/background.js';
import { EnemyBattleCharacter } from '../battle/ui/characters/enemy-battle-character.js';
import { MainBattleCharacter } from '../battle/ui/characters/main-battle-character.js';



export class BattleScene extends Phaser.Scene {
	/** @type {BattleMenu} **/
	battleMenu;
	/** @type {Phaser.Types.Input.Keyboard.CursorKeys} **/
	cursorKeys;
	/** @type {Background} **/
	background;
	/** @type {EnemyBattleCharacter} */
	activeEnemy;
	/** @type {MainBattleCharacter} */
	mainCharacter;

	constructor() {
		super({
			key: SCENE_KEYS.BATTLE_SCENE,
		});
	}

	create() {
		this.background = new Background(this);
		this.background.showTown();

		this.activeEnemy = new EnemyBattleCharacter(
			{
				scene: this,
				characterDetails: {
					name: CHARACTER_ASSET_KEYS.BLONDE_ELF,
					assetKey: CHARACTER_ASSET_KEYS.BLONDE_ELF,
					assetFrame: 0,
					currentHp: 25,
					maxHp: 25,
					attackIds: [2],
					baseAttack: 5,
					level: 5
				}
			}
		);
		this.mainCharacter = new MainBattleCharacter(
			{
				scene: this,
				characterDetails: {
					name: CHARACTER_ASSET_KEYS.MAIN_CHARACTER,
					assetKey: CHARACTER_ASSET_KEYS.MAIN_CHARACTER,
					assetFrame: 0,
					currentHp: 25,
					maxHp: 25,
					attackIds: [1],
					baseAttack: 5,
					level: 5
				}
			}
		);

		this.activeEnemy.takeDamage(10, () => {
			this.mainCharacter.takeDamage(5);
		});
		this.battleMenu = new BattleMenu(this, this.mainCharacter);
		this.battleMenu.showMainBattleMenu();

		this.cursorKeys = this.input.keyboard.createCursorKeys();
	}

	update() {
		const wasSpacePressed = Phaser.Input.Keyboard.JustDown(this.cursorKeys.space);
		if (wasSpacePressed) {
			this.battleMenu.handlePlayerInput('OK');
			if (this.battleMenu.selectedAttack === undefined) {
				return;
			}
			console.log('Player selected the following move: ' + this.battleMenu.selectedAttack);
			this.battleMenu.hideMonsterAttackSubMenu();
			this.handleBattleSequence();
			return;
		}

		if (Phaser.Input.Keyboard.JustDown(this.cursorKeys.shift)) {
			this.battleMenu.handlePlayerInput('CANCEL');
			return;
		}

		/** @type {import('../common/direction.js').Direction} */
		let selectedDirection = DIRECTION.NONE;
		if (this.cursorKeys.left.isDown) {
			selectedDirection = DIRECTION.LEFT;
		} else if (this.cursorKeys.right.isDown) {
			selectedDirection = DIRECTION.RIGHT;
		} else if (this.cursorKeys.up.isDown) {
			selectedDirection = DIRECTION.UP;
		} else if (this.cursorKeys.down.isDown) {
			selectedDirection = DIRECTION.DOWN;
		}

		if (selectedDirection !== DIRECTION.NONE) {
			this.battleMenu.handlePlayerInput(selectedDirection);

		}
	}
	handleBattleSequence() {
		this.playerAttack();
	}

	playerAttack() {
		this.battleMenu.updateInfoPaneMessagesAndWaitForInput
	}
}
