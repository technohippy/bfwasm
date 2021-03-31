brwasm
====

Brainf*ck Compiler

How to compile
----

```
$ deno run --allow-read --allow-write src/bfc.ts -o hw.wasm src/hw.bf
```

or 

```
$ deno run --allow-read --allow-write src/bfc.ts -o hw.wasm -e ">+++++++++[<++++++++>-]<.>+++++++[<++++>-]<+.+++++++..+++.[-]>++++++++[<++++>-]<.>+++++++++++[<+++++>-]<.>++++++++[<+++>-]<.+++.------.--------.[-]>++++++++[<++++>-]<+.[-]++++++++++."
```

How to run
----

```
$ deno run --allow-read src/bf.ts bf.wasm
```

How to install
----

```
$ deno install --allow-read --allow-write --name bfc src/bfc.ts
$ deno install --allow-read --name bf src/bf.ts
```

After the installation, you can use these commands as follows:

```
$ bfc -o hw.wasm src/hw.bf
$ bf src/hw.wasm
```