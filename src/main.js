import { PreloadScene } from './scenes/preload-scene.js';
import { SCENE_KEYS } from './scenes/scene-keys.js';
import Phaser from './lib/phaser.js';

console.log("main");
const game = new Phaser.Game({
	parent: "game-container",
	//scene: [PreloadScene]
});

game.scene.add(SCENE_KEYS.PRELOAD_SCENE, PreloadScene)
game.scene.start(SCENE_KEYS.PRELOAD_SCENE, PreloadScene)
