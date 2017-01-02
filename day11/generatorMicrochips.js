
var input = [
`The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.
The second floor contains a hydrogen generator.
The third floor contains a lithium generator.
The fourth floor contains nothing relevant.`,
  puzzleInput
 ]

 var day11 = function() {

  for (var i = 0; i < input.length; i++) {
    var steps = 0
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
          str += floors[fi][ei] + ' . '
        }
        str += '\n'
      }
      console.log(str)
    }
    printFloors(floors)

    var checkPair = function(floor) {
      var pair = false
      if (floor.length > 1) {
        for (var e1 = 0; e1 < floor.length; e1++) {
          for (var e2 = e1+1; e2 < floor.length; e2++) {
            if (floor[e1].substr(1) == floor[e2].substr(1)) {
              pair = floor[e1].substr(1)
              break
            }
          }
          if (pair) {
            break
          }
        }
      }
      return pair
    }
    var chipGenMatch = function(elem, floor) {
      var element = elem.substr(1)
      var match = floor.find(function(e) {
        return e.substr(1) == element
      })
      return match
    }

    var allLengths = floors.reduce(function (accum, val) {
      return accum + val.length
    }, 0)
    while (floors[3].length < allLengths && steps < 1000000) {
      for (var j = 0; j < floors.length; j++) {
        var eIdx = floors[j].indexOf(elevator)
        if (eIdx >= 0) {
          floors[j].splice(eIdx, 1)
          var moved = false
          var pair = checkPair(floors[j])
          if (j < 3 && pair) {
            var a = floors[j].indexOf('M'+pair)
            a = floors[j].splice(a, 1)[0]
            var b = floors[j].indexOf('G'+pair)
            b = floors[j].splice(b, 1)[0]
            floors[j+1].push(a, b, elevator)
            moved = true
          }
          if (!moved && j < 3) {
            for (var k = 0; k < floors[j].length; k++) {
              var elem = floors[j][k]
              var chip = elem.startsWith('M')
              if (chipGenMatch(elem, floors[j+1])) {
                // move up
                floors[j].splice(k, 1)
                floors[j+1].push(elevator)
                floors[j+1].push(elem)
                moved = true
                break
              }
            }
          }
          if (!moved && j > 0) {
            for (var k = 0; k < floors[j].length; k++) {
              var elem = floors[j][k]
              var chip = elem.startsWith('M')
              if (chipGenMatch(elem, floors[j-1])) {
                // move down
                floors[j].splice(k, 1)
                floors[j-1].push(elevator)
                floors[j-1].push(elem)
                moved = true
                break
              }
            }
          }
          if (moved) {
            break
          }
        }
      }
      steps++
    }
    printFloors(floors)

    $('#day11').append(input[i])
      .append('<br>&emsp;')
      .append(steps)
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