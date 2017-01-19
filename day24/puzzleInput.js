var puzzleInput =
`###################################################################################################################################################################################
#.........#...#.............#...#3#.#.....#...........#.........#.#...#.......#.#.#...#...#.................#...........#.#...#.#.......#.......#.......#...#...#.....#.....#.....#
#.#.#.#.#.#.#########.#.#.###.#.#.#.###.###.#.###.#.#.#.###.#.###.#.#.#.#.#####.#.#.#.#.#.#.###.#.#.#.#.#.#.#.###.#.#.###.#.#.#.#####.#.#.#.###.#.#.#.#.#.###.#.###.###.###.###.#.#
#...#...#...#.......#...#.#.#.....#...#.....#.........#.......#.#...#...#.#.............#...#.......#.#.#...#.#.....#.......#...#.....#...#...........#...#...#.#...............#2#
#.###.#.#.#####.###.###.#.#.#.#.###.#.#.#####.#######.#.###.###.#.#.#.#.#.#####.###.###.#.#.#####.#.###.#.###.#.#.#.#.#.#######.#######.#.#.###.###.###.#.#.#.#.#.#.###.#.###.#.###
#.......#.........#.#.#...#...#...#.....#.#.............#.....#...#.......#.#.....#...#...#.......#.............................#.#...#...#...#.....#...#.......#.......#.......#.#
#.###.#.#.#########.#.#.#.#.#.#.#.#.#.#.#.#.#.#.###.#.#.#####.#.#.#######.#.#.#.#.#.#.#####.#.###.#.#####.#.###.###.#.#.###.###.#.#.#.#####.#.###.#.#.#.#######.###.#.#.#.###.###.#
#...#.#...#...#...#...#.#...#.....#...#...........#.....#.........#.#...#...#...#.#...#.......#...#.#.....#.#.....#...#.#.......#.#.#.......#.......#...........#.#.#...#.#.......#
#.#.#.###.###.#.#.#######.#.#.#.#.#.#.###.###########.#.#.#####.###.#.#.#####.#.#.#.#####.###.#.###.#####.###.#####.#########.#.###.#.###.#.#.#.#.###.###.#.#####.#.#.#.#.#.###.#.#
#.......#.......#...........#...#.#...#.............#.#.#...#...#.....#...#...#.#...#...#.......#.#.#.#...#.....#.#.#.........#...#...#.....#.#...........#.#.......#.#.#...#...#.#
#.#.#.###.#####.#.#####.#.###.#.#.#.###.#.#.#.###.###.#.#####.###.#####.#.#.#####.#.#.#.#######.#.###.#.###.#####.#.#####.#.#.#####.#.#.#.#.###.#.#######.#.#.#.###########.#.#.#.#
#.#.#.....#.#1..........#.#...#...#.....#.........#...............#.#...#.....#...#.......#...........#.#...#.#.....#.............#.............#.....#...#.....#...#.....#.#.....#
#.#.###.#.#.#####.#.#.#.###.#####.#.#.#.###.###.#.#.#.#####.#.#.###.#.#.#####.#.#.#.#.#.#.###.#.###.#.#.#.#.#.#.###.#.#.#####.###.###.###.#.#.#.###.#.#.#.#.#.###.#.#.#####.#####.#
#...#...#.#...#.#.#.#.#.......#.....................#.#...............#.......#.#...#.#.#.....#.#.#...#...#.#.......#.....#.#...#.........#.#.#...#.........#.............#.....#.#
#.###.###.###.#.#.###.#.#####.#.#####.###.###########.###.#.#.#####.#.#.#.###.###.#.#.#.#.###.#.#.#.#.###.#.###.#.#########.#.#.#.#.###.#.#.#.#.#.#.#.#.#.###.###.#####.#.#####.###
#.....#.#.......#.#.#.....#...#.......#...#.#...#.............#.#.#.....#.........#...#.#.........#.#.#.#...#.#...#...#.......#.....#.#.....#.#.#.......#.#...#.#.....#.......#...#
#.#.###.#.#######.#.#.#.###.#.###.###.#####.#.#.#.#.###.###.###.#.#.#####.#.#####.#.#.#.#.#.#########.#.#.#.#.#.#.#.#.#.###.#.###.#.#.###.###.#.#######.#.#.#.#.#.###.#.#.#.#.###.#
#.#.#.......#...#...#.#.#.#.....#.....#...#...#.....#...#...#...#...........#...........#.........#.#.....#.....#.......#...#...#...#.#...#.#.#.........#...#.....#.#...#.#.....#.#
#.#.#.#####.#.#.#.###.###.#.#.#####.#.###.#.#.#####.#.#####.#.#.#.#####.###.#.#.#.#.###.#.#.#.#.#.#.#.###.#.#####.###.###.#.#.#.#.#.#.#.#.#.###.###.#.#######.#####.###.#.###.###.#
#.#.......#.#...#.#...#.#.#.......#...#.....#.........#.....#.#.....#...#...#.#.#...#.....#...#...#...#.....#.......#.#.#...#.#.........#...#.#..4#.#.#.#.#.....#.....#.........#.#
#.###.#.#.#.###.#.#.###.#.#######.#.#.###.#.###.#.#.#.#.#.#.###.#####.#.###.#######.#####.###.#.#.#.#.#.###.#.#####.#.#.#.#.#.#.#.#.#.#.#.#.#.#######.#.#.#.#.#.#.#.#.#.#.###.#.#.#
#0#...#.#.#.....#...#...#.#...#...#...#...#.......#.#.#.....#...#...#...#...#...#...#.........#.......#...#.......#...#...#...#.......#...#...............#.....#...#...#...#.#...#
###.#.#.###.###########.#.#####.###.###.###.###.###.#.###.#.#.#.#.#.#.#.#.#.#.###.#.###.#.#.#.#####.#.#.#.#.#.#.#.#.#.#.#.###.#####.#.#####.#.#.#.#####.#.#.#####.#####.#.#.#.#.###
#...#.#...#.......#...#...........#...#.....#...#...#.#.........#.....#.#...#.......#.....#.#.#.........#.........#...#.#.#...#.#.....#.....................#...............#.....#
###.#.#.#.#.#.###.#.#.#.#.#######.#.#.###.###.#.#.#####.###.###.###.###.#.#.#.#.#######.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.#.###.#.#####.###.#######.###.###.#.###.###.###.###.#.#.#
#...#.............#.#...........#.#.#.....#.....#.......#.#.....#...#.........#.....#.......#.....#...#.....#...#.......#...#...#.#.........#...#...........#.......#...#.......#.#
###.#.#########.#.#.#####.#.#.#.#.#.#.###.#.#######.#.#.#.#.#.#####.#.#.#.#####.#.#.#.#####.#######.#.#.#.#.#.#####.#.#.#.#####.#.#.###.#######.#######.#.#.###.#.#.#.#.#.#.###.#.#
#.#...............#.#.......#.....#.................#...#.#.#.......#...#.......#.#.#...#.#.......#...#.....#.....#...#.#.......#.#.#.....#.....#.....#.#...#.#...#...#.#...#.#.#.#
#.#.#.###.#.#.#.#.#.#.#.#.#.#########.#.#.#.#.#.#.#.#.#.#.#.###.#.#.#.###.#.#.#.#.#.###.#.#.###.#.#.###.###.#.#.#####.#####.#####.#.#.#.#.#.#.###.#.#.#.###.#.#.#.#.###.#.#.#.#####
#...#.#.....#...#.............#.#.#.#.........#.#...#.#.....#.......#...#.#.#.....#.......#...#...#...........#.....#.#.......#...#...#.#.........#...#...#.....#.......#...#.....#
###.#.#.#.#.#.#.###.#.###.#.###.#.#.#.#.###.#.###.#.#.#####.###.###.#.#.#.###.#.#.###.###.###.#.#.#.#.###.#####.###.#####.#.#.###.###.#####.#####.#.#.#######.###.###.###.#.#.#.#.#
#...#.#.....#.........#.......#.#...#.......#...#...#...........#.....#.......#...........#.......#...#...#.....#.....#...#.......#.#.#...#.#.....#.........#.....#...#.#...#.#...#
###.###.###.###.#.#####.###.#.#.#.#.#.###.###.###.###.#.#####.#.#.#.#.###.#.#.###.#.###.###.#.#.###.###.#.#.#.#.#.#.#.#.#.#.#.#.###.#.###.#.###.#.#.#####.#.#####.#.#.#.#####.#.#.#
#.#.#...#.#.#...................#.......#.#.#.#.#.....#.#.#.....#...#.......#.#...#.......#.....#...#.....#...#...#.#...#...#.........#...#...#...........#.........#.#..5#...#...#
#.#.#.###.#.###.#####.#.#.###.#.#####.#.#.#.#.#.#.###.#.#.#.#######.###.#.#.#.#.#.###.#.#.#.###.#.#####.#.#.#.#####.#.###.#.#.###.###.#.###.#.#.###########.#.#######.#.#.#.###.###
#...#.#.#...#.#.................#.#.....#.#.........#.....#.#.#...#.#.........#...#.#...#.#.........#...#...#.....#.#.#.#.....#...#.#.....#.#.............#.#...#.#.#.....#...#...#
#.#.###.#.#.#.#.#.#.#.#.###.###.#.#.#######.#######.###.#.#.#.###.#.#.#####.###.###.#####.#.#####.#.#.#.#.#.#.###.#.#.#.#.###.#.#.#.#.#.#.#.#####.#.#.#.#.###.#.#.#.#.#####.###.#.#
#...#.....#.....#.....#.#...#...#...............#...#...#...#.....#...#.#.....#.#.#...#...#.#...#...#.....#...#...#...................#.........#...#.........#.#...#.......#...#.#
###.#.###.#.#.#.###.#.#.#.#.#.###.###.#.###.###.#.###.#.#######.#.#.#.#.#.#####.#.#.#.#.#.###.#.#.#.#####.#.#.###.#.#######.#######.###.#######.#.#.#.#.###.###.###.#.#.#.#.#.#.#.#
#.....#7..#.#.#...........#.#...#.........#.....#.#.#...#.....#.............#...#...#...#.#.#...#.......#...#.....#.#.......#.#.....#...#...#...#...#...#...#.#.....#.#.......#.#.#
#.#.#.#.#.#.#.#.#.#.###.#####.#.#############.#.###.#.#.#.#.###.###.#######.#.#.###.#.###.#.###.#######.###.###.#.#.###.#.#.#.#.#.###.###.###.#.#.###.#.#.#.#.#.#.###.#.###.#.#.###
#...#.....#.#...#.#.....#.....#...#...#.......#6#.......#.#.......#.#.........#...#.#.....#.....#.#.......#.#.......#.......#.....#.....#.....#...#.#.#.#...#.#...#.#...#...#.#.#.#
###################################################################################################################################################################################`;