
var input = [
`cpy 41 a
inc a
inc a
dec a
jnz a 2
dec a`,
  puzzleInput
 ]

var day12 = function() {

  for (var i = 0; i < input.length; i++) {

    var assembunny = {
      // program counter
      pc: 0,
      // registers
      'a': 0,
      'b': 0,
      'c': 0,
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

    var temp = 1000000
    var program = input[i].split(/\n/)
    while (assembunny.pc < program.length && temp > 0) {
      var instr = program[assembunny.pc].split(/\s/)
      assembunny[instr[0]](instr[1], instr[2])
      temp--
    }
    if (!temp) console.log('timeout!')

    $('#day12').append(input[i])
      .append('<br>&emsp;')
      .append(assembunny.a)
      .append('<br>')
  }
}

var day12part2 = function() {

  for (var i = 0; i < input.length; i++) {
    $('#day12part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day12"><h2>day #12</h2></div>')
  day12()
  $('#main').append('<br><div id="day12part2"><h2>day #12 part 2</h2></div>')
  day12part2()
  $('#main').append('<br>')
})
