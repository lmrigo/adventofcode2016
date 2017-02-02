var input = [
`cpy 2 a
tgl a
tgl a
tgl a
cpy 1 a
dec a
dec a`, // tgl test
`cpy 5 a
cpy 7 b
cpy 0 c
cpy b c
inc a
dec c
jnz c -2`, // sum a + b
`cpy 5 a
cpy 7 b
cpy 0 c
cpy 0 d
cpy a d
cpy 0 a
cpy b c
inc a
dec c
jnz c -2
dec d
jnz d -5`, // mul a * b
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
      program: [],
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
      'mul': function(x, y, z, w) { // sums into reg y the mul of x and reg w and clears the other reg z and w
        var numX = Number(x)
        if (isNaN(numX)) { // if x is a register, get its content
          numX = this[x]
        }
        this[y] += numX * this[w]
        this[z] = 0
        this[w] = 0
        this.pc += 6
      }
    }

    if (i === 3) { // puzzleInput
      assembunny.a = 12 // part 2
    }

    var timeout = 100000//000000 //100.000.000.000
    $.each(input[i].split(/\n/), function(idx, inst){
      assembunny.program.push(inst.split(/\s/))
    })
    while (assembunny.pc < assembunny.program.length && --timeout) {
      if (timeout % 100000000 === 0) {
        console.log(assembunny.pc, timeout)
      }
      var instr = assembunny.program[assembunny.pc]
      var operation = instr[0]
      var operatorX = instr[1]
      var operatorY = instr[2]
      var operatorZ
      var operatorW
      if (instr[0] === 'inc') { // check if it is a sum  //inc a
        var instr1 = assembunny.program[assembunny.pc+1] //dec c
        var instr2 = assembunny.program[assembunny.pc+2] //jnz c -2
        if (instr1 && instr1[0] === 'dec'
          && instr2 && instr2[0] === 'jnz' && instr2[2] === '-2'
          && instr1[1] === instr2[1]) {
          operation = 'sum'
          operatorX = instr[1]
          operatorY = instr1[1]
        }
      } else if (instr[0] === 'cpy') { // check if multi   //cpy b c
          var instr1 = assembunny.program[assembunny.pc+1] //inc a
          var instr2 = assembunny.program[assembunny.pc+2] //dec c
          var instr3 = assembunny.program[assembunny.pc+3] //jnz c -2
          var instr4 = assembunny.program[assembunny.pc+4] //dec d
          var instr5 = assembunny.program[assembunny.pc+5] //jnz d -5
          if (instr1 && instr1[0] === 'inc'
            && instr2 && instr2[0] === 'dec'
            && instr3 && instr3[0] === 'jnz' && instr3[2] === '-2'
            && instr2[1] === instr3[1]
            && instr[2] === instr2[1]
            && instr4 && instr4[0] === 'dec'
            && instr5 && instr5[0] === 'jnz' && instr5[2] === '-5'
            && instr4[1] === instr5[1]) {
          operation = 'mul'
          operatorX = instr[1]  // val
          operatorY = instr1[1] // dest reg
          operatorZ = instr[2] // aux reg
          operatorW = instr4[1] // val2 reg
        }
      }
      // execute
      assembunny[operation](operatorX, operatorY, operatorZ, operatorW)
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