const { Leitor } = require("./leitor.js")



async function main() {
	let leitor = new Leitor()

	for await (const dado of leitor.lerPaciente()) {
		console.log(dado)
	}

}

main()
