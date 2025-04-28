import Phaser from "../lib/phaser.js";

/**
 * @typedef BattleCharacterConfig
 * @type {Object}
 * @property {Phaser.Scene} scene
 * @property {Character} characterDetails
*/

/**
 * @typedef Character 
 * @type {Object}
 * @property {string} name 
 * @property {boolean} [flipImage]
 * @property {string} assetKey 
 * @property {number} [assetFrame=0] 
 * @property {number} maxHp 
 * @property {number} currentHp 
 * @property {number} baseAttack 
 * @property {number[]} attackIds 
 * @property {number} level
*/

/** 
 * @typedef Coordinate
 * @type {Object}
 * @property {number} x
 * @property {number} y
*/

/** 
 * @typedef Attack
 * @type {Object}
 * @property {number} id
 * @property {string} name
 * @property {string} animationName
*/
