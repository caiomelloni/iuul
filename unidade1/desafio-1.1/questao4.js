class Aluno {
	matricula
	nome
	p1
	p2
	nf

	constructor(matricula, nome) {
		this.matricula = matricula
		this.nome = nome
	}

}

class Turma {
	mapAlunos

	constructor() {
		mapAlunos = new Map()
	}

	inserirAluno(aluno) {
		if (mapAlunos.get(aluno.matricula) != null) throw Error("aluno ja existe")
		mapAlunos.set(aluno.matricula, aluno)
	}

}
