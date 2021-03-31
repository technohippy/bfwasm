(module
  (import "js" "mem" (memory 1))
  (import "js" "getchar" (func $getchar (result i32)))
  (import "js" "putchar" (func $putchar (param i32)))
  (global $ptr (import "js" "global") (mut i32))

  (func $pinc
    (global.set $ptr
      (i32.add (global.get $ptr) (i32.const 1))))

  (func $pdec
    (global.set $ptr
      (i32.sub (global.get $ptr) (i32.const 1))))

  (func $vinc
    (i32.store
      (global.get $ptr)
      (i32.add (i32.load (global.get $ptr)) (i32.const 1))))

  (func $vdec
    (i32.store
      (global.get $ptr)
      (i32.sub (i32.load (global.get $ptr)) (i32.const 1))))

  (func (export "main")
    call $pinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    (block $block0 (loop $loop0
      (br_if $block0 (i32.eqz (i32.load (global.get $ptr))))
      call $pdec
      call $vinc
      call $vinc
      call $vinc
      call $vinc
      call $vinc
      call $vinc
      call $vinc
      call $vinc
      call $pinc
      call $vdec
      (br $loop0)
    ))
    call $pdec
    (i32.load (global.get $ptr))
    call $putchar
    call $pinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    (block $block1 (loop $loop1
      (br_if $block1 (i32.eqz (i32.load (global.get $ptr))))
      call $pdec
      call $vinc
      call $vinc
      call $vinc
      call $vinc
      call $pinc
      call $vdec
      (br $loop1)
    ))
    call $pdec
    call $vinc
    (i32.load (global.get $ptr))
    call $putchar
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    (i32.load (global.get $ptr))
    call $putchar
    (i32.load (global.get $ptr))
    call $putchar
    call $vinc
    call $vinc
    call $vinc
    (i32.load (global.get $ptr))
    call $putchar
    (block $block2 (loop $loop2
      (br_if $block2 (i32.eqz (i32.load (global.get $ptr))))
      call $vdec
      (br $loop2)
    ))
    call $pinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    (block $block3 (loop $loop3
      (br_if $block3 (i32.eqz (i32.load (global.get $ptr))))
      call $pdec
      call $vinc
      call $vinc
      call $vinc
      call $vinc
      call $pinc
      call $vdec
      (br $loop3)
    ))
    call $pdec
    (i32.load (global.get $ptr))
    call $putchar
    call $pinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    (block $block4 (loop $loop4
      (br_if $block4 (i32.eqz (i32.load (global.get $ptr))))
      call $pdec
      call $vinc
      call $vinc
      call $vinc
      call $vinc
      call $vinc
      call $pinc
      call $vdec
      (br $loop4)
    ))
    call $pdec
    (i32.load (global.get $ptr))
    call $putchar
    call $pinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    (block $block5 (loop $loop5
      (br_if $block5 (i32.eqz (i32.load (global.get $ptr))))
      call $pdec
      call $vinc
      call $vinc
      call $vinc
      call $pinc
      call $vdec
      (br $loop5)
    ))
    call $pdec
    (i32.load (global.get $ptr))
    call $putchar
    call $vinc
    call $vinc
    call $vinc
    (i32.load (global.get $ptr))
    call $putchar
    call $vdec
    call $vdec
    call $vdec
    call $vdec
    call $vdec
    call $vdec
    (i32.load (global.get $ptr))
    call $putchar
    call $vdec
    call $vdec
    call $vdec
    call $vdec
    call $vdec
    call $vdec
    call $vdec
    call $vdec
    (i32.load (global.get $ptr))
    call $putchar
    (block $block6 (loop $loop6
      (br_if $block6 (i32.eqz (i32.load (global.get $ptr))))
      call $vdec
      (br $loop6)
    ))
    call $pinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    (block $block7 (loop $loop7
      (br_if $block7 (i32.eqz (i32.load (global.get $ptr))))
      call $pdec
      call $vinc
      call $vinc
      call $vinc
      call $vinc
      call $pinc
      call $vdec
      (br $loop7)
    ))
    call $pdec
    call $vinc
    (i32.load (global.get $ptr))
    call $putchar
    (block $block8 (loop $loop8
      (br_if $block8 (i32.eqz (i32.load (global.get $ptr))))
      call $vdec
      (br $loop8)
    ))
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    call $vinc
    (i32.load (global.get $ptr))
    call $putchar
  )
)
