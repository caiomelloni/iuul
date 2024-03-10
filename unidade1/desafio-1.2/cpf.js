const { Response } = require("./response.js")

class Cpf extends Response {

	constructor(cpfString) {
		cpfString = cpfString.replaceAll(".", "").replace("-", "")
		if (isNaN(Number(cpfString))) {
			super(true, "O CPF deve conter apenas numeros")
			return
		}
		if (cpfString.length != 11) {
			super(true, "O CPF deve ter 11 numeros")
			return
		}
		if (Cpf.#allDigitsAreTheSame(cpfString.split(""))) {
			super(true, "O CPF nao pode ter todos os numeros iguais")
			return
		}
		if (!Cpf.#isValid(cpfString)) {
			super(true, "CPF invalido")
			return
		}


		super(false, "")
		this.cpf = cpfString

	}

	equals(cpfObj) {
		return this.cpf === cpfObj.cpf
	}

	static #allDigitsAreTheSame(arr) {
		let s = new Set(arr)
		return (s.size == 1)
	}

	static #isValid(cpf) {
		let j = 0
		for (let i = 2; i < 11; i++) {
			j += Number(cpf[i - 2]) * (12 - i)
		}

		j = j % 11
		if (j === 0 || j === 1) {j = 0}
		else { j = 11 - j }

		if (String(j) !== cpf[9]) { return false }


		let k = 0
		for (let i = 2; i < 12; i++) {
			k += Number(cpf[i - 2]) * (13 - i)
		}
		k = k % 11
		if (k === 0 || k === 1) {k = 0}
		else { k = 11 - k }

		if (String(k) !== cpf[10]) { return false }

		return true

	}


}

function main() {
	let cpfs = ["48440959869", "322.935.110-06", "222.222.222-22", "123.456.432-12", "48449059"]

	for (let c of cpfs) {
		let cpf = new Cpf(c)
		if (cpf.hasError) {
			console.log("cpf invalido: ", c, cpf.errorMessage)
		} else {
			console.log("cpf valido: ", cpf.cpf)
		}
	}
}




if (require.main == module) {
	main()
}

module.exports = {
	Cpf
}
