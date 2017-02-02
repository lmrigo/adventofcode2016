var input = [
`cpy 0 a
cpy 0 b
cpy 0 c
cpy 0 d
cpy 15 c
cpy 170 b
inc d
dec b
jnz b -2
dec c
jnz c -5
out a`, //mul test
  puzzleInput
]


var assembunny = {
  program: [],
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
    var instr = this.program[numX]
    if (instr.length === 2) {
      instr[0] === 'inc' ? instr[0] = 'dec' : instr[0] = 'inc'
    } else if (instr.length === 3) {
      instr[0] === 'jnz' ? instr[0] = 'cpy' : instr[0] = 'jnz'
    }
  },
  'sum': function(x, y) { // sums reg y into reg x and clears reg y
    this[x] += this[y]
    this[y] = 0
    this.pc += 3
  },
  'mul': function(x, y, z, w) { // sums into reg y the mul of x and reg w and clears the regs z and w
    var numX = Number(x)
    if (isNaN(numX)) { // if x is a register, get its content
      numX = this[x]
    }
    this[y] += numX * this[w]
    this[z] = 0
    this[w] = 0
    this.pc += 6
  },
  'out': function(x) { //transmits x (either an integer or the value of a register)
    var numX = Number(x)
    if (isNaN(numX)) { // if x is a register, get its content
      numX = this[x]
    }
    this.output = ''+ numX
    this.pc++
  },
  'reset': function() {
    this.program = []
    this.pc = 0
    this.a = 0
    this.b = 0
    this.c = 0
    this.d = 0
    this.output = ''
  }
}

var day25 = function() {
  for (var i = 1; i < input.length; i++) {

    var inA = 0

    for (inA = 0; inA < 100000; inA++) {
      assembunny.reset()
      assembunny.a = inA
      var prev = ''
      var trace = ''
      var timeout = 1000
      $.each(input[i].split(/\n/), function(idx, inst){
        assembunny.program.push(inst.split(/\s/))
      })
      while (assembunny.pc < assembunny.program.length && --timeout) {
        if (assembunny.pc === 1) {
          //assembunny.a
          assembunny.b = 0
          assembunny.c = 0
          assembunny.d +=2550
          assembunny.pc = 8
        } else if (assembunny.pc === 11) {
          var prevB = assembunny.b
          assembunny.a = prevB >> 1 // integer division by two
          assembunny.b = 0
          assembunny.c = prevB % 2 === 0 ? 2 : 1 // remainder
          // assembunny.d
          assembunny.pc = 20
        }
        var instr = assembunny.program[assembunny.pc]
        var operation = instr[0]
        var operatorX = instr[1]
        var operatorY = instr[2]
        var operatorZ
        var operatorW
        // execute
        assembunny[operation](operatorX, operatorY, operatorZ, operatorW)
        // console.log(assembunny.a,assembunny.b,assembunny.c,assembunny.d, operation, operatorX, operatorY)
        if (operation === 'out') {
          var next = assembunny.output
          trace += next
          if (prev === '') { // 1st time
            prev = next
          } else if ((prev === '0' && next === '1')
                    || (prev === '1' && next === '0')) {
            // console.log(prev+''+next, inA)
            prev = next
          } else {
            break
          }
        }
      }
      if (!timeout) {
        console.log('timeout:', inA, trace)
        break
      }
      if (inA % 1000 === 0) {
        console.log('log', assembunny.output, inA)
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