var puzzleInput = 'edjrjqaa'
var input = [
  'hijkl',
  'ihgpwlah',
  'kglvqrro',
  'ulqzkmiv',
  puzzleInput
]


var cloneState = function(state) {
  var newState = {
    'x': state.x,
    'y': state.y,
    'steps': state.steps,
    'path': state.path,
    'trace': []
  }
  $.each(state.trace, function(idx, pos) {
    newState.trace.push(pos)
  })
  return newState
}

var doorOpen = function(char) {
  return 'bcdef'.includes(char)
}

var generateMoves = function(st, key) {
  var moves = []

  var hash = md5(key + st.path)
  var up = hash.charAt(0)
  var down = hash.charAt(1)
  var left = hash.charAt(2)
  var right = hash.charAt(3)
  // check which way can be walked towards
  // then walk towards that direction

  if (st.x+1 < 4 // within grid
      && doorOpen(right) // door is open
      ){//&& !st.trace.includes((st.x+1)+','+(st.y))) { // not repeated
    var st2 = cloneState(st)
    st2.x++
    st2.steps++
    st2.path += 'R'
    st2.trace.push(st2.x+','+st2.y)
    moves.push(st2)
  }
  if (st.y+1 < 4
      && doorOpen(down)
      ){//&& !st.trace.includes((st.x)+','+(st.y+1))) {
    var st2 = cloneState(st)
    st2.y++
    st2.steps++
    st2.path += 'D'
    st2.trace.push(st2.x+','+st2.y)
    moves.push(st2)
  }
  if (st.x-1 >= 0
      && doorOpen(left)
      ){//&& !st.trace.includes((st.x-1)+','+(st.y))) {
    var st2 = cloneState(st)
    st2.x--
    st2.steps++
    st2.path += 'L'
    st2.trace.push(st2.x+','+st2.y)
    moves.push(st2)
  }
  if (st.y-1 >= 0
      && doorOpen(up)
      ){//&& !st.trace.includes((st.x)+','+(st.y-1))) {
    var st2 = cloneState(st)
    st2.y--
    st2.steps++
    st2.path += 'U'
    st2.trace.push(st2.x+','+st2.y)
    moves.push(st2)
  }

  return moves
}

var day17 = function() {

  for (var i = 0; i < input.length; i++) {

    /*var grid = [] // 4x4 grid
    for (var i = 0; i < grid.length; i++) {
      grid[i] = []
    }*/
    var key = input[i]

    var minSteps = Number.MAX_SAFE_INTEGER
    var minPath = ''
    var initialState = {'x': 0, 'y':0, 'steps': 0, 'path': '', 'trace': []}
    var nextStates = [initialState]
    var timeout = 1000
    while (nextStates.length > 0 && --timeout) {
      var state = nextStates.shift()
      // if the path is already longer than an existing minium, skip it
      if (minPath.length != 0 && minPath.length < state.path.length) {
        continue
      }
      // how many steps is the fewest to reach the vault 3,3
      if (state.x == 3 && state.y == 3) {
        // console.log(state.steps, state.path)
        if (state.steps < minSteps) {
          minSteps = state.steps
          minPath = state.path
        }
      } else {
        var possibleMoves = generateMoves(state, key)
        nextStates.push(...possibleMoves)
        // console.log(possibleMoves)
      }
    }
    if (!timeout) {
      console.log('timeout!')
    } else if (minPath.length == 0) {
      console.log('impossible!')
      minPath = 'impossible'
    }

    $('#day17').append(input[i])
      .append('<br>&emsp;')
      .append(minPath)
      .append('<br>')
  }
}

var md5x2017 = function(input) {
  var finalHash = input
  for (var i = 0; i < 2017; i++) {
    finalHash = md5(finalHash)
  }
  return finalHash
}

var day17part2 = function() {
  for (var i = 0; i < input.length; i++) {

    $('#day17part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day17"><h2>day #17</h2></div>')
  day17()
  $('#main').append('<br><div id="day17part2"><h2>day #17 part 2</h2></div>')
  day17part2()
  $('#main').append('<br>')
})

