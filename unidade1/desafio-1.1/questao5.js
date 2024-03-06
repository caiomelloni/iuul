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
