const readline = require('readline').createInterface({
	input: process.stdin,
	output: process.stdout
});

async function lerLinha() {
	readline.resume()
	const it = readline[Symbol.asyncIterator]();
	const linha = (await it.next()).value;
	readline.pause();
	return linha;
}

async function lerCliente() {
	console.log("Digite o nome, cpf, data de nascimento, renda mensal, estado civil e o numero de dependentes do cliente. Separados por espaco")

	let cliente = await lerLinha()

	return cliente.replace(/\s+/g, ' ').split(" ")

}

class Cliente {

	static erros = {
		nome: "NOME",
		cpf: "CPF",
		dtNascimento: "DATANASCIMENTO",
		renda: "RENDA",
		estadoCivil: "ESTADOCIVIL",
		dependentes: "DEPENDENTES"
	}

	constructor(nome, cpf, nascimento, renda, estadoCivil, dependentes) {
		this.nome = nome
		this.cpf = cpf
		this.nascimento = nascimento
		this.renda = renda
		this.estadoCivil = estadoCivil
		this.dependentes = dependentes
	}

	static #validarNome(nome) {
		let nomeString = String(nome)
		if (nomeString.length < 5) throw Cliente.erros.nome
		return nomeString
	}

	static #validarCpf(cpf) {
		let cpfNumber = Number(cpf)
		if (cpfNumber == NaN || String(cpfNumber).length != 11) throw Cliente.erros.cpf
		return cpfNumber
	}

	static #validarNascimento(nascimento) {
		let [diaString, mesString, anoString] = nascimento.split("/")
		let date = new Date(mesString + "/" + diaString + "/" + anoString)
		if (isNaN(date)) throw Cliente.erros.dtNascimento
		return date
	}

	static #validarRenda(renda) {
		let rendaString = renda.replace(",", ".")
		let renda = Number(Number(rendaString).toFixed(2))
		if (renda == NaN) throw Cliente.erros.renda
	}

	static #validarEstadoCivil(estadoCivil) {

	}

}

async function main() {
	console.log("qual o numero de clientes?")
	const qtdClientes = Number(await lerLinha())
	console.log(qtdClientes)
	while (!Number.isInteger(qtdClientes) || qtdClientes < 0) {
		console.log("digite um numbero inteiro de clientes!")
		const qtdClientes = Number(await lerLinha())
	}

	let clientes = []
	for (let i = 0; i < qtdClientes; i++) {
		let cliente = await lerCliente()
		clientes.push(cliente)
	}

	console.log(clientes)

}

if (require.main == module) {
	main()
}
