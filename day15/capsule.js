var input = [
  `Disc #1 has 5 positions; at time=0, it is at position 4.
Disc #2 has 2 positions; at time=0, it is at position 1.`,
  puzzleInput
]

var day15 = function() {

  for (var i = 0; i < input.length; i++) {

    // read input and build the machine
    var machine = []
    var inputLines = input[i].split(/\n/)
    for (var j = 0; j < inputLines.length; j++) {
      var splitInput = inputLines[j].split(/\s|\.|\=|,/)
      //0Disc 1#1 2has 35 4positions; 5at 6time=70,8 9it 10is 11at 12position 13414.
      machine.push({
        'disc' = splitInput[1]
        'numPos' = splitInput[3]
        'atTime' = splitInput[7]
        'pos' = splitInput[13]
      })
    }

    var time = 0
    var timeout = 1000
    // make a time loop to increment ticks
    // add a verification to check if the capsule would fall through
    while (time < timeout) {
      for (var m = 0; m < machine.length; m++) {
        machine[m].pos = (pos + 1) % machine[m].numPos // tick
      }
      time++
    }

    $('#day15').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }
}

var day15part2 = function() {
  for (var i = 0; i < input.length; i++) {

    $('#day15part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day15"><h2>day #15</h2></div>')
  day15()
  $('#main').append('<br><div id="day15part2"><h2>day #15 part 2</h2></div>')
  day15part2()
  $('#main').append('<br>')
})

