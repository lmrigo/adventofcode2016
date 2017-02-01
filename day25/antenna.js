var input = [
  puzzleInput
]


var assembunny = {
  program: '',
  // program counter
  pc: 0,
  // registers
  'a': 0,
  'b': 0,
  'c': 0,
  'd': 0,
  // output
  'output': '',
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
  },
  'out': function(x) { //transmits x (either an integer or the value of a register)
    var numX = Number(x)
    if (isNaN(numX)) { // if x is a register, get its content
      numX = this[x]
    }
    this.output = '' + numX
  },
  'reset': function() {
    this.program = ''
    this.pc = 0
    this.a = 0
    this.b = 0
    this.c = 0
    this.d = 0
    this.output = ''
  }
}

var day25 = function() {
  for (var i = 0; i < input.length; i++) {

    var inA = 0

    for (inA = 0; inA < 1000000; inA++) {
      assembunny.reset()
      assembunny.a = inA
      var prev = ''
      var timeout = 100000
      assembunny.program = input[i].split(/\n/)
      while (assembunny.pc < assembunny.program.length && --timeout) {
        var instr = assembunny.program[assembunny.pc].split(/\s/)
        assembunny[instr[0]](instr[1], instr[2])
        if (instr[0] === 'out') {
          var next = assembunny.output
          if (prev === '') { // 1st time
            prev = next
          } else if ((prev === '0' && next === '1')
                    || (prev === '1' && next === '0')) {
            console.log(inA)
            prev = next
          } else {
            break
          }
        }
      }
      if (!timeout) {
        console.log(assembunny.output, assembunny.a)
        break
      }
      if (inA % 10000 === 0) {
        console.log(assembunny.output.substr(0,10), inA)
      }
    }

    $('#day25').append(input[i])
      .append('<br>&emsp;')
      .append(inA)
      .append('<br>')
  }
}

var day25part2 = function() {

  for (var i = 0; i < input.length; i++) {
    assembunny.reset()
    /*
      This pattern is a cut-sum, sums c on a and then zeroes c:
        inc a
        dec c
        jnz c -2
      How can I reduce it? It needs a new instruction...
      The surrounding code looks like a multplication.
    */


    $('#day25part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day25"><h2>day #25</h2></div>')
  day25()
  $('#main').append('<br><div id="day25part2"><h2>day #25 part 2</h2></div>')
  day25part2()
  $('#main').append('<br>')
})