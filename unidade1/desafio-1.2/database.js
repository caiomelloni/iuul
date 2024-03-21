const { Response } = require("./response.js")

class Database {
	// map onde as keys sao o cpf e os valores objetos do tipo paciente
	#pacientesMap
	#agendaMap

	constructor() {
		this.#pacientesMap = new Map()
		this.#agendaMap = new Map()
	}

	addPaciente(paciente) {
		if (this.#pacientesMap.get(paciente.cpf.cpf) === undefined) {
			this.#pacientesMap.set(paciente.cpf.cpf, paciente)
			return new Response(false, "")
		}

		return new Response(true, "Ja existe um paciente com este cpf")
	}

	removePaciente(cpfString) {
		let paciente = this.#pacientesMap.get(cpfString)
		if (this.temConsultaFutura(paciente)) {
			console.log("Esta paciente nao pode ser excluido, ele tem uma consulta futura")
			return
		}

		this.#pacientesMap.delete(paciente.cpf.cpf)
		this.deletarTodosAgendamentos(paciente)

	}

	temConsultaFutura(paciente) {
		return false
	}

	deletarTodosAgendamentos(paciente) {

	}

	listarPacientesPorCpf() {
		for (let [key, value] of this.#pacientesMap) {
			console.log("Paciente: ")
			value.log()
		}
	}

	listarPacientesPorNome() {

	}
}
async function main() {

}

if (require.main == module) {
	main()
}

module.exports = {
	Database	
}

