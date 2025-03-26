
/** @typedef {keyof typeof BATTLE_MENU_OPTIONS} BattleMenuOptions*/
/** @enum {BattleMenuOptions} */
export const BATTLE_MENU_OPTIONS = Object.freeze({
	FIGHT: 'FIGHT',
	PASS: 'PASS',
	ITEM: 'ITEM',
	FLEE: 'FLEE'
});

/** @typedef {keyof typeof BATTLE_MOVE_OPTIONS} BattleMoveOptions*/
/** @enum {BattleMoveOptions} */
export const BATTLE_MOVE_OPTIONS = Object.freeze({
	ATTACK_1: 'ATTACK_1',
	ATTACK_2: 'ATTACK_2',
	ATTACK_3: 'ATTACK_3',
	ATTACK_4: 'ATTACK_4'
});

/** @typedef {keyof typeof ACTIVE_BATTLE_MENU} ActiveBattleMenu*/
/** @enum {ActiveBattleMenu} */
export const ACTIVE_BATTLE_MENU = Object.freeze({
	BATTLE_MAIN: 'BATTLE_MAIN',
	ATTACK_SELECT: 'ATTACK_SELECT',
	ITEM_SELECT: 'ITEM_SELECT',
	PASS: 'PASS',
	FLEE: 'FLEE'
});
