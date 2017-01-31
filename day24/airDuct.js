var input = [
`########
#0.1.2#
#.##.3#
#######`,
`###########
#0.1.....2#
#.#######.#
#4.......3#
###########`,
  puzzleInput
]
var grid

var day24 = function() {
  for (var i = 0; i < input.length; i++) {

    // build the grid
    grid = []
    var lines = input[i].split(/\n/)
    for (var x = 0; x < lines.length; x++) {
      var line = lines[x].split('')
      grid[x] = []
      for (var y = 0; y < line.length; y++) {
        grid[x][y] = line[y]
      }
    }
    // printGrid(grid)

    // find (map) the numbers
    var numbers = {}

    for (var gi = 0; gi < grid.length; gi++) {
      for (var gj = 0; gj < grid[gi].length; gj++) {
        if (grid[gi][gj] !== '#' && grid[gi][gj] !== '.') {
          numbers[grid[gi][gj]] = {}
          numbers[grid[gi][gj]].x = gi
          numbers[grid[gi][gj]].y = gj
        }
      }
    }
    numbers.length = Object.keys(numbers).length
    // console.log(numbers)


    var minSteps = Number.MAX_SAFE_INTEGER
    // 1st try: loop -> always find the nearest
    // 2nd try: find distances for all pairs of numbers then find the shortest distances combination

    var initialState = {'x': numbers['0'].x, 'y':numbers['0'].y, 'numsFound': '0', 'steps': 0, 'trace': []}
    var nextStates = [initialState]
    var timeout = 100000000
    while (nextStates.length > 0 && --timeout) {
      // var state = nextStates.shift()
      var state = nextStates.pop()
      if (state.steps >= minSteps) {
        continue
      }
      if (timeout % 100000 === 0) {
        console.log('('+state.x+','+state.y+')',state.steps,state.numsFound)
      }
      if (state.numsFound.length === numbers.length) {
        minSteps = state.steps < minSteps ? state.steps : minSteps
        console.log(state.trace)
      } else {
        nextStates.push(...generateMoves(state))
      }
    }
    if (!timeout) {
      console.log('timeout!')
    }


    $('#day24').append(input[i])
      .append('<br>&emsp;')
      .append(minSteps)
      .append('<br>')
  }
}

var printGrid = function (grid) {
  var cols = grid[0].length
  var rows = grid.length
  var str = ''
  for (var r = 0; r < rows; r++) {
    for (var c = 0; c < cols; c++) {
      str += grid[r][c]
    }
    str += '\n'
  }
  console.log(str)
}

var cloneState = function(state) {
  var newState = {
    'x': state.x,
    'y': state.y,
    'numsFound': state.numsFound,
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
  var directions = [
    function(state){state.x++;},
    function(state){state.x--;},
    function(state){state.y++;},
    function(state){state.y--;}]
  $.each(directions, function(idx, dirFun) {
    var newState = cloneState(st)
    dirFun(newState)
    if(isValid(newState)) {
      newState.steps++
      var stepChar = grid[newState.x][newState.y]
      if (stepChar !== '.' && !newState.numsFound.includes(stepChar)) { // it's a new number
        newState.numsFound += stepChar
      }
      newState.trace.push(genTrace(newState))
      moves.push(newState)
    }
  })
  return moves
}

var isValid = function(st) {
  return (0 <= st.x && st.x < grid.length) // within maze
      && (0 <= st.y && st.y < grid[st.x].length)
      && (grid[st.x][st.y] !== '#') // not a wall
      && (!st.trace.includes(genTrace(st))) // not repeated step
}

var genTrace = function(st) {
  return st.x+','+st.y+'|'+st.numsFound
}

var day24part2 = function() {

  for (var i = 0; i < input.length; i++) {


    $('#day24part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day24"><h2>day #24</h2></div>')
  day24()
  $('#main').append('<br><div id="day24part2"><h2>day #24 part 2</h2></div>')
  day24part2()
  $('#main').append('<br>')
})