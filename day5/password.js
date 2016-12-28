var input = [
  'abc',
  'wtnhxymk'
]
var day5 = function() {

  for (var i = 0; i < input.length; i++) {
    var password = ''
    var prefix = input[i]
    var index = 0
    while (password.length < 8) {
      var hash = ''
      while (!hash.startsWith('00000')) hash = md5(prefix + index++)
      password += hash.charAt(5)
      // console.log(password, index-1, hash)
    }
    $('#day5').append(input[i])
      .append('<br>&emsp;')
      .append(password)
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

