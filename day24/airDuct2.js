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
  puzzleInput // 4216/7739 spaces/walls
  //570, 542, 538 too high. Not 494
  // <496 -  <764
]
var grid

var day24 = function() {
  // for (var i = 0; i < input.length; i++) {
  for (var i = 2; i < input.length; i++) {

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

    // 1st try: loop -> always find the nearest
    // 2nd try: find distances for all pairs of numbers then find the shortest distances combination
    // gen pairs
    var pairs = []
    for (var ni = 0; ni < numbers.length; ni++) {
      for (var nj = ni+1; nj < numbers.length; nj++) {
        pairs.push([ni, nj, Number.MAX_SAFE_INTEGER])
      }
    }
    // console.log(pairs)

    pairs[0][2] = 30  // 0>1=30  //min
    pairs[1][2] = 258 // 0>2=258 //min
    pairs[2][2] = 56  // 0>3=56  //min
    pairs[3][2] = 214 // 0>4=214 //min
    pairs[4][2] = 260 // 0>5=260 //min
    pairs[5][2] = 106 // 0>6=106 //min
    pairs[6][2] = 44  // 0>7=44  //min
    pairs[7][2] = 232 // 1>2=232 //min
    pairs[8][2] = 30  // 1>3=30  //min
    pairs[9][2] = 188 // 1>4=188 //min
    pairs[10][2] = 230// 1>5=230 //min verificar 234
    pairs[11][2] = 80 // 1>6=80  //min
    pairs[12][2] = 54 // 1>7=54  //min
    pairs[13][2] = 218// 2>3=218 //min
    pairs[14][2] = 56 // 2>4=56  //min
    pairs[15][2] = 74 // 2>5=74  //min
    pairs[16][2] = 212// 2>6=212 //min
    pairs[17][2] = 278// 2>7=278 //min
    pairs[18][2] = 174// 3>4=174 //min
    pairs[19][2] = 216// 3>5=216 //min verificar 220
    pairs[20][2] = 66 // 3>6=66  //min
    pairs[21][2] = 80 // 3>7=80  //min
    pairs[22][2] = 54 // 4>5=54  //min
    pairs[23][2] = 168// 4>6=168 //min
    pairs[24][2] = 234// 4>7=234 //min
    pairs[25][2] = 214// 5>6=214 //min
    pairs[26][2] = 340// 5>7=340 //min
    pairs[27][2] = 126// 6>7=126 //min

    // find each pair distance
    for (var p = 0; p < pairs.length; p++) {
    // for (var p = pairs.length - 3; p >= 0; p--) {
      var src = pairs[p][0]
      var dst = pairs[p][1]
      // var initialState = {'x': numbers[src].x, 'y':numbers[src].y, 'steps': 0, 'trace': []}
      var initialState = {'x': numbers[src].x, 'y':numbers[src].y, 'steps': 0, 'trace': ''}
      var history = []
      var nextStates = [initialState]
      var timeout = 1000000000
      // console.log('===='+src+'>'+dst+':'+pairs[p][2]+'====')
      while (nextStates.length > 0 && --timeout) {
        var state = nextStates.pop()
        // var state = nextStates.shift()
        if (history[state.x] === undefined) { // record how many steps to this point
          history[state.x] = []
        }
        if (history[state.x][state.y] === undefined) {
          history[state.x][state.y] = state.steps
        }
        if ( (history[state.x][state.y] < state.steps) // drop paths longer than history
            ) {
          continue
        }
        if (timeout % 10000000 === 0) {
          console.log('('+state.x+','+state.y+')',state.steps, src+'>'+dst, nextStates.length, timeout)
        }
        if (state.x === numbers[dst].x && state.y === numbers[dst].y) {
          pairs[p][2] = state.steps < pairs[p][2] ? state.steps : pairs[p][2]
          console.log(state.trace, state.steps)
        } else {
          if (grid[state.x][state.y] !== '.') { // it's another number
            var match = pairs.find(function (elem) {
              return elem[0] == grid[state.x][state.y]
            })
            if (match) { // check transitivity
              var mSrc = match[0]
              var mDst = match[1]
              if ((src != mSrc && src != mDst) // doesn't point to current start node
                && (dst == mSrc || dst == mDst) // points to current dest node
                && match[2] < Number.MAX_SAFE_INTEGER) {
                var possibleMinSteps = state.steps + match[2]
                if (possibleMinSteps < pairs[p][2]) {
                  console.log(pairs[p], match, possibleMinSteps)
                  pairs[p][2] = possibleMinSteps
                }
              }
            }
          }
          // nextStates.push(...generateMoves(state))
          var genMoves = []
          $.each(generateMoves(state), function(idx, gm) {
            if (gm.steps < pairs[p][2]) { // drop paths longer than already found
              var remSteps = pairs[p][2] - gm.steps
              var currentToDest = (Math.abs(numbers[dst].x - gm.x) +
                                    Math.abs(numbers[dst].y - gm.y))
              if (remSteps >= currentToDest) { // drop paths with not enough steps
                genMoves.push(gm)
              }
            }
          })
          nextStates.push(...genMoves)
        }
      }
      if (!timeout) {
        console.log('timeout!')
      }
    }
    // printPairs(pairs)

    var minPathSum = Number.MAX_SAFE_INTEGER

    var initialPath = {'path': [0], 'sum': 0}
    var nextPaths = [initialPath]
    var timeout = 100000000
    while (nextPaths.length > 0) {
      var path = nextPaths.shift()
      if (path.sum >= minPathSum) {
        continue
      }
      if (path.path.length === numbers.length) {
        var str = ''
        for (var x = 0; x < path.path.length; x++) {
          str += path.path[x]
        }
        if(path.sum < minPathSum) {
          minPathSum = path.sum < minPathSum ? path.sum : minPathSum
          // console.log(str, path.sum)
        }
      } else {
        nextPaths.push(...generateNextPaths(path, pairs, numbers.length))
      }
    }
    //07136452
    // console.log(minPathSum)

    $('#day24').append(input[i])
      .append('<br>&emsp;')
      .append(minPathSum)
      .append('<br>')
  }
}


var generateNextPaths = function (p, pairs, numsLen) {
  var newPaths = []
  for (var n = 1; n < numsLen; n++) {
    var np = copyPath(p)
    if (!np.path.includes(n)) {
      np.sum += getEdge(np.path[np.path.length-1], n, pairs)
      np.path.push(n)
      newPaths.push(np)
    }
  }
  return newPaths
}

var copyPath = function (p) {
  var newP = {
    'path': [],
    'sum': p.sum
  }
  $.each(p.path, function(idx, num) {
    newP.path.push(num)
  })
  return newP
}

var getEdge = function(v1, v2, pairs) {
  var val = Number.MAX_SAFE_INTEGER
  for (var p = 0; p < pairs.length; p++) {
    if ((pairs[p][0] == v1 && pairs[p][1] == v2)
        || (pairs[p][0] == v2 && pairs[p][1] == v1)) {
      val = pairs[p][2]
      break
    }
  }
  return val
}


var printPairs = function(pairs) {
  var str = ''
  $.each(pairs, function(idx, p) {
    str += p[0] +'>'+ p[1] + '=' + p[2] + '\n'
  })
  console.log(str)
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
    'steps': state.steps,
    // 'trace': []
    'trace': state.trace
  }
  // refactor trace to a string
  // $.each(state.trace, function(idx, pos) {
  //   newState.trace.push(pos)
  // })
  return newState
}

var directions = [
  function(state){state.y--;},
  function(state){state.y++;},
  function(state){state.x--;},
  function(state){state.x++;}
]
var generateMoves = function(st) {
  var moves = []
  $.each(directions, function(idx, dirFun) {
    var newState = cloneState(st)
    dirFun(newState)
    if(isValid(newState)) {
      newState.steps++
      // newState.trace.push(genTrace(newState))
      newState.trace += genTrace(newState)
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
  return ':'+st.x+','+st.y
}

var day24part2 = function() {

  for (var i = 2; i < input.length; i++) {

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

    // 1st try: loop -> always find the nearest
    // 2nd try: find distances for all pairs of numbers then find the shortest distances combination
    // gen pairs
    var pairs = []
    for (var ni = 0; ni < numbers.length; ni++) {
      for (var nj = ni+1; nj < numbers.length; nj++) {
        pairs.push([ni, nj, Number.MAX_SAFE_INTEGER])
      }
    }
    // console.log(pairs)

    pairs[0][2] = 30  // 0>1=30  //min
    pairs[1][2] = 258 // 0>2=258 //min
    pairs[2][2] = 56  // 0>3=56  //min
    pairs[3][2] = 214 // 0>4=214 //min
    pairs[4][2] = 260 // 0>5=260 //min
    pairs[5][2] = 106 // 0>6=106 //min
    pairs[6][2] = 44  // 0>7=44  //min
    pairs[7][2] = 232 // 1>2=232 //min
    pairs[8][2] = 30  // 1>3=30  //min
    pairs[9][2] = 188 // 1>4=188 //min
    pairs[10][2] = 230// 1>5=230 //min verificar 234
    pairs[11][2] = 80 // 1>6=80  //min
    pairs[12][2] = 54 // 1>7=54  //min
    pairs[13][2] = 218// 2>3=218 //min
    pairs[14][2] = 56 // 2>4=56  //min
    pairs[15][2] = 74 // 2>5=74  //min
    pairs[16][2] = 212// 2>6=212 //min
    pairs[17][2] = 278// 2>7=278 //min
    pairs[18][2] = 174// 3>4=174 //min
    pairs[19][2] = 216// 3>5=216 //min verificar 220
    pairs[20][2] = 66 // 3>6=66  //min
    pairs[21][2] = 80 // 3>7=80  //min
    pairs[22][2] = 54 // 4>5=54  //min
    pairs[23][2] = 168// 4>6=168 //min
    pairs[24][2] = 234// 4>7=234 //min
    pairs[25][2] = 214// 5>6=214 //min
    pairs[26][2] = 340// 5>7=340 //min
    pairs[27][2] = 126// 6>7=126 //min

    var minPathSum = Number.MAX_SAFE_INTEGER

    var initialPath = {'path': [0], 'sum': 0}
    var nextPaths = [initialPath]
    var timeout = 100000000
    while (nextPaths.length > 0) {
      var path = nextPaths.shift()
      if (path.sum >= minPathSum) {
        continue
      }
      if (path.path.length === numbers.length) {
        var str = ''
        for (var x = 0; x < path.path.length; x++) {
          str += path.path[x]
        }
        str += '0' //return back to 0
        path.sum += getEdge(path.path[numbers.length-1], 0, pairs)
        if(path.sum < minPathSum) {
          minPathSum = path.sum < minPathSum ? path.sum : minPathSum
          // console.log(str, path.sum)
        }
      } else {
        nextPaths.push(...generateNextPaths(path, pairs, numbers.length))
      }
    }
    // 013254670
    // console.log(minPathSum)

    $('#day24part2').append(input[i])
      .append('<br>&emsp;')
      .append(minPathSum)
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