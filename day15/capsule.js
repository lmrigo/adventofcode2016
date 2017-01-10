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
      // console.log(splitInput)
      machine.push({
        'disc': splitInput[1],
        'numPos': Number(splitInput[3]),
        'atTime': Number(splitInput[7]),
        'pos': Number(splitInput[13])
      })
    }
    // console.log(machine)

    var time = 0
    var timeout = 1000000
    var capsules = []
    var capsuleFound = false
    // make a time loop to increment ticks
    // add a verification to check if the capsule would fall through
    while (time < timeout) {
      capsules.push({
        'start': time,
        'disc': -1 // discs start at 1 in input and at 0 in program
      })
      // tick all discs
      for (var m = 0; m < machine.length; m++) {
        machine[m].pos = (machine[m].pos + 1) % machine[m].numPos
      }
      // increase time
      time++
      // make capsules fall
      var nextCapsules = []
      for (var c = 0; c < capsules.length; c++) {
        capsules[c].disc++ // fall
        // check if it has fallen through
        if (capsules[c].disc >= machine.length) {
          capsuleFound = capsules[c]
          break
        }
        // check if it can fall to the next disc
        if (machine[capsules[c].disc].pos == 0) {
          nextCapsules.push(capsules[c])
        }
      }
      capsules = nextCapsules
      if (capsuleFound) {
        break
      }
    }
    if (time >= timeout) {
      console.log("timeout!")
    }

    $('#day15').append(input[i])
      .append('<br>&emsp;')
      .append(capsuleFound.start)
      .append('<br>')
  }
}

var day15part2 = function() {

  for (var i = 0; i < input.length; i++) {

    // day 2 specific
    input[i] += '\nDisc #X has 11 positions; at time=0, it is at position 0.'
    // console.log(input[i])

    // read input and build the machine
    var machine = []
    var inputLines = input[i].split(/\n/)
    for (var j = 0; j < inputLines.length; j++) {
      var splitInput = inputLines[j].split(/\s|\.|\=|,/)
      //0Disc 1#1 2has 35 4positions; 5at 6time=70,8 9it 10is 11at 12position 13414.
      // console.log(splitInput)
      machine.push({
        'disc': splitInput[1],
        'numPos': Number(splitInput[3]),
        'atTime': Number(splitInput[7]),
        'pos': Number(splitInput[13])
      })
    }
    // console.log(machine)

    var time = 0
    var timeout = 10000000
    var capsules = []
    var capsuleFound = false
    // make a time loop to increment ticks
    // add a verification to check if the capsule would fall through
    while (time < timeout) {
      capsules.push({
        'start': time,
        'disc': -1 // discs start at 1 in input and at 0 in program
      })
      // tick all discs
      for (var m = 0; m < machine.length; m++) {
        machine[m].pos = (machine[m].pos + 1) % machine[m].numPos
      }
      // increase time
      time++
      // make capsules fall
      var nextCapsules = []
      for (var c = 0; c < capsules.length; c++) {
        capsules[c].disc++ // fall
        // check if it has fallen through
        if (capsules[c].disc >= machine.length) {
          capsuleFound = capsules[c]
          break
        }
        // check if it can fall to the next disc
        if (machine[capsules[c].disc].pos == 0) {
          nextCapsules.push(capsules[c])
        }
      }
      capsules = nextCapsules
      if (capsuleFound) {
        break
      }
    }
    if (time >= timeout) {
      console.log("timeout!")
    }
    $('#day15part2').append(input[i])
      .append('<br>&emsp;')
      .append(capsuleFound.start)
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

