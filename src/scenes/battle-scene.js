import { CHARACTER_ASSET_KEYS } from '../assets/asset-keys.js';
import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './scene-keys.js';
import { BattleMenu } from '../battle/ui/menu/battle-menu.js';
import { DIRECTION } from '../common/direction.js';
import { Background } from '../battle/background.js';
import { EnemyBattleCharacter } from '../battle/ui/characters/enemy-battle-character.js';
import { MainBattleCharacter } from '../battle/ui/characters/main-battle-character.js';
import { StateMachine } from '../utils/state-machine.js';



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
	/** @type {number} */
	charAttackIndex;
	/** @type {StateMachine} */
	battleStateMachine;

	constructor() {
		super({
			key: SCENE_KEYS.BATTLE_SCENE,
		});
	}

	init() {
		this.charAttackIndex = -1;
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
					baseAttack: 25,
					level: 5
				}
			}
		);

		this.battleMenu = new BattleMenu(this, this.mainCharacter);
		this.battleMenu.showMainBattleMenu();

		this.battleStateMachine = new StateMachine('bottle', this);
		this.battleStateMachine.addState({
			name: 'INTRO',
			onEnter: () => {
				this.time.delayedCall(1000, () => {
					this.battleStateMachine.setState('BATTLE');
				})
			},
		});
		this.battleStateMachine.addState({
			name: 'BATTLE',
		});
		this.battleStateMachine.setState('INTRO');

		this.cursorKeys = this.input.keyboard.createCursorKeys();
	}

	update() {
		const wasSpacePressed = Phaser.Input.Keyboard.JustDown(this.cursorKeys.space);
		if (wasSpacePressed) {
			this.battleMenu.handlePlayerInput('OK');
			if (this.battleMenu.selectedAttack === undefined) {
				return;
			}

			this.charAttackIndex = this.battleMenu.selectedAttack;
			if (!this.mainCharacter.attacks[this.charAttackIndex]) {
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
		this.battleMenu.updateInfoPaneMessagesAndWaitForInput(
			[`${this.mainCharacter.attacks[this.charAttackIndex].name}`],
			() => {
				this.time.delayedCall(500, () => {
					this.activeEnemy.takeDamage(this.mainCharacter.baseAttack, () => {
						this.enemyAttack();
					});
				})
			}
		);
	}

	enemyAttack() {
		if (this.activeEnemy.isFainted) {
			this.postBattleSequenceCheck();
			return;
		}

		this.battleMenu.updateInfoPaneMessagesAndWaitForInput(
			[`${this.mainCharacter.attacks[0].name}`],
			() => this.time.delayedCall(500, () => {
				this.mainCharacter.takeDamage(this.activeEnemy.baseAttack, () => {
					this.battleMenu.showMainBattleMenu();
				});
			})
		);
	}

	postBattleSequenceCheck() {
		if (this.activeEnemy.isFainted) {
			this.battleMenu.updateInfoPaneMessagesAndWaitForInput(
				[`${this.activeEnemy.name} defeated`, 'You have gained some experience'],
				() => {
					this.transitionToNextScene();
				}
			);
			return;
		} else if (this.mainCharacter.isFainted) {
			this.battleMenu.updateInfoPaneMessagesAndWaitForInput(
				[`${this.mainCharacter.name} fainted`, 'You were defeated, escaping to safety...'],
				() => {
					this.transitionToNextScene();
				}
			);
			return;
		}
		this.battleMenu.showMainBattleMenu();
	}

	transitionToNextScene() {
		this.cameras.main.fadeOut(600, 0, 0, 0);
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
			() => {
				this.scene.start(SCENE_KEYS.BATTLE_SCENE);
			}
		);
	}
}
