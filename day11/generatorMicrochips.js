
var input = [
`The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.
The second floor contains a hydrogen generator.
The third floor contains a lithium generator.
The fourth floor contains nothing relevant.`,
  puzzleInput
 ]

 var day11 = function() {

  for (var i = 0; i < input.length; i++) {
    var minSteps = Number.MAX_SAFE_INTEGER
    var ignoreWords = ['The', 'first', 'second', 'third', 'fourth', 'floor', 'contains', 'a', 'and', '', 'nothing', 'relevant']
    var floorsInputs = input[i].split(/\n/)
    var floors = []
    for (var j = 0; j < floorsInputs.length; j++) {
      var f = []
      var fInput = floorsInputs[j].split(/\s|\./)
      for (var k = 0; k < fInput.length; k++) {
        if (ignoreWords.includes(fInput[k])) {
          continue
        } else if (fInput[k].includes('compatible')) {
          var elem = fInput[k].substr(0, fInput[k].indexOf('-'))
          f.push('M' + elem)
          k++
        } else {
          var elem = fInput[k]
          f.push('G' + elem)
          k++
        }
      }
      floors.push(f)
    }
    var elevator = 'E'
    floors[0].push(elevator)

    var printFloors = function(floors) {
      var str = ''
      for (var fi = floors.length - 1; fi >= 0; fi--) {
        for (var ei = 0; ei < floors[fi].length; ei++) {
          str += floors[fi][ei] + ' '
        }
        str += '\n'
      }
      console.log(str)
    }
    // printFloors(floors)

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
        if (elem2) { floorA.splice(floorA.indexOf(elem), 1) }
        floorB.push('E')
        floorB.push(elem1)
        if (elem2) { floorB.push(elem2) }
    }

    var generate1ElemMoves = function(state, elevFloorIdx, up) {
      var newMoves = []
      var dir = up ? 1 : -1
      for (var i = 0; i < state.floors[elevFloorIdx].length; i++) {
        if (state.floors[elevFloorIdx][i] == 'E') { continue }
        var newState = cloneState(state)
        newState.steps = state.steps + 1
        move(newState.floors[elevFloorIdx], newState.floors[elevFloorIdx+dir], newState.floors[elevFloorIdx][i])
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
      for (var i = 0; i < state.floors.length; i++) {
        if (isFloorEmpty(floors[i])
          || isFloorOnlySameType(floors[i])) {
          continue
        } else {
          // check if all chips have generators
          for (var j = 0; j < floors[i].length; j++) {
            var elem = floors[i][j]
            if (elem == 'E') {
              continue
            } else if (elem.charAt(0) == 'M') {
              var matchGenerator = floors[i].find(function(e) {
                return e.charAt(0) == 'G' && e.substr(1) == elem
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

    var passedStates = []
    var isRepeatedState = function(state) {
      var stateStr = ''
      $.each(state.floors, function(i, f) {
        stateStr += 'F' + i + ':' // floor #
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

    var isFinalState = function(state) {
      var allLengths = state.floors.reduce(function (accum, val) {
        return accum + val.length
      }, 0)
      return state.floors[3].length == allLengths
    }

    var initialState = {'floors': floors, 'steps': 0}
    var nextStates = [initialState]
    while (nextStates.length > 0) {
      var state = nextStates.shift()
      if (isFinalState(state)) {
        console.log('final state: '+state.steps)
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

    // printFloors(floors)

    $('#day11').append(input[i])
      .append('<br>&emsp;')
      .append(minSteps)
      .append('<br>')
  }
}

var day11part2 = function() {

  for (var i = 0; i < input.length; i++) {
    $('#day11part2').append(input[i])
      .append('<br>&emsp;')
      .append()
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