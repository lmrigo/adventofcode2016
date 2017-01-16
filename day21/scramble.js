var input = [
  ['abcde', 'swap position 4 with position 0'],
  ['abcde', 'rotate right 3 steps'],
  ['abcde', 'reverse positions 1 through 3'],
  ['abcde',
`swap position 4 with position 0
swap letter d with letter b
reverse positions 0 through 4
rotate left 1 step
move position 1 to position 4
move position 3 to position 0
rotate based on position of letter b
rotate based on position of letter d`],
  ['abcdefgh', 'rotate based on position of letter g'],
  // ['abcdefgh', puzzleInput] //not fchbgdae, gfecdhba, fegdhcab :( | it's baecdfgh :)
  ['fbgdceah', puzzleInput] //part 2
]

String.prototype.replaceAt=function(index, char) {
    var a = this.split('')
    a[index] = char
    return a.join('')
}

var swapPos = function (str, x, y) {
  var aux = str.charAt(Number(x))
  str = str.replaceAt(Number(x), str.charAt(Number(y)))
  str = str.replaceAt(Number(y), aux)
  return str
}

var swapLetter = function (str, x, y) {
  var rex = new RegExp(x, 'g')
  str = str.replace(rex, '$')
  var rey = new RegExp(y, 'g')
  str = str.replace(rey, '#')

  str = str.replace(/\$/g, y)
  str = str.replace(/#/g, x)
  return str
}

var rotateLeft = function (str, steps) {
  while (steps-- > 0) {
    str = str.substr(1) + str.charAt(0)
  }
  return str
}

var rotateRight = function (str, steps) {
  while (steps-- > 0) {
    str = str.charAt(str.length-1) + str.substr(0, str.length-1)
  }
  return str
}

// inneficient
var rotateBasedOnPos = function (str, x) {
  var idx = str.indexOf(x)
  if (idx >= 4) {
    idx++
  }
  idx++
  str = rotateRight(str, idx)
  return str
}

var unrotateBasedOnPos = function (str, x) {
  var idx = str.indexOf(x)
  switch (idx) {
    case 1:/*0*/ str = rotateLeft(str, 1); break;
    case 3:/*1*/ str = rotateLeft(str, 2); break;
    case 5:/*2*/ str = rotateLeft(str, 3); break;
    case 7:/*3*/ str = rotateLeft(str, 4); break;
    case 2:/*4*/ str = rotateRight(str, 2); break;
    case 4:/*5*/ str = rotateRight(str, 1); break;
    case 6:/*6*/ break;
    case 0:/*7*/ str = rotateLeft(str, 1); break;
  }
  return str
}

var reverse = function (s) {
  for (var i = s.length - 1, o = ''; i >= 0; o += s[i--]) { }
  return o;
}

var reversePositions = function (str, x, y) {
  var prefix = str.substr(0, Number(x))
  var suffix = str.substr(Number(y)+1)
  var reversed = reverse(str.substr(Number(x), Number(y)+1-Number(x)))
  return prefix + reversed + suffix
}

var movePos = function (str, x, y) {
  var arr = str.split('')
  var aux = arr.splice(Number(x), 1)
  arr.splice(Number(y), 0, aux)
  return arr.join('')
}

var day21 = function() {
  for (var i = 0; i < input.length; i++) {
    var base = input[i][0]
    var commands = input[i][1].split(/\n/)
    for (var j = 0; j < commands.length; j++) {
      var cmd = commands[j].split(/\s/)
      if (cmd[0] === 'swap') {
        if (cmd[1] === 'position') {
          base = swapPos(base, cmd[2], cmd[5])
        } else { // letter
          base = swapLetter(base, cmd[2], cmd[5])
        }
      } else if (cmd[0] === 'rotate') {
        if (cmd[1] === 'left') {
          base = rotateLeft(base, cmd[2])
        } else if (cmd[1] === 'right') {
          base = rotateRight(base, cmd[2])
        } else { // based on pos
          base = rotateBasedOnPos(base, cmd[6])
        }
      } else if (cmd[0] === 'reverse') {
        base = reversePositions(base, cmd[2], cmd[4])
      } else if (cmd[0] === 'move') {
        base = movePos(base, cmd[2], cmd[5])
      }
      // if(base.length > 'abcdefgh'.length) {
      //   console.log(cmd)
      // }
    }
    // console.log(base)
    $('#day21').append(input[i])
      .append('<br>&emsp;')
      .append(base)
      .append('<br>')
  }

}

var day21part2 = function() {

  for (var i = 0; i < input.length; i++) {
    // unscramble
    var base = input[i][0]
    var commands = input[i][1].split(/\n/)
    for (var j = commands.length-1; j >= 0; --j) {
      var cmd = commands[j].split(/\s/)
      if (cmd[0] === 'swap') {
        if (cmd[1] === 'position') {
          base = swapPos(base, cmd[5], cmd[2])
        } else { // letter
          base = swapLetter(base, cmd[5], cmd[2])
        }
      } else if (cmd[0] === 'rotate') {
        if (cmd[1] === 'left') {
          base = rotateRight(base, cmd[2])
        } else if (cmd[1] === 'right') {
          base = rotateLeft(base, cmd[2])
        } else { // based on pos
          base = unrotateBasedOnPos(base, cmd[6])
        }
      } else if (cmd[0] === 'reverse') {
        base = reversePositions(base, cmd[2], cmd[4])
      } else if (cmd[0] === 'move') {
        base = movePos(base, cmd[5], cmd[2])
      }
    }

    $('#day21part2').append(input[i])
      .append('<br>&emsp;')
      .append(base)
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day21"><h2>day #21</h2></div>')
  day21()
  $('#main').append('<br><div id="day21part2"><h2>day #21 part 2</h2></div>')
  day21part2()
  $('#main').append('<br>')
})

/* unrotate based map
  0
0 abcdefgh
1 habcdefg 1
   1
1 abcdefgh
3 ghabcdef 2
     2
2 abcdefgh
5 fghabcde 3
     3
3 abcdefgh
7 efghabcd 4
      4
4 abcdefgh
2 cdefghab 6
       5
5 abcdefgh
4 bcdefgha 7
        6
6 abcdefgh
6 abcdefgh 8
         7
7 abcdefgh
0 habcdefg 9
*/
