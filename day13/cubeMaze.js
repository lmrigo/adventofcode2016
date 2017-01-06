
var puzzleInput = 1364
var input = [
  10,
  puzzleInput
 ]

var preCalc = function(x, y) {
  return x*x + 3*x + 2*x*y + y + y*y
}

var printMap = function(map) {
  var mapStr = '  '
  var maxX = map.length
  var maxY = map[0].length
  for (var i = 0; i < maxX; i++) {
    mapStr += i % 10
  }
  mapStr += '\n'
  for (var y = 0; y < maxY; y++) {
    var row = y % 10 +' '
      for (var x = 0; x < maxX; x++) {
        row += map[x][y]
    }
    mapStr += row + '\n'
  }
  console.log(mapStr)
}

var cloneState = function(state) {
  var newState = {
    'x': state.x,
    'y': state.y,
    'steps': state.steps,
    'trace': []
  }
  $.each(state.trace, function(idx, pos) {
    newState.trace.push(pos)
  })
  return newState
}

var generateMoves = function(st) {
  var moves = []

  if (st.x+1 < map.length // within maze
      && map[st.x+1][st.y] != '#' // not a wall
      && !st.trace.includes((st.x+1)+','+(st.y))) { // not repeated
    var st2 = cloneState(st)
    st2.x++
    st2.steps++
    st2.trace.push(st2.x+','+st2.y)
    moves.push(st2)
  }
  if (st.y+1 < map[st.x].length
      && map[st.x][st.y+1] != '#'
      && !st.trace.includes((st.x)+','+(st.y+1))) {
    var st2 = cloneState(st)
    st2.y++
    st2.steps++
    st2.trace.push(st2.x+','+st2.y)
    moves.push(st2)
  }
  if (st.x-1 >= 0
      && map[st.x-1][st.y] != '#'
      && !st.trace.includes((st.x-1)+','+(st.y))) {
    var st2 = cloneState(st)
    st2.x--
    st2.steps++
    st2.trace.push(st2.x+','+st2.y)
    moves.push(st2)
  }
  if (st.y-1 >= 0
      && map[st.x][st.y-1] != '#'
      && !st.trace.includes((st.x)+','+(st.y-1))) {
    var st2 = cloneState(st)
    st2.y--
    st2.steps++
    st2.trace.push(st2.x+','+st2.y)
    moves.push(st2)
  }

  return moves
}

/*var isValidState = function(state) {
  return state.x < map.length && state.y < map[0].length
}*/

/*var isRepeatedState = function(state) {
  return !state.
}*/
var map = []
var day13 = function() {

  for (var i = 0; i < input.length; i++) {

    // increase these values as required
    var maxX = 60
    var maxY = 60

    map = [] // reset map
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

    // printMap(map)
    // after the table is complete, find a way to calculate the steps to get there
    // start at 1,1
    var x = 1
    var y = 1

    var minSteps74 = Number.MAX_SAFE_INTEGER
    var minSteps3139 = Number.MAX_SAFE_INTEGER

    var initialState = {'x': 1, 'y':1, 'steps': 0, 'trace': []}
    var nextStates = [initialState]
    var timeout = 100000
    while (nextStates.length > 0 && --timeout) {
      var state = nextStates.shift()
      if (state.x == 7 && state.y == 4) { // how many steps is the fewest to reach 7,4
        // console.log('7,4', state.steps)
        minSteps74 = state.steps < minSteps74 ? state.steps : minSteps74
      } else if (state.x == 31 && state.y == 39) { // how many steps is the fewest to reach 31,39
        // console.log('31,39', state.steps)
        minSteps3139 = state.steps < minSteps3139 ? state.steps : minSteps3139
        break
      } else {
        var possibleMoves = generateMoves(state)
        nextStates.push(...possibleMoves)
        // console.log(possibleMoves)
      }
    }
    if (!timeout) {
      console.log('timeout!')
    }

    $('#day13').append(input[i])
      .append('<br>&emsp;')
      .append('7,4: ' + minSteps74)
      .append('<br>&emsp;')
      .append('31,39: ' + minSteps3139)
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
