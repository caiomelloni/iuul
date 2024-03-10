const { Response } = require("./response.js")

class DtNascimento extends Response {
	#data

	// data de nascimento fornecida no formato DD/MM/AAAA
	constructor(nascimentoString) {
		let date = DtNascimento.#getDate(nascimentoString)
		if (isNaN(date)) {
			super(true, "data invalida")
			return
		}
		
		let idade = DtNascimento.#getAge(date)

		if (idade < 13) {
			super(true, "idade invalida, menor que 13 anos")
			return
		}
		
		super(false, "")
		this.#data = date

	}
	
	static #getDate(date) {
		let [diaString, mesString, anoString] = date.split("/")
		let dateObj = new Date(mesString + "/" + diaString + "/" + anoString)
		return dateObj
	}

	static #getAge(date) {
		let today = new Date()

		let age =  today.getFullYear() - date.getFullYear()

		let currentMonth = today.getMonth()
		let birthMonth = date.getMonth()
		let currentDay = today.getDate()
		let birthDay = date.getDate()

		if ((birthMonth > currentMonth) || (birthMonth === currentMonth &&  birthDay < currentDay)) { age -= 1 }

		return age

	}

	get data() { return this.#data }
	get idade() { return DtNascimento.#getAge(this.#data) }
}

function main() {
	let nascimentos = ["17/04/2000","17/04/2010","17/04/2014", "04/17/2000", "2000/04/17", "17042000"]

	for (let i of nascimentos) {
		let dt = new DtNascimento(i)
		if (dt.hasError) {
			console.log(i, "eh invalido", dt.errorMessage)
		} else {
			console.log(i, "eh valido")
		}
	}
}


if (require.main == module) {
	main()
}

module.exports = {
	DtNascimento	
}
