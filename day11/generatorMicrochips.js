
var input = [
`The first floor contains a hydrogen-compatible microchip and a lithium-compatible microchip.
The second floor contains a hydrogen generator.
The third floor contains a lithium generator.
The fourth floor contains nothing relevant.`,
  puzzleInput
 ]

 var day11 = function() {

  for (var i = 0; i < input.length; i++) {
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
    console.log(floors)

    var steps = 0
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