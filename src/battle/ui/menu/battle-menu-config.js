import { FONT_NAME } from '../../../asset-utils/font-keys.js';
import Phaser from '../../../lib/phaser.js'

/** @type {Phaser.Types.GameObjects.Text.TextStyle} */
export const BATTLE_UI_TEXT_STYLE = Object.freeze({
	color: 'black',
	fontFamily: FONT_NAME,
	fontSize: '30px'
});
