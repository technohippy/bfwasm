// deno run --allow-read --allow-write src/bfc.ts -o hw.wasm src/hw.bf
import * as bc from "./bytecodes.ts";
const {args, exit, readFile, writeFile} = Deno;

// https://en.wikipedia.org/wiki/LEB128
const leb128 = (num:number) => {
	const nums:number[] = [];
	while (true) {
    const chunk = num & 0b1111111;
		if (chunk === 0) break ;
    nums.push(chunk | 0b10000000)
    num = num >> 7
	}
  nums[nums.length - 1] = nums[nums.length - 1] & 0b01111111
  return nums
};

// handle command line args
let bfcode = "";
let outfile = "out.wasm";

for (let i = 0; i < args.length; i++) {
	const arg = args[i];
	if (arg === "-h") {
		console.log("bfc -e [code] -o [outfile] [infile]");
		exit(0);
	}
	if (arg.startsWith("-")) continue;

	const argType = args[i - 1];
	if (argType === "-e") {
		bfcode = arg;
	} else if (argType === "-o") {
		outfile = arg;
	} else {
		const decoder = new TextDecoder("utf-8");
		const data = await readFile(arg);
		bfcode = decoder.decode(data);
	}
}

// compile
const funcBody = [
  0x00,       // local decl count
];

bfcode.split("").forEach(c => {
	switch (c) {
		case "+":
			funcBody.push(...bc.callFunc("vinc"))
			break;
		case "-":
			funcBody.push(...bc.callFunc("vdec"))
			break;
		case "<":
			funcBody.push(...bc.callFunc("pdec"))
			break;
		case ">":
			funcBody.push(...bc.callFunc("pinc"))
			break;
		case "[":
			funcBody.push(...bc.startLoop)
			break;
		case "]":
			funcBody.push(...bc.endLoop)
			break;
		case ".":
			funcBody.push(...bc.callPutchar())
			break;
		case ",":
			funcBody.push(...bc.callGetchar())
			break;
	}
})

funcBody.push(
	0x0b,		// end
);
funcBody.unshift(...leb128(funcBody.length)); // func body size

const codeSection = [...bc.codeSection];
codeSection.push(...funcBody);
codeSection.unshift(...leb128(codeSection.length)); // section size

const wasm = []
wasm.push(...bc.header, ...codeSection, ...bc.footer);

writeFile(outfile, new Uint8Array(wasm));