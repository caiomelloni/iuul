class Cadastro {
    constructor(db, leitor) {
        this.db = db
        this.leitor = leitor
    }

    printMenuCadastro() {
        console.log("Menu do Cadastro de Pacientes")
        console.log("1-Cadastrar novo paciente")
        console.log("2-Excluir paciente")
        console.log("3-Listar pacientes (ordenado por CPF)")
        console.log("4-Listar pacientes (ordenado por nome)")
        console.log("5-Voltar p/ menu principal")
    }

    async menuCadastroCliente() {

        let menuOpcao = 0
        do {
            this.printMenuCadastro()
            menuOpcao = await this.leitor.lerInputMenu()
            switch(menuOpcao) {
                case 1:
                    await this.cadastrarPaciente()
                    break
                case 2:
                    await this.removerPaciente() 
                    break
                case 3:
                    this.db.listarPacientesPorCpf()
                    break
                case 4:
                    this.db.listarPacientesPorNome()
                    break
                case 5:
                    break
                default:
                    console.log("Opcao invalida!")
                    break
            }

        } while (menuOpcao !== 5)
    }

    async cadastrarPaciente() {
        let paciente = await this.leitor.lerPaciente()
        if (paciente.hasError) console.log(paciente.errorMessage)
        else {
            let resp = this.db.addPaciente(paciente)
            if (resp.hasError) console.log(resp.errorMessage)
            else {
                console.log("\nPaciente cadastrado com sucesso\n")
            }
        }
    }

    async removerPaciente() {
        process.stdout.write("CPF a remover: ");
        let cpf = await this.leitor.lerLinha()
        this.db.removePaciente(cpf)
    }
}

async function main() {

}

if (require.main == module) {
	main()
}

module.exports = {
	Cadastro
}
