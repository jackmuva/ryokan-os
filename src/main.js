import { PreloadScene } from './scenes/preload-scene.js';
import { BattleScene } from './scenes/battle-scene.js';
import { SCENE_KEYS } from './scenes/scene-keys.js';
import Phaser from './lib/phaser.js';
import { WorldScene } from './scenes/world-scene.js';

const game = new Phaser.Game({
	type: Phaser.CANVAS,
	pixelArt: false,
	backgroundColor: '#000000',
	scale: {
		width: 1024,
		height: 576,
		parent: "game-container",
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
});

game.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene);
game.scene.add(SCENE_KEYS.WORLD_SCENE, WorldScene);
game.scene.add(SCENE_KEYS.BATTLE_SCENE, BattleScene);
game.scene.start(SCENE_KEYS.PRELOAD_SCENE);
