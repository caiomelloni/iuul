const { Response } = require("./response.js")

class Database {
	// map onde as keys sao o cpf e os valores objetos do tipo paciente
	#pacientesMap

	constructor() {
		this.#pacientesMap = new Map()
	}

	addPaciente(paciente) {
		if (this.#pacientesMap.get(paciente.cpf) === undefined) {
			this.#pacientesMap.set(paciente.cpf, paciente)
			return new Response(false, "")
		}

		return new Response(true, "Ja existe um paciente com este cpf")
	}

}
