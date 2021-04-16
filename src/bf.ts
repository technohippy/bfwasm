// deno run --allow-read src/bf.ts src/bfhw.wasm
const {args: [filename], readFile, exit} = Deno;

if (!filename) {
	console.error("no filename");
	exit(1);
}

const out:String[] = [];

const code = await readFile(filename);
const module = new WebAssembly.Module(code);
const instance = new WebAssembly.Instance(module, {
	js: {
		mem: new WebAssembly.Memory({initial:1}),
		global: new WebAssembly.Global({value: "i32", mutable: true}, 0),
		getchar: () => (prompt("input char") || " ").charCodeAt(0),
		putchar: (code:number) => { out.push(String.fromCharCode(code)) }
	}
});

(instance.exports.main as Function)();

console.log(out.join(""));