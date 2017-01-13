var puzzleInput = '3014603'
var input = [
  '5',
  '6',
  '7',
  '8',
  '50000',
  puzzleInput
]

var day19 = function() {

  for (var i = 0; i < input.length; i++) {
    var elfNumber = -1
    var numOfElves = Number(input[i])
    var num = 1
    var elves = []
    while (numOfElves--) {
      elves.push([num++, 1])
    }
    // console.log(elves)

    // start the game
    var e = 0
    var onlyOneLeft = false
    var timeout = 1000000000
    while (!onlyOneLeft && --timeout) {
      // current
      if (elves[e][1] == 0) {
        e = (e+1) % elves.length
        continue
      }

      // next
      var next = -1
      for (var j = e+1; j < elves.length; j++) {
        if (elves[j][1] > 0) {
          next = j
          break
        }
      }
      if (next == -1) {
        for (var j = 0; j < e; j++) {
          if (elves[j][1] > 0) {
            next = j
            break
          }
        }
      }
      if (next == -1) {
        onlyOneLeft = true
        break
      }

      elves[e][1] += elves[next][1]
      elves[next][1] = 0

      e = next
    }
    if (!timeout) {
      console.log('timeout!')
    }
    var theElf = elves.find(function(el) {
      return el[1] > 0
    })
    if (theElf) {
      elfNumber = theElf[0]
    }

    $('#day19').append(input[i])
      .append('<br>&emsp;')
      .append(elfNumber)
      .append('<br>')
  }
}

var day19part2 = function() {
  for (var i = 0; i < input.length; i++) {
    var elfNumber = -1
    var numOfElves = Number(input[i])
    var halfNumOfElves = numOfElves >> 1
    var num = 1
    var elvesA = new Queue(halfNumOfElves)
    for (var j = 0; j < halfNumOfElves; j++) {
      elvesA.enqueue(j+1)
    }
    var halfIndex = numOfElves - halfNumOfElves
    var elvesB = new Queue(halfIndex)
    for (var j = 0; j < halfIndex; j++) {
      elvesB.enqueue(j+halfIndex)
    }
    // console.log(elvesA, elvesB)

    // start the game
    var onlyOneLeft = false
    var timeout = 10000000
    while (!onlyOneLeft && --timeout) {
      if (timeout % 1000000 == 0) {
        console.log(elvesA.getLength(), elvesB.getLength())
      }
      // steal the victim
      var victim = elvesB.dequeue()
      if (elvesB.isEmpty()) {
        onlyOneLeft = true
        break
      }
      // rotate
      elvesB.enqueue(elvesA.dequeue())
      if (elvesA.getLength()+1 != elvesB.getLength()) {
        elvesA.enqueue(elvesB.dequeue())
      }
    }
    // console.log(elvesA, elvesB)
    if (!timeout) {
      console.log('timeout!')
    }
    if (onlyOneLeft) {
      elfNumber = elvesA.dequeue()
    }
    // console.log(elfNumber)

    $('#day19part2').append(input[i])
      .append('<br>&emsp;')
      .append(elfNumber)
      .append('<br>')
  }

}

$(function (){
  $('#main').append('<div id="day19"><h2>day #19</h2></div>')
  day19()
  $('#main').append('<br><div id="day19part2"><h2>day #19 part 2</h2></div>')
  day19part2()
  $('#main').append('<br>')
})

