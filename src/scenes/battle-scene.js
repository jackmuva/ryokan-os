import { CHARACTER_ASSET_KEYS, BATTLE_ASSET_KEYS } from '../assets/asset-keys.js';
import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './scene-keys.js';
import { BattleMenu } from '../battle/ui/menu/battle-menu.js';
import { DIRECTION } from '../common/direction.js';
import { Background } from '../battle/background.js';
import { HealthBar } from '../battle/ui/menu/health-bar.js';



export class BattleScene extends Phaser.Scene {
	/** @type {BattleMenu} **/
	battleMenu;

	/** @type {Phaser.Types.Input.Keyboard.CursorKeys} **/
	cursorKeys;

	/** @type {Background} **/
	background;

	constructor() {
		super({
			key: SCENE_KEYS.BATTLE_SCENE,
		});
	}

	create() {
		this.background = new Background(this);
		this.background.showTown();

		const enemy = this.add.image(768, 500, CHARACTER_ASSET_KEYS.BLONDE_ELF, 0);
		enemy.setDisplaySize(Number(this.sys.game.config.width) / 5, Number(this.sys.game.config.height) / 5);
		const main_char = this.add.image(256, 500, CHARACTER_ASSET_KEYS.MAIN_CHARACTER, 0).setFlipX(true);
		main_char.setDisplaySize(Number(this.sys.game.config.width) / 5, Number(this.sys.game.config.height) / 5);

		const main_char_name = this.add.text(30, 20, CHARACTER_ASSET_KEYS.MAIN_CHARACTER, {
			color: '#7E3D3F',
			fontSize: '20px',
		});
		this.add.container(100, 220, [
			this.add.image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND)
				.setOrigin(0)
				.setDisplaySize(Number(this.sys.game.config.width) / 4, Number(this.sys.game.config.height) / 4),
			main_char_name,
			new HealthBar(this, 4, 34).container,
			this.add.text(main_char_name.width + 35, 23, 'L5', {
				color: '#ED474B',
				fontSize: '16px',
			}),
			this.add.text(12, 62, 'HP', {
				color: '#FF6505',
				fontSize: '14px',
				fontStyle: 'italic'
			}),
			this.add.text(240, 82, '25/25', {
				color: '#7E3D3F',
				fontSize: '12px',
			}).setOrigin(1, 0),
		]);

		const enemy_name = this.add.text(30, 20, CHARACTER_ASSET_KEYS.BLONDE_ELF, {
			color: '#7E3D3F',
			fontSize: '20px',
		});
		this.add.container(700, 220, [
			this.add.image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKGROUND)
				.setOrigin(0)
				.setDisplaySize(Number(this.sys.game.config.width) / 4, Number(this.sys.game.config.height) / 4),
			enemy_name,
			new HealthBar(this, 4, 34).container,
			this.add.text(main_char_name.width + 35, 23, 'L5', {
				color: '#ED474B',
				fontSize: '16px',
			}),
			this.add.text(12, 62, 'HP', {
				color: '#FF6505',
				fontSize: '14px',
				fontStyle: 'italic'
			}),
		]);

		this.battleMenu = new BattleMenu(this);
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
			this.battleMenu.updateInfoPaneMessagesAndWaitForInput(['Your monster attacks the enemy'], () => {
				this.battleMenu.showMainBattleMenu()
			});
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

}
