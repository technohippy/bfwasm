tmpl = <<EOS
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
##body##
  )
)
EOS

indent = 2
loopcount = 0
source = ">+++++++++[<++++++++>-]<.>+++++++[<++++>-]<+.+++++++..+++.[-]>++++++++[<++++>-]<.>+++++++++++[<+++++>-]<.>++++++++[<+++>-]<.+++.------.--------.[-]>++++++++[<++++>-]<+.[-]++++++++++."
body = []
source.each_char.with_index do |c, i|
  case c
  when "+"
    body.push "#{"  " * indent}call $vinc"
  when "-"
    body.push "#{"  " * indent}call $vdec"
  when "<"
    body.push "#{"  " * indent}call $pdec"
  when ">"
    body.push "#{"  " * indent}call $pinc"
  when "["
    body.push "#{"  " * indent}(block $block#{loopcount} (loop $loop#{loopcount}"
    indent += 1
    body.push "#{"  " * indent}(br_if $block#{loopcount} (i32.eqz (i32.load (global.get $ptr))))"
  when "]"
    body.push "#{"  " * indent}(br $loop#{loopcount})"
    indent -= 1
    body.push "#{"  " * indent}))"
    loopcount += 1
  when "."
    body.push "#{"  " * indent}(i32.load (global.get $ptr))"
    body.push "#{"  " * indent}call $putchar"
  when ","
    body.push "#{"  " * indent}call $getchar"
  end
end
print tmpl.gsub("##body##", body.join("\n"))
