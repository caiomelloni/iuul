const { Cpf } = require("./cpf.js")
const { Nome } = require(
class Leitor {
	constructor() {}
	async lerLinha() {
		const readline = require('readline').createInterface({
			input: process.stdin,
			output: process.stdout
		});

		const it = readline[Symbol.asyncIterator]();
		const linha = (await it.next()).value;
		readline.close();
		return linha;
	}

	// le na sequencia: cpf, nome e data de nascimento
	// se houver erro em uma leitura, retornamos sua response
	// se todas leituras forem bem sucedidas, retornamos o cliente
	async lerPaciente() {
		console.log("cpf:")
		let cpfString = await lerLinha()
		let cpf = new Cpf(cpfString)
		if (cpf.hasError) return cpf

		console.log("nome:")
		let nomeString = await lerLinha()
		let nome = new Nome(nomeString)
		if (nome.hasError) return nome

		console.log("data de nascimento:")

	}
}

module.exports = {
	Leitor	
}
