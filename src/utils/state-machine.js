/**
 * @typedef State
 * @type {Object}
 * @property {string} name
 * @property {() => void} [onEnter] 
 */

export class StateMachine {
	/** @type { Map<string, State> } */
	states;
	/** @type { State } */
	currentState;
	/** @type { boolean } */
	isChangingState;
	/** @type { Array<string> } */
	stateQueue;
	/** @type {string} */
	id;
	/** @type {Object | undefined} */
	context;

	/**
	* @param {string} id
	* @param {Object} [context]
	*/
	constructor(id, context) {
		this.id = id;
		this.context = context;
		this.isChangingState = false;
		this.stateQueue = [];
		this.states = new Map();
		this.currentState = undefined;
	}

	/** @type {string | undefined} */
	get currentStateName() {
		return this.currentState?.name;
	}

	update() {
		if (this.stateQueue.length > 0) {
			this.setState(this.stateQueue.shift());
		}
	}

	/**
	 * @param {string} stateName
	 */
	setState(stateName) {
		const methodName = 'setState';
		if (!this.states.has(stateName)) {
			console.warn(`[${StateMachine.name}-${this.id}:${methodName}] tried to change to unknown state`);
			return;
		}
		if (this.isCurrentState(stateName)) {
			return;
		}
		if (this.isChangingState) {
			this.stateQueue.push(stateName);
			return;
		}
		this.isChangingState = true;
		console.warn(`[${StateMachine.name}-${this.id}:${methodName}] change from ${this.currentState?.name ?? 'none'} to ${stateName}`);
		this.currentState = this.states.get(stateName);

		if (this.currentState.onEnter) {
			console.warn(`[${StateMachine.name}-${this.id}: ${this.currentState?.name ?? 'none'} on enter invoked`);
			this.currentState.onEnter();
		}

		this.isChangingState = false;
	}

	/**
	 * @param {State} state 
	 */
	addState(state) {
		this.states.set(state.name, {
			name: state.name,
			onEnter: this.context ? state.onEnter?.bind(this.context) : state.onEnter,
		});
	}

	/**
	* @param {string} stateName
	* @returns {boolean}
	*/
	isCurrentState(stateName) {
		if (!this.currentState) {
			return false;
		}
		return this.currentState.name === stateName;
	}
}
