import Phaser from "../lib/phaser.js";
import { SCENE_KEYS } from "./scene-keys.js";
import { WORLD_ASSET_KEYS } from "../asset-utils/asset-keys.js";
import { Player } from "../world/characters/player.js";

const TILE_SIZE = 64;

/** @type {import("../types/typedef.js").Coordinate} */
const PLAYER_POSITION = Object.freeze({
	x: 1 * TILE_SIZE,
	y: 1 * TILE_SIZE,
});

export class WorldScene extends Phaser.Scene {
	/** 
	* @private
	* @type {Player}
	*/
	_player;

	constructor() {
		super({
			key: SCENE_KEYS.WORLD_SCENE,
		});
	}

	create() {
		this.add.image(0, 0, WORLD_ASSET_KEYS.WORLD_BACKGROUND, 0).setOrigin(0);
		this._player = new Player({
			scene: this,
			position: PLAYER_POSITION
		});
	}
}
