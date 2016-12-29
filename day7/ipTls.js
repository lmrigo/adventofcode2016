var puzzleInput

var input = [
  'abba[mnop]qrst',
  'abcd[bddb]xyyx',
  'aaaa[qwer]tyui',
  'ioxxoj[asdfgh]zxcvbn',
`abba[mnop]qrst
abcd[bddb]xyyx
aaaa[qwer]tyui
ioxxoj[asdfgh]zxcvbn`,
  puzzleInput
 ]

 var day7 = function() {

  var supportsTls = function (ip) {
    var bracketSection = false
    var abba = false
    for (var i = 0; i < ip.length-3; i++) {
      var ch = ip.charAt(i)
      if (bracketSection) {
        if (ch == ']') { bracketSection = false; continue }
        // check for abba inside bracket
        if (ip.charAt(i) == ip.charAt(i+3)
          && ip.charAt(i+1) == ip.charAt(i+2)
          && ip.charAt(i) != ip.charAt(i+1)) {
          abba = false
          break
        }
      } else {
        if (ch == '[') { bracketSection = true; continue; }
        // check for abba
        if (ip.charAt(i) == ip.charAt(i+3)
          && ip.charAt(i+1) == ip.charAt(i+2)
          && ip.charAt(i) != ip.charAt(i+1)) {
          abba = true
        }
      }
    }
    return abba
  }

  for (var i = 0; i < input.length; i++) {
    var tlsCount = 0
    var ips = input[i].split(/\n/)
    for (var j = 0; j < ips.length; j++) {
      if (supportsTls(ips[j])) tlsCount++
    }

    $('#day7').append(input[i])
      .append('<br>&emsp;')
      .append(tlsCount)
      .append('<br>')
  }
}

var day7part2 = function() {

  for (var i = 0; i < input.length; i++) {
    var tlsCount
    $('#day7part2').append(input[i])
      .append('<br>&emsp;')
      .append(tlsCount)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day7"><h2>day #7</h2></div>')
  day7()
  $('#main').append('<br><div id="day7part2"><h2>day #7 part 2</h2></div>')
  day7part2()
  $('#main').append('<br>')
})