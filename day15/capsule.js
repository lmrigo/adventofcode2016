var input = [
  `Disc #1 has 5 positions; at time=0, it is at position 4.
Disc #2 has 2 positions; at time=0, it is at position 1.`,
  puzzleInput
]

var day15 = function() {

  for (var i = 0; i < input.length; i++) {
    // read input and build the machine

    // make a time loop to increment ticks
    // add a verification to check if the capsule would fall through

    $('#day15').append(input[i])
      .append('<br>&emsp;')
      .append(indexes[63])
      .append('<br>')
  }
}

var day15part2 = function() {
  for (var i = 0; i < input.length; i++) {

    $('#day15part2').append(input[i])
      .append('<br>&emsp;')
      .append(indexes[63])
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

