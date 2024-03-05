const { Vertice, lerVertices } = require("./questao1.js")

class Poligono {

	#vertices

	constructor(vertices) {
		let saoVertices = true
		for (let vertice of vertices) {
			if (!(vertice instanceof Vertice)) {
				saoVertices = false
				break
			}
		}

		if (!saoVertices) throw Error("Poligono nao composto por apenas vertices")
		if (vertices.length < 3) throw Error("Numero de vertices menor que 3")

		this.#vertices = vertices
	}

	addVertice(vertice) {
		if (!(vertice instanceof Vertice)) {
			throw Error("Apenas vertices podem ser adicionados no poligono")
		}

		for (let innerVertice of this.#vertices) {
			if (innerVertice.equals(vertice)) return false
		}

		this.#vertices.push(vertice)
		return true
	}

	get #arestas() {
		let arestas = []

		for (let i = 0; i<this.#vertices.length; i++) {
			let nextVertice = i + 1
			if (nextVertice == this.#vertices.length) nextVertice = 0
			let j = nextVertice

			let vi = this.#vertices[i]
			let vj = this.#vertices[j]
			arestas.push(vi.distancia(vj))
		}

		return arestas
	}

	get perimetro() { 
		return this.#arestas.reduce((soma, lado) => soma + lado)
	}

	get qtdVertices() { return this.#vertices.length }

}


async function inputNumber() {
	const readline = require('readline').createInterface({
			input: process.stdin,
			output: process.stdout
		});

	const it = readline[Symbol.asyncIterator]();
	const input = Number((await it.next()).value);
	readline.close();

	return input;
}


async function main() {
	//let v1 = new Vertice(0,2)
	//let v2 = new Vertice(2,0)
	//let v3 = new Vertice(0,0)
	//let v4 = new Vertice(10,5)

	//let pl = new Poligono([v1, v2, v3, v4])

	console.log("quantos vertices tem o poligono? :")
	let qtdVertices = await inputNumber()
	let vertices = await lerVertices(qtdVertices)

	let pl = new Poligono(vertices)

	console.log("\nO perimetro do poligono eh: " + pl.perimetro)
	console.log("O poligono possui " + pl.qtdVertices + " vertices")

	console.log("Digite um vertice para ser adicionado: ")
	let [vertice] = await lerVertices(1)
	pl.addVertice(vertice)

	console.log("\nApos adicionar o vertice: ")
	console.log("\nO perimetro do poligono eh: " + pl.perimetro)
	console.log("O poligono possui " + pl.qtdVertices + " vertices")

}


if (require.main == module) {
	main()
}
