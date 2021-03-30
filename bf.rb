require "./wasmtmpl.rb"

# https://webassembly.github.io/wabt/demo/wat2wasm/
# https://chromium.googlesource.com/v8/v8/+/9ecd4545fe424146f0a5fa5dbcaccd775048131a/src/wasm/streaming-decoder.cc

$body = [
  #0x00,       # func body size (guess)
  0x00,       # local decl count
]

def call name 
  tbl = {
    :putchar => 0x01,
    :pinc => 0x02,
    :pdec => 0x03,
    :vinc => 0x04,
    :vdec => 0x05,
  }
  $body.concat [
    0x10,      # call
    tbl[name], # function index
  ]
end

def call_putchar
  $body.concat [
    0x23,      # global.get
    0x00,      # global index
    0x28,      # i32.load
    0x02,      # alignment
    0x00,      # load offset
  ]
  call :putchar
end

def start_loop
  $body.concat [
    0x02,      # block
    0x40,      # void
    0x03,      # loop
    0x40,      # void
    0x23,      # global.get
    0x00,      # global index
    0x28,      # i32.load
    0x02,      # alignment
    0x00,      # load offset
    0x45,      # i32.eqz
    0x0d,      # br_if
    0x01,      # break depth
  ]
end

def end_loop
  $body.concat [
    0x0c,      # br
    0x00,      # break depth
    0x0b,      # end
    0x0b,      # end
  ]
end

# https://muye.sh/archives/410
def leb128(num)
  nums = []
  loop do
    chunk = num & 0b1111111
    break if chunk == 0
    nums.push(chunk | 0b10000000)
    num = num >> 7
  end
  nums[nums.size - 1] = nums.last & 0b01111111
  nums
end

source = ">+++++++++[<++++++++>-]<.>+++++++[<++++>-]<+.+++++++..+++.[-]>++++++++[<++++>-]<.>+++++++++++[<+++++>-]<.>++++++++[<+++>-]<.+++.------.--------.[-]>++++++++[<++++>-]<+.[-]++++++++++."

source.each_char.with_index do |c, i|
  case c
  when "+"
    call :vinc
  when "-"
    call :vdec
  when "<"
    call :pdec
  when ">"
    call :pinc
  when "["
    start_loop
  when "]"
    end_loop
  when "."
    call_putchar
  when ","
    # call_getchar
    raise "not yet implemented"
  end
end

$body.concat [
  0x0b,         # end
]
$body = leb128($body.size).concat $body

codesec = $tmpl_codesec.clone.concat $body
codesec = leb128(codesec.size).concat codesec

pattern = "C*"
wasm = $tmpl_head.clone.concat(codesec).concat($tmpl_foot).flatten
File.binwrite("bfhw.wasm", wasm.pack(pattern))