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
      program: '',
      // program counter
      pc: 0,
      // registers
      'a': 0,
      'b': 0,
      'c': 1, // part 2 specific
      'd': 0,
      // instructions
      'cpy': function(x, y) {
        if (isNaN(Number(y))) { // only copy if y is a register
          var numX = Number(x)
          if (isNaN(numX)) { // if x is a register, get its content
            this[y] = this[x]
          } else {
            this[y] = numX
          }
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
      },
      'tgl': function(x) {
        var numX = Number(x)
        if (isNaN(numX)) { // if x is a register, get its content
          numX = this[x]
        }
        var numX = this.pc + numX // target instruction numX away from current
        this.pc++
        if (numX >= this.program.length) {
          return
        }
        var instr = this.program[numX].split(/\s/)
        if (instr.length === 2) {
          instr[0] === 'inc' ? instr[0] = 'dec' : instr[0] = 'inc'
        } else if (instr.length === 3) {
          instr[0] === 'jnz' ? instr[0] = 'cpy' : instr[0] = 'jnz'
        }
        this.program[numX] = instr.join(' ')
      }
    }

    if (i === 1) { // puzzleInput
      assembunny.a = 7
    }

    var timeout = 100000000
    assembunny.program = input[i].split(/\n/)
    while (assembunny.pc < assembunny.program.length && --timeout) {
      var instr = assembunny.program[assembunny.pc].split(/\s/)
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

    var assembunny = {
      program: '',
      // program counter
      pc: 0,
      // registers
      'a': 0,
      'b': 0,
      'c': 1, // part 2 specific
      'd': 0,
      // instructions
      'cpy': function(x, y) { // copy (x|val of reg x) into reg y
        if (isNaN(Number(y))) { // only copy if y is a register
          var numX = Number(x)
          if (isNaN(numX)) { // if x is a register, get its content
            this[y] = this[x]
          } else {
            this[y] = numX
          }
        }
        this.pc++
      },
      'inc': function(x) { // increments val of reg x
        this[x]++
        this.pc++
      },
      'dec': function(x) { // decrements val of reg x
        this[x]--
        this.pc++
      },
      'jnz': function(x, y) { // jumps to instruction (y|val of reg y) away from current pc if (x|val of reg x) is not zero
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
      },
      'tgl': function(x) { // toggles the instruction that is (x|val of reg x) away from current pc
        var numX = Number(x)
        if (isNaN(numX)) { // if x is a register, get its content
          numX = this[x]
        }
        var numX = this.pc + numX // target instruction numX away from current
        this.pc++
        if (numX >= this.program.length) {
          return
        }
        var instr = this.program[numX].split(/\s/)
        if (instr.length === 2) {
          instr[0] === 'inc' ? instr[0] = 'dec' : instr[0] = 'inc'
        } else if (instr.length === 3) {
          instr[0] === 'jnz' ? instr[0] = 'cpy' : instr[0] = 'jnz'
        }
        this.program[numX] = instr.join(' ')
      }
    }

    if (i === 1) { // puzzleInput
      assembunny.a = 12 // part 2
    }

    /*
      This pattern is a cut-sum, sums c on a and then zeroes c:
        inc a
        dec c
        jnz c -2
      How can I reduce it? It needs a new instruction...
      The surrounding code looks like a multplication.
    */

    var timeout = 100000000000 //100.000.000.000
    assembunny.program = input[i].split(/\n/)
    while (assembunny.pc < assembunny.program.length && --timeout) {
      if (timeout % 100000000 === 0) {
        console.log(assembunny.pc, timeout)
      }
      var instr = assembunny.program[assembunny.pc].split(/\s/)
      assembunny[instr[0]](instr[1], instr[2])
    }
    if (!timeout) console.log('timeout!')


    $('#day23part2').append(input[i])
      .append('<br>&emsp;')
      .append(assembunny.a)
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