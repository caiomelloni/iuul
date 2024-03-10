const { Response } = require("./response.js")

class Nome extends Response {
	#nome
	constructor(nome) {
		if (nome.length < 5) {
			super(true, "nome invalido, deve conter pelo menos 5 caracteres")
		} else {
			super(false, "")
			this.#nome = nome
		}
	}

	get nome() { return this.#nome }
}


function main() {
	let nomes = ["caio", "caio valido"]
	for (let n of nomes) {
		let nome = new Nome(n)
		if (nome.hasError) {
			console.log(n, "-", nome.errorMessage)
		} else {
			console.log(n, "eh valido")
		}
	}
}

if (require.main == module) {
	main()
}

module.exports = {
	Nome	
}
