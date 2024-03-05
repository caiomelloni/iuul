class Vertice {
	#x;
	#y;

	constructor(x, y) {
		this.#x = x;
		this.#y = y;
	}
	
	get x() {
		return this.#x;
	}

	get y() {
		return this.#y;
	}

	distancia(vertice) {
		return ((this.#x - vertice.x) ** 2 + (this.#y - vertice.y) ** 2)**0.5;
	}

	move(x, y) {
		this.#x = x;
		this.#y = y;
	}

	equals(vertice) {
		return this.#x == vertice.x && this.#y == vertice.y;
	}


}


async function lerVertices(quantosVertices) {
	let vertices = [];

	const readline = require('readline').createInterface({
		input: process.stdin,
		output: process.stdout
	});
	const it = readline[Symbol.asyncIterator]();

	for(let i = 1; i<quantosVertices+1; i++) {
		console.log("x" + i + ": ");
		const x = Number((await it.next()).value);

		console.log("y" + i + ": ");
		const y = Number((await it.next()).value);

		vertices.push(new Vertice(x, y));
	}
	readline.close();

	return vertices;
}

function compararVertices(vertices) {
	for (let i = 0; i < vertices.length - 1; i++) {
		for (let j = i + 1; j < vertices.length; j++) {
			let v1 = vertices[i];
			let v2 = vertices[j];
			console.log(`A distancia entre v${i+1} e v${j+1} eh: ${v1.distancia(v2)}`);

			console.log(`v${i+1} ${v1.equals(v2) ? "eh igual" : "nao eh igual"} a v${j+1}`);
		}
	}
}

async function main() {

	let vertices = await lerVertices(3);
	console.log("\n");

	compararVertices(vertices);

	console.log("\nAgora vamos mudar os vertices de posicao e comparar novamente");
	let novasPosicoes = await lerVertices(3);

	for (let i = 0; i < vertices.length; i++) {
		let newX = novasPosicoes[i].x
		let newY = novasPosicoes[i].y
		vertices[i].move(newX, newY);
	}
	compararVertices(vertices);

	
	
}

main()


module.exports = {
	Vertice,
	lerVertices
}
