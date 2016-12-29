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
  'aba[bab]xyz',
  'xyx[xyx]xyx',
`aba[bab]xyz
xyx[xyx]xyx
aaa[kek]eke
zazbz[bzb]cdb`,
 'svnwxhhzpzjecgsunv[ucxaxltvfvvbbkx]gdnxojirnewoxul[ynqqsklepjplpzdf]uchlwfjpjvdmmzqn[vgmpooqwxgbtxnb]vicbdsabgheloshq',
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

  var supportsSsl = function (ip) {
    var normalSections = []
    var bracketSections = []
    $.each(ip.split(/(\[\w+\])/), function (idx, elem) {
      if (elem.startsWith('[')) {
        bracketSections.push(elem)
      } else {
        normalSections.push(elem)
      }
    })
    // console.log(normalSections, bracketSections)

    var checkBab = function (a, b) {
      var foundBab = false
      for (var i = 0; i < bracketSections.length; i++) {
        var sec = bracketSections[i]
        for (var j = 0; j < sec.length-2; j++) {
          // check for bab inside bracket
          if (sec.charAt(j) == b
            && sec.charAt(j+1) == a
            && sec.charAt(j+2) == b) {
            foundBab = true
            break
          }
        }
        if (foundBab) break;
      }
      return foundBab
    }

    var foundAbaBab = false
    for (var i = 0; i < normalSections.length; i++) {
      var sec = normalSections[i]
      for (var j = 0; j < sec.length-2; j++) {
        // check for aba outside bracket
        if (sec.charAt(j) == sec.charAt(j+2)
          && sec.charAt(j) != sec.charAt(j+1)) {
          foundAbaBab = checkBab(sec.charAt(j), sec.charAt(j+1))
          if (foundAbaBab) break;
        }
      }
      if (foundAbaBab) break;
    }
    return foundAbaBab
  }

  for (var i = 0; i < input.length; i++) {
    var sslCount = 0
    var ips = input[i].split(/\n/)
    for (var j = 0; j < ips.length; j++) {
      if (supportsSsl(ips[j])) sslCount++
    }

    $('#day7part2').append(input[i])
      .append('<br>&emsp;')
      .append(sslCount)
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