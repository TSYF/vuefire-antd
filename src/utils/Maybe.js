export default class Maybe {
	constructor(val) {
		this.value;
	}
	bind(func) {
		this.value = func(this.value);
		return new Maybe(this.value);
	}
}
