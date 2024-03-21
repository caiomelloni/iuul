class Agenda {
   constructor(db, leitor)  {
        this.db = db
        this.leitor = leitor
   }

   printMenu() {
        console.log("Agenda")
        console.log("1-Agendar consulta")
        console.log("2-Cancelar agendamento")
        console.log("3-Listar agenda")
        console.log("4-Voltar p/ menu principal")
   }
   async menuAgenda() {
        this.printMenu()
        let menuOpcao = 0
        do {
            this.printMenu()
            menuOpcao = await this.leitor.lerInputMenu()
            switch(menuOpcao) {
                case 1:
                    await this.agendarConsulta()    
                    break
                case 2:
                    await this.cancelarConsulta()
                    break
                case 3:
                    this.listarAgenda()
                    break
                case 4:

                    break
                default:
                    console.log("Opcao invalida!")
                    break
            }

        } while (menuOpcao !== 5)
   }

   async agendarConsulta() {

   }

   async cancelarConsulta() {

   }

   listarAgenda() {

   }
}
async function main() {

}

if (require.main == module) {
	main()
}

module.exports = {
	Agenda
}

