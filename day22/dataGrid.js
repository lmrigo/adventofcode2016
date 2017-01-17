var input = [
`root@ebhq-gridcenter# df -h
Filesystem            Size  Used  Avail  Use%
/dev/grid/node-x0-y0   10T    8T     2T   80%
/dev/grid/node-x0-y1   11T    6T     5T   54%
/dev/grid/node-x0-y2   32T   28T     4T   87%
/dev/grid/node-x1-y0    9T    7T     2T   77%
/dev/grid/node-x1-y1    8T    0T     8T    0%
/dev/grid/node-x1-y2   11T    7T     4T   63%
/dev/grid/node-x2-y0   10T    6T     4T   60%
/dev/grid/node-x2-y1    9T    8T     1T   88%
/dev/grid/node-x2-y2    9T    6T     3T   66%`,
  puzzleInput
]

function Node(x, y, size, used, avail, usePct, target) {
  this.x = x
  this.y = y
  this.size = size
  this.used = used
  this.avail = avail
  this.usePct = usePct
  this.target = target
  this.canTransferData = function (other) {
    return this.used <= other.avail
  }
  this.clone = function () {
    return new Node(this.x, this.y, this.size, this.used, this.avail, this.usePct, this.target)
  }
}

var numVal = function (sz) {
  return Number(sz.replace('T', ''))
}

var pctVal = function (pct) {
  return Number(pct.replace('%', '')) / 100.0
}

var day22 = function() {
  for (var i = 0; i < input.length; i++) {

    var nodes = []

    var lines = input[i].split(/\n/)
    // skip 0 and 1
    for (var l = 2; l < lines.length; l++) {
      var nodeArr = lines[l].split(/\s+/)
      // console.log(nodeArr)
      var pos = nodeArr[0].split(/-/)
      var x = Number(pos[1].substr(1))
      var y = Number(pos[2].substr(1))
      var n = new Node(x, y, numVal(nodeArr[1]), numVal(nodeArr[2]), numVal(nodeArr[3]), pctVal(nodeArr[4]))
      if (nodes[x] === undefined) {
        nodes[x] = []
      }
      nodes[x][y] = n
    }
    // console.log(nodes)
    var viablePairs = 0
    for (var ni = 0; ni < nodes.length; ni++) {
      // console.log(ni, viablePairs)
      for (var nj = 0; nj < nodes[ni].length; nj++) {
        var a = nodes[ni][nj]
        for (var nk = 0; nk < nodes.length; nk++) {
          for (var nl = 0; nl < nodes[nk].length; nl++) {
            var b = nodes[nk][nl]
            if (a.used > 0
                && a !== b
                // && a.used <= b.avail) {
                && a.canTransferData(b)) {
              viablePairs++
            }
          }
        }
      }
    }

    $('#day22').append(input[i])
      .append('<br>&emsp;')
      .append(viablePairs)
      .append('<br>')
  }
}

var printNodes = function (nodes) {
  var cols = nodes[0].length
  var str = ''
  for (var nj = 0; nj < cols; nj++) {
    for (var ni = 0; ni < nodes.length; ni++) {
      str += nodes[ni][nj].usePct > 0.7 ? '.' : '_'
    }
    str += '\n'
  }
  console.log(str)
}

var createStateId = function (nodes) {
  var cols = nodes[0].length
  var id = []
  for (var nj = 0; nj < cols; nj++) {
    var line = []
    for (var ni = 0; ni < nodes.length; ni++) {
      var n = nodes[ni][nj]
      // line.push('(',n.x,',',n.y,')[',n.used,'|',n.avail,']')
      // line.push('[',n.used,'|',n.avail,']')
      line.push(n.avail,'|') //TODO: try to reduce memory consumption
      if (n.target) {
        line.push('*')
      }
    }
    id.push(line.join(''))
  }
  return id.join('\n')
}

var isFinalState = function (st) {
  return st.nodes[0][0].target
}

var passedStates = []
var isRepeatedState = function (id) {
  var repeated = passedStates.includes(id)
  if (!repeated) {
    passedStates.push(id)
  }
  return repeated
}

var cloneState = function (st) {
  var cloned = {
    'nodes': [],
    'steps': st.steps,
    'id': st.id
  }
  for (var ni = 0; ni < st.nodes.length; ni++) {
    cloned.nodes[ni] = []
    for (var nj = 0; nj < st.nodes[ni].length; nj++) {
      cloned.nodes[ni][nj] = st.nodes[ni][nj].clone()
    }
  }
  return cloned
}

// percents don't need to be updated
var moveState = function (st, x1, y1, x2, y2) {
  var sourceData = st.nodes[x1][y1].used
  st.nodes[x1][y1].used = 0
  st.nodes[x1][y1].avail = st.nodes[x1][y1].size
  st.nodes[x1][y1].usePct = 0
  if (st.nodes[x1][y1].target) {
    st.nodes[x1][y1].target = false
    st.nodes[x2][y2].target = true
  }
  st.nodes[x2][y2].used += sourceData
  st.nodes[x2][y2].avail -= sourceData
  st.nodes[x2][y2].usePct = (st.nodes[x2][y2].used / st.nodes[x2][y2].size) / 100.0

  st.steps++

  st.id = createStateId(st.nodes)
}

var generateMoves = function (st) {
  var generatedStates = []
  for (var ni = 0; ni < st.nodes.length; ni++) {
    for (var nj = 0; nj < st.nodes[ni].length; nj++) {
      // check the four neighbours: ni+1, ni-1, nj+1, nj-1
      var n = st.nodes[ni][nj]
      if (ni < st.nodes.length-1
          && n.canTransferData(st.nodes[ni+1][nj])) {
        var newState = cloneState(st)
        moveState(newState, ni, nj, ni+1, nj)
        if (newState.steps < minSteps && !isRepeatedState(newState.id)) {
          generatedStates.push(newState)
        }
      }
      if (ni > 0
          && n.canTransferData(st.nodes[ni-1][nj])) {
        var newState = cloneState(st)
        moveState(newState, ni, nj, ni-1, nj)
        if (newState.steps < minSteps && !isRepeatedState(newState.id)) {
          generatedStates.push(newState)
        }
      }
      if (nj < st.nodes[ni].length-1
          && n.canTransferData(st.nodes[ni][nj+1])) {
        var newState = cloneState(st)
        moveState(newState, ni, nj, ni, nj+1)
        if (newState.steps < minSteps && !isRepeatedState(newState.id)) {
          generatedStates.push(newState)
        }
      }
      if (nj > 0
          && n.canTransferData(st.nodes[ni][nj-1])) {
        var newState = cloneState(st)
        moveState(newState, ni, nj, ni, nj-1)
        if (newState.steps < minSteps && !isRepeatedState(newState.id)) {
          generatedStates.push(newState)
        }
      }
    }
  }
  return generatedStates
}

var minSteps = Number.MAX_SAFE_INTEGER
var day22part2 = function() {

  for (var i = 0; i < input.length; i++) {

    var nodes = []

    var lines = input[i].split(/\n/)
    // skip 0 and 1
    for (var l = 2; l < lines.length; l++) {
      var nodeArr = lines[l].split(/\s+/)
      var pos = nodeArr[0].split(/-/)
      var x = Number(pos[1].substr(1))
      var y = Number(pos[2].substr(1))
      var n = new Node(x, y, numVal(nodeArr[1]), numVal(nodeArr[2]), numVal(nodeArr[3]), pctVal(nodeArr[4]))
      if (nodes[x] === undefined) {
        nodes[x] = []
      }
      nodes[x][y] = n
    }
    // printNodes(nodes)

    // part 2 specification
    var targetX = nodes.length-1
    var targetY = 0
    nodes[targetX][targetY].target = true

    // option 1: breadth first algorithm with all possible steps, since we look for the fewest steps
    // option 2: develop a directed algorithm

    // iterate over all the nodes and find those who can transfer data to neighbours
    // use that as the next states

    minSteps = Number.MAX_SAFE_INTEGER
    var initialState = {'nodes': nodes, 'steps': 0, 'id': createStateId(nodes)}
    // console.log(initialState.id)
    var nextStates = [initialState]
    var timeout = 10000
    while (--timeout && nextStates.length > 0) {
      var state = nextStates.shift()
      if (state.steps >= minSteps) {
        continue
      }
      if (timeout % 100 === 0) {
        console.log(state.id, state.steps, nextStates.length, timeout)
      }
      if (isFinalState(state)) {
        minSteps = state.steps < minSteps ? state.steps : minSteps
        console.log(state.id, minSteps)
      } else {
        nextStates.push(...generateMoves(state))
        // var possibleMoves = generateMoves(state)
        // $.each(possibleMoves, function(idx, st) {
          // if (st.steps < minSteps && !isRepeatedState(st.id)) {//moved inside generation
            // nextStates.push(st)
          // }
        // })
      }
    }
    if (!timeout) {
      console.log('timeout!')
    }
    // for (var ni = 0; ni < nodes.length; ni++) {
    //   for (var nj = 0; nj < nodes[ni].length; nj++) {

    //   }
    // }


    $('#day22part2').append(input[i])
      .append('<br>&emsp;')
      .append(minSteps)
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day22"><h2>day #22</h2></div>')
  day22()
  $('#main').append('<br><div id="day22part2"><h2>day #22 part 2</h2></div>')
  day22part2()
  $('#main').append('<br>')
})