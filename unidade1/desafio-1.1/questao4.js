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
				p1: value.p1 == 0 ? "-" : value.p1.toFixed(1),
				p2: value.p2 == 0 ? "-" : value.p2.toFixed(1),
				nf: Number(((value.p1 + value.p2) / 2).toFixed(1))
			}

			alunos.splice(posicaoCorreta, 0, aluno)
		}

		return alunos
	}

	imprimirAlunos() {
		let alunos = this.#alunosSortedJsonArray()	
		let lenMaiorMatricula = 10
		let lenMaiorNome = 5

		for (let aluno of alunos) {
			let lenMatricula = String(aluno.matricula).length
			let lenNome = aluno.nome.length

			if (lenMatricula > lenMaiorMatricula) lenMaiorMatricula = lenMatricula
			if (lenNome > lenMaiorNome) lenMaiorNome = lenNome + 3
		}

		console.log("-".repeat(lenMaiorMatricula + lenMaiorNome + 12))
		console.log("Matricula".padEnd(lenMaiorMatricula, " ") + "Nome".padEnd(lenMaiorNome) + "P1".padStart(4, " ") + "P2".padStart(4," ") + "NF".padStart(4, " "))
		console.log("-".repeat(lenMaiorMatricula + lenMaiorNome + 12))

		for (let aluno of alunos) {
			console.log(String(aluno.matricula).padEnd(lenMaiorMatricula, " ") + aluno.nome.padEnd(lenMaiorNome) + String(aluno.p1).padStart(4, " ") + String(aluno.p2).padStart(4," ") + String(aluno.nf).padStart(4, " "))
		}


		console.log("-".repeat(lenMaiorMatricula + lenMaiorNome + 12))
	}

}

function main() {
	let turma = new Turma()	

	let ana = new Aluno(12345, "Ana de Almeida")
	let bruno = new Aluno(23456, "Bruno Carvalho")
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


if (require.main == module) {
	main()
}
