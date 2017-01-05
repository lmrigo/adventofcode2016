
var puzzleInput = 1364
var input = [
  10,
  puzzleInput
 ]

var preCalc = function(x, y) {
  return x*x + 3*x + 2*x*y + y + y*y
}

var printMap = function(map) {
  var mapStr = ''
  for (var x = 0; x < map.length; x++) {
    var row = ''
    for (var y = 0; y < map[x].length; y++) {
        row += map[x][y]
    }
    mapStr += row + '\n'
  }
  console.log(mapStr)
}

var day13 = function() {

  for (var i = 0; i < input.length; i++) {
    var steps = 0

    // increase these values as required
    var maxX = 10
    var maxY = 10

    var map = []
    // prepare data
    // iterate over the positions
    for (var x = 0; x < maxX; x++) {
      map[x] = []
      for (var y = 0; y < maxY; y++) {
        var pos = preCalc(x, y)
        var posNum = pos + input[i]
        var onesCount = posNum.toString(2).replace(/0/g,'').length
        if (onesCount % 2 === 0) { // is even, an open space
          map[x][y] = '.'
        } else { // is odd, a wall
          map[x][y] = '#'
        }
      }
    }

    printMap(map)

    // after the table is complete, find a way to calculate the steps to get there
    // how many steps is the fewest to reach 7,4
    // how many steps is the fewest to reach 31,39

    $('#day13').append(input[i])
      .append('<br>&emsp;')
      .append(steps)
      .append('<br>')
  }
}

var day13part2 = function() {

  for (var i = 0; i < input.length; i++) {

    $('#day13part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day13"><h2>day #13</h2></div>')
  day13()
  $('#main').append('<br><div id="day13part2"><h2>day #13 part 2</h2></div>')
  day13part2()
  $('#main').append('<br>')
})
