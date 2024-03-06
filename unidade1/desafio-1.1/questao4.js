class Aluno {
	matricula
	nome
	p1
	p2

	constructor(matricula, nome) {
		this.matricula = matricula
		this.nome = nome
		this.p1 = 0
		this.p2 = 0
	}

}

class Turma {
	mapAlunos

	constructor() {
		this.mapAlunos = new Map()
	}

	inserirAluno(aluno) {
		if (this.mapAlunos.get(aluno.matricula) != null) throw Error("aluno ja existe")
		this.mapAlunos.set(aluno.matricula, aluno)
	}

	removerAluno(matricula) {
		this.mapAlunos.delete(matricula)
	}

	lancarP1(matricula, nota) {
		this.mapAlunos.get(matricula).p1 = Number(nota.toFixed(1))
	}

	lancarP2(matricula, nota) {
		this.mapAlunos.get(matricula).p2 = Number(nota.toFixed(1))
	}

	#alunosSortedJsonArray() {
		let alunos = []
		for (const [key, value] of this.mapAlunos) {
			let posicaoCorreta = 0

			for (let aluno of alunos) {
				if (aluno.nome < value.nome) {
					posicaoCorreta += 1 
				} else { break }
			}

			let aluno = {
				matricula: key,
				nome: value.nome,
				p1: value.p1 == 0 ? "-" : value.p1,
				p2: value.p2 == 0 ? "-" : value.p2,
				nf: Number(((value.p1 + value.p2) / 2).toFixed(1))
			}

			alunos.splice(posicaoCorreta, 0, aluno)
		}

		return alunos
	}

	imprimirAlunos() {
		let alunos = this.#alunosSortedJsonArray()	
		console.log(alunos)


	}

}

function main() {
	let turma = new Turma()	

	let ana = new Aluno(12345, "Ana de Almeida")
	let bruno = new Aluno(123456, "Bruno Carvalho")
	let fernanda = new Aluno(34567, "Fernanda Abreu")
	let joao = new Aluno(45678, "Joao Santos")
	let caio = new Aluno(777, "Caio Santos")

	turma.inserirAluno(caio)
	turma.inserirAluno(joao)
	turma.inserirAluno(ana)
	turma.inserirAluno(fernanda)
	turma.inserirAluno(bruno)
	turma.removerAluno(777)

	turma.lancarP1(ana.matricula, 8)
	turma.lancarP2(ana.matricula, 9.5)
	turma.lancarP1(bruno.matricula, 7)
	turma.lancarP2(fernanda.matricula, 8.5)

	turma.imprimirAlunos()
}


main()
