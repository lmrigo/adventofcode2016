var puzzleInput = 'zpqevtbw'
var input = [
  'abc',
  puzzleInput
]

var day14 = function() {

  for (var i = 0; i < input.length; i++) {
    var keys = []
    var salt = input[i]
    var index = 0
    var idxFwd = 0
    var hashes = []
    var indexes = []
    // initialize the first 1000 hashes
    while (idxFwd < 1000) {
      hashes.push(md5(salt + idxFwd++))
    }

    //It contains three of the same character in a row, like 777. Only consider the first such triplet in a hash.
    //One of the next 1000 hashes in the stream contains that same character five times in a row, like 77777.
    var isValidHash = function(hash, index) {
      var valid = false
      // find first triad
      var triad = ''
      for (var i = 0; i < hash.length - 2; i++) {
        if (hash.charAt(i) == hash.charAt(i+1)
            && hash.charAt(i) == hash.charAt(i+2)) {
          triad = ''+ hash.charAt(i) + hash.charAt(i) + hash.charAt(i)
          break
        }
      }

      if (triad.length > 0) {
        // console.log(index)
        var fiflet = '' + triad.charAt(0) + triad.charAt(0) + triad.charAt(0) + triad.charAt(0) + triad.charAt(0)
        var valid = false
        for (var i = 0; i < hashes.length; i++) {
          if (hashes[i].includes(fiflet)) {
            valid = true
            break
          }
        }
      }
      return valid
    }

    var timeout = 1000000
    while (keys.length < 64 && index < timeout) {
      var hash = hashes.shift()
      hashes.push(md5(salt + idxFwd++))
      if (isValidHash(hash, index)) {
        keys.push(hash)
        indexes.push(index)
        // console.log(index, hash)
      }
      index++
    }
    if (index > timeout) { console.log('timeout!') }
    // console.log(keys, indexes)

    $('#day14').append(input[i])
      .append('<br>&emsp;')
      .append(indexes[63])
      .append('<br>')
  }
}

var md5x2017 = function(input) {
  var finalHash = input
  for (var i = 0; i < 2017; i++) {
    finalHash = md5(finalHash)
  }
  return finalHash
}

var day14part2 = function() {
  for (var i = 0; i < input.length; i++) {
    var keys = []
    var salt = input[i]
    var index = 0
    var idxFwd = 0
    var hashes = []
    var indexes = []
    // initialize the first 1000 hashes
    while (idxFwd < 1000) {
      hashes.push(md5x2017(salt + idxFwd++))
    }

    //It contains three of the same character in a row, like 777. Only consider the first such triplet in a hash.
    //One of the next 1000 hashes in the stream contains that same character five times in a row, like 77777.
    var isValidHash = function(hash, index) {
      var valid = false
      // find first triad
      var triad = ''
      for (var i = 0; i < hash.length - 2; i++) {
        if (hash.charAt(i) == hash.charAt(i+1)
            && hash.charAt(i) == hash.charAt(i+2)) {
          triad = ''+ hash.charAt(i) + hash.charAt(i) + hash.charAt(i)
          break
        }
      }

      if (triad.length > 0) {
        // console.log(index)
        var fiflet = '' + triad.charAt(0) + triad.charAt(0) + triad.charAt(0) + triad.charAt(0) + triad.charAt(0)
        var valid = false
        for (var i = 0; i < hashes.length; i++) {
          if (hashes[i].includes(fiflet)) {
            valid = true
            break
          }
        }
      }
      return valid
    }

    var timeout = 100000
    while (keys.length < 64 && index < timeout) {
      var hash = hashes.shift()
      hashes.push(md5x2017(salt + idxFwd++))
      if (isValidHash(hash, index)) {
        keys.push(hash)
        indexes.push(index)
        // console.log(index, hash)
      }
      index++
    }
    if (index > timeout) { console.log('timeout!') }
    // console.log(keys, indexes)

    $('#day14part2').append(input[i])
      .append('<br>&emsp;')
      .append(indexes[63])
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day14"><h2>day #14</h2></div>')
  day14()
  $('#main').append('<br><div id="day14part2"><h2>day #14 part 2</h2></div>')
  day14part2()
  $('#main').append('<br>')
})

