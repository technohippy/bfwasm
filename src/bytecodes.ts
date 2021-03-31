export const header = [
  0x00, 0x61, 0x73, 0x6d,                      // WASM_BINARY_MAGIC
  0x01, 0x00, 0x00, 0x00,                      // WASM_BINARY_VERSION
  // section "Type" (1)
  0x01,                                        // section code
  0x0c,                                        // section size (guess)
  0x03,                                        // num types
  // func type 0
  0x60,                                        // func
  0x00,                                        // num params
  0x01,                                        // num results
  0x7f,                                        // i32
  // func type 1
  0x60,                                        // func
  0x01,                                        // num params
  0x7f,                                        // i32
  0x00,                                        // num results
  // func type 2
  0x60,                                        // func
  0x00,                                        // num params
  0x00,                                        // num results
  // section "Import" (2)
  0x02,                                        // section code
  0x32,                                        // section size (guess)
  0x04,                                        // num imports
  // import hea der 0
  0x02,                                        // string length
  0x6a, 0x73,                                  // js  // import module name
  0x03,                                        // string length
  0x6d, 0x65, 0x6d,                            // mem  // import field name
  0x02,                                        // import kind
  0x00,                                        // limits: flags
  0x01,                                        // limits: initial
  // import hea der 1
  0x02,                                        // string length
  0x6a, 0x73,                                  // js  // import module name
  0x07,                                        // string length
  0x67, 0x65, 0x74, 0x63, 0x68, 0x61, 0x72,    // getchar  // import field name
  0x00,                                        // import kind
  0x00,                                        // import signature index
  // import hea der 2
  0x02,                                        // string length
  0x6a, 0x73,                                  // js  // import module name
  0x07,                                        // string length
  0x70, 0x75, 0x74, 0x63, 0x68, 0x61, 0x72,    // putchar  // import field name
  0x00,                                        // import kind
  0x01,                                        // import signature index
  // import hea der 3
  0x02,                                        // string length
  0x6a, 0x73,                                  // js  // import module name
  0x06,                                        // string length
  0x67, 0x6c, 0x6f, 0x62, 0x61, 0x6c,          // global  // import field name
  0x03,                                        // import kind
  0x7f,                                        // i32
  0x01,                                        // global mutability
  // section "Function" (3)
  0x03,                                        // section code
  0x06,                                        // section size (guess)
  0x05,                                        // num functions
  0x02,                                        // function 0 signature index
  0x02,                                        // function 1 signature index
  0x02,                                        // function 2 signature index
  0x02,                                        // function 3 signature index
  0x02,                                        // function 4 signature index
  // section "Export" (7)
  0x07,                                        // section code
  0x08,                                        // section size (guess)
  0x01,                                        // num exports
  0x04,                                        // string length
  0x6d, 0x61, 0x69, 0x6e,                      // main  // export name
  0x00,                                        // export kind
  0x06,                                        // export func index
  // section "Code" (10)
  0x0a,                                        // section code
]

export const codeSection = [
  //0x00,                                        // section size (guess)
  0x05,                                        // num functions
  // function body 0
  0x09,                                        // func body size (guess)
  0x00,                                        // local decl count
  0x23,                                        // global.get
  0x00,                                        // global index
  0x41,                                        // i32.const
  0x01,                                        // i32 literal
  0x6a,                                        // i32.add
  0x24,                                        // global.set
  0x00,                                        // global index
  0x0b,                                        // end
  // function body 1
  0x09,                                        // func body size (guess)
  0x00,                                        // local decl count
  0x23,                                        // global.get
  0x00,                                        // global index
  0x41,                                        // i32.const
  0x01,                                        // i32 literal
  0x6b,                                        // i32.sub
  0x24,                                        // global.set
  0x00,                                        // global index
  0x0b,                                        // end
  // function body 2
  0x0f,                                        // func body size (guess)
  0x00,                                        // local decl count
  0x23,                                        // global.get
  0x00,                                        // global index
  0x23,                                        // global.get
  0x00,                                        // global index
  0x28,                                        // i32.load
  0x02,                                        // alignment
  0x00,                                        // load offset
  0x41,                                        // i32.const
  0x01,                                        // i32 literal
  0x6a,                                        // i32.add
  0x36,                                        // i32.store
  0x02,                                        // alignment
  0x00,                                        // store offset
  0x0b,                                        // end
  // function body 3
  0x0f,                                        // func body size (guess)
  0x00,                                        // local decl count
  0x23,                                        // global.get
  0x00,                                        // global index
  0x23,                                        // global.get
  0x00,                                        // global index
  0x28,                                        // i32.load
  0x02,                                        // alignment
  0x00,                                        // load offset
  0x41,                                        // i32.const
  0x01,                                        // i32 literal
  0x6b,                                        // i32.sub
  0x36,                                        // i32.store
  0x02,                                        // alignment
  0x00,                                        // store offset
  0x0b,                                        // end
]

// function body 4

const funcCodes:{[key:string]: number} = {
	putchar: 0x01,
	pinc: 0x02,
	pdec: 0x03,
	vinc: 0x04,
	vdec: 0x05,
}

export const callFunc = (name:string) => {
	return [
		0x10, // call
		funcCodes[name],
	]
}

export const callPutchar = () => {
  return [
    0x23,      // global.get
    0x00,      // global index
    0x28,      // i32.load
    0x02,      // alignment
    0x00,      // load offset
  ].concat(callFunc("putchar"))
}

export const startLoop = [
	0x02,      // block
	0x40,      // void
	0x03,      // loop
	0x40,      // void
	0x23,      // global.get
	0x00,      // global index
	0x28,      // i32.load
	0x02,      // alignment
	0x00,      // load offset
	0x45,      // i32.eqz
	0x0d,      // br_if
	0x01,      // break depth
]

export const endLoop = [
	0x0c,      // br
	0x00,      // break depth
	0x0b,      // end
	0x0b,      // end
]

export const footer = [
  // section "name"
  0x00,                                        // section code
  0x4d,                                        // section size (guess)
  0x04,                                        // string length
  0x6e, 0x61, 0x6d, 0x65,                      // name  // custom section name
  0x01,                                        // name subsection type
  0x2b,                                        // subsection size (guess)
  0x06,                                        // num names
  0x00,                                        // elem index
  0x07,                                        // string length
  0x67, 0x65, 0x74, 0x63, 0x68, 0x61, 0x72,    // getchar  // elem name 0
  0x01,                                        // elem index
  0x07,                                        // string length
  0x70, 0x75, 0x74, 0x63, 0x68, 0x61, 0x72,    // putchar  // elem name 1
  0x02,                                        // elem index
  0x04,                                        // string length
  0x70, 0x69, 0x6e, 0x63,                      // pinc  // elem name 2
  0x03,                                        // elem index
  0x04,                                        // string length
  0x70, 0x64, 0x65, 0x63,                      // pdec  // elem name 3
  0x04,                                        // elem index
  0x04,                                        // string length
  0x76, 0x69, 0x6e, 0x63,                      // vinc  // elem name 4
  0x05,                                        // elem index
  0x04,                                        // string length
  0x76, 0x64, 0x65, 0x63,                      // vdec  // elem name 5
  0x02,                                        // local name type
  0x11,                                        // subsection size (guess)
  0x07,                                        // num functions
  0x00,                                        // function index
  0x00,                                        // num locals
  0x01,                                        // function index
  0x01,                                        // num locals
  0x00,                                        // local index
  0x00,                                        // string length
  0x02,                                        // function index
  0x00,                                        // num locals
  0x03,                                        // function index
  0x00,                                        // num locals
  0x04,                                        // function index
  0x00,                                        // num locals
  0x05,                                        // function index
  0x00,                                        // num locals
  0x06,                                        // function index
  0x00,                                        // num locals
  0x07,                                        // name subsection type
  0x06,                                        // subsection size (guess)
  0x01,                                        // num names
  0x00,                                        // elem index
  0x03,                                        // string length
  0x70, 0x74, 0x72,                            // ptr  // elem name 0
]