#File.open("wasmtmpl.txt") do |f|
File.open("looptmpl.txt") do |f|
  f.each_line do |l|
    l = l.gsub(/^.{7}: /, "")
    l = l.gsub(";", "#")
    l = l.gsub(/(     +)([^# ])/, "\\1# \\2")
    l = l.gsub(/([0-9a-f]{2})([0-9a-f]{2})/, "\\1 \\2")
    l = l.gsub(/\b([0-9a-f]{2})\b/, "0x\\1")
    l = l.gsub(/(0x[0-9a-f]{2})/, "\\1,")
    print l
  end
end
