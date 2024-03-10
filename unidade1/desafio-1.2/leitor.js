class Leitor {
	async function lerLinha() {
		const readline = require('readline').createInterface({
			input: process.stdin,
			output: process.stdout
		});

		const it = readline[Symbol.asyncIterator]();
		const linha = (await it.next()).value;
		readline.close();
		return linha;
	}
}


