
var input = [
`The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.
The second floor contains a hydrogen generator.
The third floor contains a lithium generator.
The fourth floor contains nothing relevant.`,
  puzzleInput
 ]

var printFloors = function(floors) {
  var str = ''
  for (var fi = floors.length - 1; fi >= 0; fi--) {
    for (var ej = 0; ej < floors[fi].length; ej++) {
      str += floors[fi][ej] + ' '
    }
    str += '\n'
  }
  console.log(str)
}

var cloneState = function(state) {
  var newState = {floors: [], steps: 0}
  $.each(state.floors, function(idx, elem) {
    var newFloor = []
    $.each(elem, function(idx2, elem2) {
      newFloor.push(elem2)
    })
    newState.floors.push(newFloor)
  })
  newState.steps = state.steps
  return newState
}

var move = function(floorA, floorB, elem1, elem2) {
    floorA.splice(floorA.indexOf('E'), 1)
    floorA.splice(floorA.indexOf(elem1), 1)
    if (elem2) { floorA.splice(floorA.indexOf(elem2), 1) }
    floorB.push('E')
    floorB.push(elem1)
    if (elem2) { floorB.push(elem2) }
}

var generate1ElemMoves = function(state, elevFloorIdx, up) {
  var newMoves = []
  var dir = up ? 1 : -1
  for (var el = 0; el < state.floors[elevFloorIdx].length; el++) {
    if (state.floors[elevFloorIdx][el] == 'E') { continue }
    var newState = cloneState(state)
    newState.steps = state.steps + 1
    move(newState.floors[elevFloorIdx], newState.floors[elevFloorIdx+dir], newState.floors[elevFloorIdx][el])
    newMoves.push(newState)
  }
  return newMoves
}

var generate2ElemMoves = function(state, elevFloorIdx, up) {
  var newMoves = []
  var dir = up ? 1 : -1
  for (var e1 = 0; e1 < state.floors[elevFloorIdx].length; e1++) {
    if (state.floors[elevFloorIdx][e1] == 'E') { continue }
    for (var e2 = e1+1; e2 < state.floors[elevFloorIdx].length; e2++) {
      if (state.floors[elevFloorIdx][e2] == 'E') { continue }
      var newState = cloneState(state)
      newState.steps = state.steps + 1
      move(newState.floors[elevFloorIdx], newState.floors[elevFloorIdx+dir],
            newState.floors[elevFloorIdx][e1], newState.floors[elevFloorIdx][e2])
      newMoves.push(newState)
    }
  }
  return newMoves
}

var generateMoves = function(state) {
  var moves = []
  var elevFloorIdx = state.floors.findIndex(function(e) {
    return e.includes('E')
  })
  var upStates = elevFloorIdx < 3
  var downStates = elevFloorIdx > 0
  // generate all possible moves
  // up
  if (upStates) {
    moves.push(...generate1ElemMoves(state, elevFloorIdx, true))
    if (state.floors[elevFloorIdx].length > 2) { // more than elevator and an element
      moves.push(...generate2ElemMoves(state, elevFloorIdx, true))
    }
  }
  // down
  if (downStates) {
    moves.push(...generate1ElemMoves(state, elevFloorIdx, false))
    if (state.floors[elevFloorIdx].length > 2) { // more than elevator and an element
      moves.push(...generate2ElemMoves(state, elevFloorIdx, false))
    }
  }

  return moves
}

var isFloorEmpty = function(floor) {
  return floor.length == 0
}

var isFloorOnlySameType = function(floor) {
  return floor.reduce(function(accum, val) {
      if (accum.charAt(0) == 'E') {
        return val
      } else if (val == 'E') {
        return accum
      } else if (val.charAt(0) == accum.charAt(0)) {
        return val
      } else {
        return '#'
      }
    }) != '#'
}

var isValidState = function(state) {
  var validState = true
  for (var fi = 0; fi < state.floors.length; fi++) {
    if (isFloorEmpty(state.floors[fi])
      || isFloorOnlySameType(state.floors[fi])) {
      continue
    } else {
      // check if all chips have generators
      for (var fj = 0; fj < state.floors[fi].length; fj++) {
        var elem = state.floors[fi][fj]
        if (elem == 'E') {
          continue
        } else if (elem.charAt(0) == 'M') {
          var matchGenerator = state.floors[fi].find(function(e) {
            return e.charAt(0) == 'G' && e.substr(1) == elem.substr(1)
          })
          if (!matchGenerator) {
            validState = false
            break
          }
        }
      }
      if (!validState) {
        break
      }
    }
  }
  return validState
}

var isFinalState = function(state) {
  var allLengths = state.floors.reduce(function (accum, val) {
    return accum + val.length
  }, 0)
  return state.floors[3].length == allLengths
}

var day11 = function() {

  for (var i = 0; i < input.length; i++) {
    var minSteps = Number.MAX_SAFE_INTEGER
    var ignoreWords = ['The', 'first', 'second', 'third', 'fourth', 'floor', 'contains', 'a', 'and', '', 'nothing', 'relevant']
    var splitFloorInput = input[i].split(/\n/)
    var originalFloors = []
    for (var j = 0; j < splitFloorInput.length; j++) {
      var f = []
      var splitElemInput = splitFloorInput[j].split(/\s|\./)
      for (var k = 0; k < splitElemInput.length; k++) {
        if (ignoreWords.includes(splitElemInput[k])) {
          continue
        } else if (splitElemInput[k].includes('compatible')) {
          var elem = splitElemInput[k].substr(0, splitElemInput[k].indexOf('-'))
          f.push('M' + elem)
          k++
        } else {
          var elem = splitElemInput[k]
          f.push('G' + elem)
          k++
        }
      }
      originalFloors.push(f)
    }
    var elevator = 'E'
    originalFloors[0].push(elevator)

    // printFloors(originalFloors)

    var passedStates = []
    var isRepeatedState = function(state) {
      var stateStr = ''
      $.each(state.floors, function(idx, f) {
        stateStr += 'F' + idx + ':' // floor #
        var elevator = f.includes('E') ? '1' : '0'
        stateStr += 'E' + elevator + ',' // elevator on floor
        // count generators
        var generators = f.reduce(function (accum, val) {
          return accum + (val.charAt(0) == 'G' ? 1 : 0)
        }, 0)
        stateStr += 'G' + generators + ','
        // count microchips
        var microchips = f.reduce(function (accum, val) {
          return accum + (val.charAt(0) == 'M' ? 1 : 0)
        }, 0)
        stateStr += 'M' + microchips + '.'
      })
      if (passedStates.includes(stateStr)) {
        return true
      } else {
        passedStates.push(stateStr)
        return false
      }
    }

    var initialState = {'floors': originalFloors, 'steps': 0}
    var nextStates = [initialState]
    while (nextStates.length > 0) {
      var state = nextStates.shift()
      if (isFinalState(state)) {
        // console.log('final state: '+state.steps)
        // printFloors(state.floors)
        minSteps = state.steps < minSteps ? state.steps : minSteps
      } else {
        var possibleMoves = generateMoves(state)
        // console.log(possibleMoves)
        $.each(possibleMoves, function(idx, st) {
          if (isValidState(st) && !isRepeatedState(st)) {
            nextStates.push(st)
          }
        })
      }
    }

    $('#day11').append(input[i])
      .append('<br>&emsp;')
      .append(minSteps)
      .append('<br>')
  }
}

var day11part2 = function() {

  for (var i = 0; i < input.length; i++) {
    var minSteps = Number.MAX_SAFE_INTEGER
    var ignoreWords = ['The', 'first', 'second', 'third', 'fourth', 'floor', 'contains', 'a', 'and', '', 'nothing', 'relevant']
    var splitFloorInput = input[i].split(/\n/)
    var originalFloors = []
    for (var j = 0; j < splitFloorInput.length; j++) {
      var f = []
      var splitElemInput = splitFloorInput[j].split(/\s|\./)
      for (var k = 0; k < splitElemInput.length; k++) {
        if (ignoreWords.includes(splitElemInput[k])) {
          continue
        } else if (splitElemInput[k].includes('compatible')) {
          var elem = splitElemInput[k].substr(0, splitElemInput[k].indexOf('-'))
          f.push('M' + elem)
          k++
        } else {
          var elem = splitElemInput[k]
          f.push('G' + elem)
          k++
        }
      }
      originalFloors.push(f)
    }
    var elevator = 'E'
    // part 2 specific
    originalFloors[0].push(elevator, 'Gelerium', 'Melerium', 'Gdilithium', 'Mdilithium')


    // printFloors(originalFloors)

    var passedStates = []
    var isRepeatedState = function(state) {
      var stateStr = ''
      $.each(state.floors, function(idx, f) {
        stateStr += 'F' + idx + ':' // floor #
        var elevator = f.includes('E') ? '1' : '0'
        stateStr += 'E' + elevator + ',' // elevator on floor
        // count generators
        var generators = f.reduce(function (accum, val) {
          return accum + (val.charAt(0) == 'G' ? 1 : 0)
        }, 0)
        stateStr += 'G' + generators + ','
        // count microchips
        var microchips = f.reduce(function (accum, val) {
          return accum + (val.charAt(0) == 'M' ? 1 : 0)
        }, 0)
        stateStr += 'M' + microchips + '.'
      })
      if (passedStates.includes(stateStr)) {
        return true
      } else {
        passedStates.push(stateStr)
        return false
      }
    }

    var initialState = {'floors': originalFloors, 'steps': 0}
    var nextStates = [initialState]
    while (nextStates.length > 0) {
      var state = nextStates.shift()
      if (isFinalState(state)) {
        // console.log('final state: '+state.steps)
        // printFloors(state.floors)
        minSteps = state.steps < minSteps ? state.steps : minSteps
      } else {
        var possibleMoves = generateMoves(state)
        // console.log(possibleMoves)
        $.each(possibleMoves, function(idx, st) {
          if (isValidState(st) && !isRepeatedState(st)) {
            nextStates.push(st)
          }
        })
      }
    }
    $('#day11part2').append(input[i])
      .append('<br>&emsp;')
      .append(minSteps)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day11"><h2>day #11</h2></div>')
  day11()
  $('#main').append('<br><div id="day11part2"><h2>day #11 part 2</h2></div>')
  day11part2()
  $('#main').append('<br>')
})