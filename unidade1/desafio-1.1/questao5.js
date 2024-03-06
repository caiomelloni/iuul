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
	clienteArray = []
	
	console.log("Digite o nome, cpf, data de nascimento, renda mensal, estado civil e o numero de dependentes do cliente. Separados por espaco")

	while (true) {

		let cliente = await lerLinha()
		clienteArray =  cliente.replace(/\s+/g, ' ').split(" ")

		if (clienteArray.length !== 6) {
			console.log("Digite os 6 campos obrigatorios!")
		} else { break }
	}

	return clienteArray

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
		this.nome = Cliente.#validarNome(nome)
		this.cpf = Cliente.#validarCpf(cpf)
		this.nascimento = Cliente.#validarNascimento(nascimento)
		this.renda = Cliente.#validarRenda(renda)
		this.estadoCivil = Cliente.#validarEstadoCivil(estadoCivil)
		this.dependentes = Cliente.#validarDependentes(dependentes)
	}

	static #validarNome(nome) {
		let nomeString = String(nome)
		if (nomeString.length < 5) throw Cliente.erros.nome
		return nomeString
	}

	static #validarCpf(cpf) {
		let cpfNumber = Number(cpf)
		if (cpfNumber == NaN || cpf.length != 11) throw Cliente.erros.cpf
		let cpfString = cpf
		return cpfString.substring(0,3) + "." + cpfString.substring(3,6) + "." +cpfString.substring(6,9) + "-" + cpfString.substring(9) 
	}

	static #validarNascimento(nascimento) {
		let [diaString, mesString, anoString] = nascimento.split("/")
		let date = new Date(mesString + "/" + diaString + "/" + anoString)
		let idade = (new Date().getFullYear()) - Number(anoString) 
		if (isNaN(date) || idade < 18) throw Cliente.erros.dtNascimento
		return mesString + "/" + diaString + "/" + anoString 
	}

	static #validarRenda(renda) {
		let rendaString = renda.replace(",", ".")
		let rendaNumber = Number(rendaString)
		if (rendaNumber == NaN || rendaNumber < 0) throw Cliente.erros.renda
		return rendaNumber.toFixed(2)
	}

	static #validarEstadoCivil(estadoCivil) {
		let estadoCivilString = String(estadoCivil).toUpperCase()
		if (!["C", "S", "V", "D"].includes(estadoCivilString)) throw Cliente.erros.estadoCivil

		return estadoCivilString

	}

	static #validarDependentes(dependentes) {
		let dependentesNumber = Number(dependentes)

		if (isNaN(dependentesNumber) || dependentesNumber > 10 || dependentesNumber < 0) {
			throw Cliente.erros.dependentes
		}
		return dependentesNumber
	}

}

async function main() {
	console.log("qual o numero de clientes?")
	let qtdClientes = Number(await lerLinha())
	while (!Number.isInteger(qtdClientes) || qtdClientes < 0) {
		console.log("digite um numbero inteiro de clientes!")
		qtdClientes = Number(await lerLinha())
		console.log("\n\n")
	}
	console.log("\n\n")

	let clientes = []
	for (let i = 0; i < qtdClientes; i++) {
		while (true) {
			try {
				let cliente = new Cliente(...(await lerCliente()))
				clientes.push(cliente)
				break
			} catch(e) {
				switch(e) {
					case Cliente.erros.nome:
						console.log("Nome invalido!")
						break
					case Cliente.erros.cpf:
						console.log("Cpf invalido!")
						break
					case Cliente.erros.dtNascimento:
						console.log("Data de nascimento invalida!")
						break
					case Cliente.erros.renda:
						console.log("Renda invalida!")
						break
					case Cliente.erros.estadoCivil:
						console.log("Estado civil invalido!")
						break
					case Cliente.erros.dependentes:
						console.log("Numero de dependentes invalido!")
						break
					default:
						console.log(e)
						console.log("Erro desconhecido!")

				}
				console.log("\n\n")
			}
		}
	}

	console.log("\n\nCLIENTES:")
	console.log("nome | cpf | nascimento | renda | estado civil | dependentes\n")
	for (cliente of clientes) {
		console.log(cliente.nome + " | ", cliente.cpf + " | ", cliente.nascimento + " | ", cliente.renda + " | ", cliente.estadoCivil + " | ", cliente.dependentes)
	}

}

if (require.main == module) {
	main()
}
