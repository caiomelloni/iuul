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
}
		
