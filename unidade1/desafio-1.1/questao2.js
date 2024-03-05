const { Vertice, lerVertices } = require("./questao1.js")

class Triangulo {
	#v1
	#v2
	#v3

	static equilatero = "EQUILATERO"
	static isosceles = "ISOSCELES"
	static escaleno = "ESCALENO"

	static #verticesColineares(v1, v2, v3) {
		//se o determinante for 0, os vertices sao colineares
		return v1.x * v2.y + v1.y * v3.x + v2.x * v3.y - v3.x * v2.y - v3.y * v1.x - v2.x * v1.y === 0
	}

	constructor(v1, v2, v3) {
		if (Triangulo.#verticesColineares(v1, v2, v3)) {
			throw new Error("Os vertices nao formam um triangulo")
		}


		this.#v1 = v1
		this.#v2 = v2
		this.#v3 = v3
	}

	get vertices() { return [this.#v1, this.#v2, this.#v3] }

	equals(triangulo) {
		for (let vt1 of this.vertices) {
			let ehIgualAalgumVertice = false
			for (let vt2 of triangulo.vertices) {
				if (vt1.x === vt2.x && vt1.y === vt2.y) {
					ehIgualAalgumVertice = true
					break
				}
			}
			
			if (!ehIgualAalgumVertice) return false
		}

		return true
	}

	get #arestas() {
		return [
			this.#v1.distancia(this.#v2), this.#v2.distancia(this.#v3), this.#v3.distancia(this.#v1)
		].map((l) => Number(l.toFixed(2)))

	}

	get perimetro() { 
		return this.#arestas.reduce((soma, lado) => soma + lado)
	}

	tipo() {
		let [l1, l2, l3] = this.#arestas

		if (l1 === l2 && l2 === l3) return Triangulo.equilatero
		if (l1 === l2 || l1 === l3 || l3 === l2) return Triangulo.isosceles
		return Triangulo.escaleno
	}

	clone() { return new Triangulo(this.#v1, this.#v2, this.#v3) }

	get area() {
		let s = this.perimetro / 2
		let [l1, l2, l3] = this.#arestas

		return (s * (s - l1) * (s - l2) * (s - l3)) ** 0.5
	}


}

function compararSeTriangulosSaoIguais(triangulos) {
	for (let i = 0; i < triangulos.length - 1; i++) {
		for (let j = i + 1; j < triangulos.length; j++) {
			const iguais = triangulos[i].equals(triangulos[j])
			console.log(`\nOs triangulos ${i+1} e ${j+1} ${iguais ? "sao iguais" : "nao sao iguais"}`)
		}
	}
	console.log()
}

function printarPerimetros(triangulos) {
	for (let i in triangulos) {
		i = Number(i)
		console.log(`O perimetro do triangulo ${i+1} eh: ${triangulos[i].perimetro}`)
	}
	console.log()
}

function printarTipos(triangulos) {
	for (let i in triangulos) {
		i = Number(i)
		console.log(`O tipo do triangulo ${i+1} eh: ${triangulos[i].tipo()}`)
	}
	console.log()
}

function printarAreas(triangulos) {
	for (let i in triangulos) {
		i = Number(i)
		console.log(`A area do triangulo ${i+1} eh: ${triangulos[i].area}`)
	}
}

async function main() {
	//let v1 = new Vertice(0,2)
	//let v2 = new Vertice(2,0)
	//let v3 = new Vertice(0,0)
	//let v4 = new Vertice(10,5)
	//let triangulos = [new Triangulo(v1,v2,v3), new Triangulo(v2,v1, v3), new Triangulo(v3, v1, v4)]

	let triangulos = []

	for (let i = 1; i<4;i++) {
		console.log("Digite as coordenadas dos vertices do triangulo " + i)
		let vertices = await lerVertices(3)
		triangulos.push(new Triangulo(...vertices))
	}
	
	compararSeTriangulosSaoIguais(triangulos)
	printarPerimetros(triangulos)
	printarTipos(triangulos)
	printarAreas(triangulos)

}

if (require.main == module) {
	main()
}
