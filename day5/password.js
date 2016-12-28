var input = [
  'abc',
  'wtnhxymk'
]
var day5 = function() {

  for (var i = 0; i < input.length; i++) {
    var hash = md5(input[i])
    console.log(hash)

    // console.log(sumOfRealSectors)
    $('#day5').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }
}

var day5part2 = function() {
  for (var i = 0; i < input.length; i++) {

    $('#day5part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day5"><h2>day #5</h2></div>')
  day5()
  $('#main').append('<br><div id="day5part2"><h2>day #5 part 2</h2></div>')
  day5part2()
  $('#main').append('<br>')
})

