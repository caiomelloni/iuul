class Response {
	#hasError
	#errorMessage
	constructor(hasError, errorMessage) {
		this.#hasError = hasError
		this.#errorMessage = errorMessage
	}

	static noError() { return new Response(false, "") }

	get hasError() { return this.#hasError }

	get errorMessage() { return this.#errorMessage }

}

module.exports = {
	Response
}
