var input = [
`root@ebhq-gridcenter# df -h
Filesystem              Size  Used  Avail  Use%
/dev/grid/node-x0-y0     93T   67T    26T   72%`,
  puzzleInput
]

function Node(x, y, size, used, avail, usePct) {
  this.x = x
  this.y = y
  this.size = size
  this.used = used
  this.avail = avail
  this.usePct = usePct
}

var numVal = function (sz) {
  return Number(sz.replace('T', ''))
}

var pctVal = function (pct) {
  return Number(pct.replace('%', '')) / 100.0
}

var day22 = function() {
  for (var i = 0; i < input.length; i++) {

    var nodes = []

    var lines = input[i].split(/\n/)
    // skip 0 and 1
    for (var l = 2; l < lines.length; l++) {
      var nodeArr = lines[l].split(/\s+/)
      // console.log(nodeArr)
      var pos = nodeArr[0].split(/-/)
      var x = Number(pos[1].substr(1))
      var y = Number(pos[2].substr(1))
      var n = new Node(x, y, numVal(nodeArr[1]), numVal(nodeArr[2]), numVal(nodeArr[3]), pctVal(nodeArr[4]))
      if (nodes[x] === undefined) {
        nodes[x] = []
      }
      nodes[x][y] = n
    }
    // console.log(nodes)
    var viablePairs = 0
    for (var ni = 0; ni < nodes.length; ni++) {
      // console.log(ni, viablePairs)
      for (var nj = 0; nj < nodes[ni].length; nj++) {
        var a = nodes[ni][nj]
        for (var nk = 0; nk < nodes.length; nk++) {
          for (var nl = 0; nl < nodes[nk].length; nl++) {
            var b = nodes[nk][nl]
            if (a.used > 0
                && a !== b
                && a.used <= b.avail) {
              viablePairs++
            }
          }
        }
      }
    }

    $('#day22').append(input[i])
      .append('<br>&emsp;')
      .append(viablePairs)
      .append('<br>')
  }

}

var day22part2 = function() {

  for (var i = 0; i < input.length; i++) {

    $('#day22part2').append(input[i])
      .append('<br>&emsp;')
      .append()
      .append('<br>')
  }
}

$(function (){
  $('#main').append('<div id="day22"><h2>day #22</h2></div>')
  day22()
  $('#main').append('<br><div id="day22part2"><h2>day #22 part 2</h2></div>')
  day22part2()
  $('#main').append('<br>')
})