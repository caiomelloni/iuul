const { Leitor } = require("./leitor.js")
const { Database } = require('./database.js')
const { Cadastro } = require('./cadastro.js')
const { Agenda } = require("./agenda.js")

let leitor = new Leitor()
let db = new Database()
let cadastro = new Cadastro(db, leitor)
let agenda = new Agenda(db, leitor)

function printMenuPrincipal() {
	console.log("Menu Principal")
	console.log("1-Cadastro de pacientes")
	console.log("2-Agenda")
	console.log("3-Fim")
}

async function main() {


	let menuPrincipalOpcao = 0
	do {
		printMenuPrincipal()
		menuPrincipalOpcao = await leitor.lerInputMenu()
		switch(menuPrincipalOpcao) {
			case 1:
				await cadastro.menuCadastroCliente()
				break
			case 2:
				await agenda.menuAgenda()
				break
			case 3:
				break
			default:
				console.log("Opcao invalida!")
				break
		}

	} while (menuPrincipalOpcao !== 3)

	console.log("Encerrando aplicacao!")
}

main()
