
var input = [
  'rect 3x2',
  'rect 3x2\nrotate column x=1 by 1',
  'rect 3x2\nrotate column x=1 by 5',
  'rect 3x2\nrotate row y=0 by 4',
`rect 3x2
rotate column x=1 by 1
rotate row y=0 by 4
rotate column x=1 by 4`,
`rect 3x2
rotate column x=1 by 1
rect 3x2`,
 puzzleInput
 ]

 var day8 = function() {

  var printScreen = function (screen) {
    var screenStr = ''
    for (var i = 0; i < 6; i++) {
      for (var j = 0; j < 50; j++) {
        screenStr += screen[j][i]
      }
      screenStr += '\n'
    }
    console.log(screenStr)
  }

  var drawRect = function (screen, w, h) {
    for (var i = 0; i < w; i++) {
      for (var j = 0; j < h; j++) {
        screen[i][j] = '#'
      }
    }
  }
  var rotateColumn = function (screen, col, delta) {
    //arr.push(arr.shift())
    while(delta--) screen[col].unshift(screen[col].pop())
  }
  var rotateRow = function (screen, row, delta) {
    while(delta--) {
      var lastVal = screen[screen.length-1][row]
      for (var i = screen.length - 1; i >= 1; i--) {
        screen[i][row] = screen[i-1][row]
      }
      screen[0][row] = lastVal
    }
  }

  for (var i = 0; i < input.length; i++) {
    var screen = []
    var width = 50
    while (width--) {
      var height = 6
      screen[width] = []
      while (height--)
      screen[width][height] = '.'
    }

    var commands = input[i].split(/\n/)
    for (var j = 0; j < commands.length; j++) {
      var com = commands[j].split(/\s/)
      if (com[0] == 'rect') {
        var size = com[1].split('x')
        drawRect(screen, size[0], size[1])
      } else {
        if (com[1] == 'column') {
          var col = com[2].split('=')[1]
          var delta = com[4]
          rotateColumn(screen, col, delta % 6)
        } else {
          var row = com[2].split('=')[1]
          var delta = com[4]
          rotateRow(screen, row, delta % 50)
        }
      }
    }

    //printScreen(screen)

    var litPixels = 0
    litPixels = screen.reduce(function (accum, val) {
      return accum + val.reduce(function (accum2, val2) {
        return val2 == '#' ? accum2 + 1 : accum2
      }, 0)
    }, 0)
    $('#day8').append(input[i])
      .append('<br>&emsp;')
      .append(litPixels)
      .append('<br>')
  }
}

var day8part2 = function() {

  for (var i = 0; i < input.length; i++) {
    var sslCount = 0

    $('#day8part2').append(input[i])
      .append('<br>&emsp;')
      .append(sslCount)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day8"><h2>day #8</h2></div>')
  day8()
  $('#main').append('<br><div id="day8part2"><h2>day #8 part 2</h2></div>')
  day8part2()
  $('#main').append('<br>')
})