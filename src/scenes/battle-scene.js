import { CHARACTER_ASSET_KEYS } from '../assets/asset-keys.js';
import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './scene-keys.js';
import { BattleMenu } from '../battle/ui/menu/battle-menu.js';
import { DIRECTION } from '../common/direction.js';
import { Background } from '../battle/background.js';
import { EnemyBattleCharacter } from '../battle/ui/characters/enemy-battle-character.js';
import { MainBattleCharacter } from '../battle/ui/characters/main-battle-character.js';
import { StateMachine } from '../utils/state-machine.js';
import { SKIP_ANIMATIONS } from '../config.js';
import { ATTACK_TARGET, AttackManager } from '../battle/attacks/attack-manager.js';
import { createSceneTransition } from '../utils/scene-transition.js';

const BATTLE_STATES = Object.freeze({
	INTRO: 'INTRO',
	PRE_BATTLE_INFO: 'PRE_BATTLE_INFO',
	BRING_OUT_CHAR: 'BRING_OUT_CHAR',
	PLAYER_INPUT: 'PLAYER_INPUT',
	ENEMY_INPUT: 'ENEMY_INPUT',
	BATTLE: 'BATTLE',
	POST_ATTACK_CHECK: 'POST_ATTACK_CHECK',
	FINISHED: 'FINISHED',
	FLEE_ATTEMPT: 'FLEE_ATTEMPT',
});

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
	/** @type {AttackManager} */
	_attackManager;

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
					attackIds: [1],
					baseAttack: 5,
					level: 5
				},
				skipAnimations: SKIP_ANIMATIONS
			},
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
					attackIds: [0],
					baseAttack: 15,
					level: 5
				},
				skipAnimations: SKIP_ANIMATIONS
			}
		);

		this.battleMenu = new BattleMenu(this, this.mainCharacter);
		this.createBattleStateMachine();
		this._attackManager = new AttackManager(this, SKIP_ANIMATIONS);
		this.cursorKeys = this.input.keyboard.createCursorKeys();
	}

	update() {
		this.battleStateMachine.update();

		const wasSpacePressed = Phaser.Input.Keyboard.JustDown(this.cursorKeys.space);

		if (wasSpacePressed && ([BATTLE_STATES.PRE_BATTLE_INFO.toString(), BATTLE_STATES.POST_ATTACK_CHECK.toString(), BATTLE_STATES.FLEE_ATTEMPT.toString(), BATTLE_STATES.FINISHED.toString()].indexOf(this.battleStateMachine.currentStateName) !== -1)) {
			this.battleMenu.handlePlayerInput('OK');
			return;
		}
		if (this.battleStateMachine.currentStateName !== BATTLE_STATES.PLAYER_INPUT) {
			return;
		}
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
			this.battleStateMachine.setState(BATTLE_STATES.ENEMY_INPUT);
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

	playerAttack() {
		this.battleMenu.updateInfoPaneMessageNoInput(
			`${this.mainCharacter.name} used ${this.mainCharacter.attacks[this.charAttackIndex].name}`,
			() => {
				this.time.delayedCall(500, () => {
					this._attackManager.playAttackAnimation(this.mainCharacter.attacks[this.charAttackIndex].animationName, ATTACK_TARGET.ENEMY, () => {
						this.activeEnemy.playDamageAnimation(() => {
							this.activeEnemy.takeDamage(this.mainCharacter.baseAttack, () => {
								this.enemyAttack();
							});
						});

					});
				})
			},
			SKIP_ANIMATIONS
		);
	}

	enemyAttack() {
		if (this.activeEnemy.isFainted) {
			this.battleStateMachine.setState(BATTLE_STATES.POST_ATTACK_CHECK);
			return;
		}

		this.battleMenu.updateInfoPaneMessageNoInput(
			`${this.activeEnemy.name} used ${this.mainCharacter.attacks[0].name}`,
			() => {
				this.time.delayedCall(500, () => {
					this._attackManager.playAttackAnimation(this.activeEnemy.attacks[0].animationName, ATTACK_TARGET.PLAYER, () => {
						this.mainCharacter.playDamageAnimation(() => {
							this.mainCharacter.takeDamage(this.activeEnemy.baseAttack, () => {
								this.battleStateMachine.setState(BATTLE_STATES.POST_ATTACK_CHECK);
							});
						});
					});
				})
			},
			SKIP_ANIMATIONS
		);
	}

	postBattleSequenceCheck() {
		if (this.activeEnemy.isFainted) {
			this.activeEnemy.playDefeatAnimation(() => {
				this.battleMenu.updateInfoPaneMessagesAndWaitForInput(
					[`${this.activeEnemy.name} defeated`, 'You have gained some experience'],
					() => {
						this.battleStateMachine.setState(BATTLE_STATES.FINISHED);
					},
					SKIP_ANIMATIONS
				);
			});
			return;
		} else if (this.mainCharacter.isFainted) {
			this.mainCharacter.playDefeatAnimation(() => {
				this.battleMenu.updateInfoPaneMessagesAndWaitForInput(
					[`${this.mainCharacter.name} fainted`, 'You were defeated, escaping to safety...'],
					() => {
						this.battleStateMachine.setState(BATTLE_STATES.FINISHED);
					},
					SKIP_ANIMATIONS
				);
			});
			return;
		}
		this.battleStateMachine.setState(BATTLE_STATES.PLAYER_INPUT);
	}

	transitionToNextScene() {
		this.cameras.main.fadeOut(600, 0, 0, 0);
		this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
			() => {
				this.scene.start(SCENE_KEYS.BATTLE_SCENE);
			}
		);
	}

	createBattleStateMachine() {
		this.battleStateMachine = new StateMachine('battle', this);

		this.battleStateMachine.addState({
			name: BATTLE_STATES.INTRO,
			onEnter: () => {
				createSceneTransition(this, {
					callback: () => {
						this.battleStateMachine.setState(BATTLE_STATES.PRE_BATTLE_INFO);
					},
					skipSceneTransition: SKIP_ANIMATIONS,
				});
			}
		});
		this.battleStateMachine.addState({
			name: BATTLE_STATES.PRE_BATTLE_INFO,
			onEnter: () => {
				this.activeEnemy.playEntranceAnimation(() => undefined);
				this.activeEnemy.playHealthbarEntranceAnimation(() => {
					this.battleMenu.updateInfoPaneMessageNoInput(`${this.activeEnemy.name} is ready`, () => {
						this.battleStateMachine.setState(BATTLE_STATES.BRING_OUT_CHAR);
					},
						SKIP_ANIMATIONS
					);
				});
			}
		});
		this.battleStateMachine.addState({
			name: BATTLE_STATES.BRING_OUT_CHAR,
			onEnter: () => {
				this.mainCharacter.playEntranceAnimation(() => undefined);
				this.mainCharacter.playHealthbarEntranceAnimation(() => {
					this.battleMenu.updateInfoPaneMessageNoInput(`go ${this.mainCharacter.name}`, () => {
						this.battleStateMachine.setState(BATTLE_STATES.PLAYER_INPUT);
					},
						SKIP_ANIMATIONS
					);
				})
			}
		});
		this.battleStateMachine.addState({
			name: BATTLE_STATES.PLAYER_INPUT,
			onEnter: () => {
				this.battleMenu.showMainBattleMenu();
			}
		});
		this.battleStateMachine.addState({
			name: BATTLE_STATES.ENEMY_INPUT,
			onEnter: () => {
				//TODO: ai to pick a move
				this.battleStateMachine.setState(BATTLE_STATES.BATTLE);
			}
		});
		this.battleStateMachine.addState({
			name: BATTLE_STATES.BATTLE,
			onEnter: () => {
				this.playerAttack();
			}
		});
		this.battleStateMachine.addState({
			name: BATTLE_STATES.POST_ATTACK_CHECK,
			onEnter: () => {
				this.postBattleSequenceCheck();
			}
		});

		this.battleStateMachine.addState({
			name: BATTLE_STATES.FINISHED,
			onEnter: () => {
				this.transitionToNextScene();
			}
		});
		this.battleStateMachine.addState({
			name: BATTLE_STATES.FLEE_ATTEMPT,
			onEnter: () => {
				this.battleMenu.updateInfoPaneMessagesAndWaitForInput(['got away safely'], () => {
					this.battleStateMachine.setState(BATTLE_STATES.FINISHED);
				}, SKIP_ANIMATIONS);
			}
		});

		this.battleStateMachine.setState('INTRO');


	}
}
