import { BATTLE_BACKGROUND_ASSET_KEYS, CHARACTER_ASSET_KEYS, BATTLE_ASSET_KEYS, HEALTH_BAR_ASSET_KEYS } from '../assets/asset-keys.js';
import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from './scene-keys.js';
import { BattleMenu } from '../battle/ui/menu/battle-menu.js';



export class BattleScene extends Phaser.Scene {
	battleMenu;
	constructor() {
		super({
			key: SCENE_KEYS.BATTLE_SCENE,
		});
	}

	create() {
		const battle_scene = this.add.image(0, 0, BATTLE_BACKGROUND_ASSET_KEYS.TOWN).setOrigin(0, 0);
		battle_scene.setDisplaySize(Number(this.sys.game.config.width), Number(this.sys.game.config.height));

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
			this.createHealth(4, 34),
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
			this.createHealth(4, 34),
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
	}

	createHealth(x, y) {
		const middle = this.add.image(x, y, HEALTH_BAR_ASSET_KEYS.MIDDLE).setOrigin(0, 0.5).setScale(1, 0.5);
		middle.displayWidth = 260;
		return this.add.container(x, y, [middle]);
	}
}
