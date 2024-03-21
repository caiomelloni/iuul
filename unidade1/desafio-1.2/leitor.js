const { Cpf } = require("./cpf.js")
const { Nome } = require("./nome.js")
const { DtNascimento } = require("./dtnascimento")
const { Paciente } = require("./paciente")
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

	// le um numero de opcao para o menu
	async lerInputMenu() {
		let input = await this.lerLinha()
		input = Number(input)
		return input
	}

	// le na sequencia: cpf, nome e data de nascimento
	// se houver erro em uma leitura, retornamos sua response
	// se todas leituras forem bem sucedidas, retornamos o cliente
	async lerPaciente() {
		process.stdout.write("CPF: ");
		let cpfString = await this.lerLinha()
		let cpf = new Cpf(cpfString)
		if (cpf.hasError) return cpf

		process.stdout.write("Nome: ");
		let nomeString = await this.lerLinha()
		let nome = new Nome(nomeString)
		if (nome.hasError) return nome

		process.stdout.write("Data de nascimento: ");
		let nascimentoString = await this.lerLinha()
		let dtNascimento = new DtNascimento(nascimentoString)
		if (dtNascimento.hasError) return dtNascimento

		return new Paciente(cpf, nome, dtNascimento)
	}
}

async function main() {

}

if (require.main == module) {
	main()
}

module.exports = {
	Leitor	
}

