var input = [
`cpy 2 a
tgl a
tgl a
tgl a
cpy 1 a
dec a
dec a`,
  puzzleInput
]

var day23 = function() {
  for (var i = 0; i < input.length; i++) {

    var assembunny = {
      // program counter
      pc: 0,
      // registers
      'a': 0,
      'b': 0,
      'c': 1, // part 2 specific
      'd': 0,
      // instructions
      'cpy': function(x, y) {
        var numX = Number(x)
        if (isNaN(numX)) {
          this[y] = this[x]
        } else {
          this[y] = numX
        }
        this.pc++
      },
      'inc': function(x) {
        this[x]++
        this.pc++
      },
      'dec': function(x) {
        this[x]--
        this.pc++
      },
      'jnz': function(x, y) {
        var numX = Number(x)
        if (isNaN(numX)) {
          numX = this[x]
        }
        var numY = Number(y)
        if (isNaN(numY)) {
          numY = this[y]
        }
        if (numX != 0) {
          this.pc += numY
        } else {
          this.pc++
        }
      }
    }

    var timeout = 100000000
    var program = input[i].split(/\n/)
    while (assembunny.pc < program.length && --timeout) {
      var instr = program[assembunny.pc].split(/\s/)
      assembunny[instr[0]](instr[1], instr[2])
    }
    if (!timeout) console.log('timeout!')

    $('#day23').append(input[i])
      .append('<br>&emsp;')
      .append(assembunny.a)
      .append('<br>')
  }
}

var day23part2 = function() {

  for (var i = 0; i < input.length; i++) {


    $('#day23part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day23"><h2>day #23</h2></div>')
  day23()
  $('#main').append('<br><div id="day23part2"><h2>day #23 part 2</h2></div>')
  day23part2()
  $('#main').append('<br>')
})