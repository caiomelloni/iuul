class Paciente {
	#cpf
	#nome
	#dtNascimento
	constructor(cpfObj, nome, dtNascimento) {
		this.#cpf = cpfObj
		this.#nome = nome
		this.#dtNascimento = dtNascimento
	}

	get cpf() { return this.#cpf.copy() }
	get nome() { return this.#nome.copy() }

	log()  {
		console.log("cpf: ", this.#cpf.cpf, "nome: ", this.#nome.nome)
		console.log("idade: ", this.#dtNascimento.idade)
	}
}
		
async function main() {}

if (require.main == module) {
	main()
}

module.exports = {
	Paciente	
}