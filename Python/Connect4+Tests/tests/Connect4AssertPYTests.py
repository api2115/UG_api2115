import unittest
from assertpy import assert_that
from assertpy import add_extension
from sample.Connect4 import *

def lowest_point(self,height):
    minheight=6
    for i in self.val:
        if len(i)<minheight:
            minheight=len(i)
    if minheight==height:
        return self
    else:
        self._err("zle")

add_extension(lowest_point)

class Connect4TestAssertPY(unittest.TestCase):

    def setUp(self):
        self.temp=Connect4([[]for i in range(7)],"C","Z",[])

    def testInstance(self):
        assert_that(self.temp).is_instance_of(Connect4)#1

    #testy metody print
    def testPrint1AssertPy(self):
        assert_that(self.temp.print()).is_equal_to("0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n")

    def testPrint2AssertPy(self):
        self.temp.game_space = [["C","Z","C","Z","C","Z"], [], [], [], [], [], []]
        assert_that(self.temp.print()).is_equal_to(
            "Z 0 0 0 0 0 0 \nC 0 0 0 0 0 0 \nZ 0 0 0 0 0 0 \nC 0 0 0 0 0 0 \nZ 0 0 0 0 0 0 \nC 0 0 0 0 0 0 \n")#2

    def testPrint3AssertPy(self):
        self.temp.game_space = [["C"], ["Z"], ["C"], ["Z"], ["C"], ["Z"], ["C"]]
        assert_that(self.temp.print()).is_equal_to(
            "0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \nC Z C Z C Z C \n")

    def testPrint4AssertPy(self):
        assert_that(self.temp.print()).ends_with(" \n")#3

    def testPrint5AssertPy(self):
        self.temp.game_space = [[], [], [], [], [], ["Z", "Z", "Z"], ["C", "C", "C"]]
        assert_that(self.temp.print()).is_not_equal_to(
            "0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n")#4

    def testPrint6AssertPy(self):
        assert_that(self.temp.print()).starts_with(
            "0 0 0 0 0 0 0 \n")#5

    def testPrint7AssertPy(self):
        self.temp.game_space = [["C","C"], ["Z","Z"], ["C","C"], ["Z","Z"], ["C","C"], ["Z","Z"], ["C","C"]]
        assert_that(self.temp.print()).contains(
            "0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n")#6

    def testPrint8AssertPy(self):
        self.temp.game_space=[[], [], [], [], [], ["Z","Z","Z"], ["C","C","C"]]
        assert_that(self.temp.print()).contains(
            "0 0 0 0 0 Z C \n0 0 0 0 0 Z C \n0 0 0 0 0 Z C \n")

    def testPrint9AssertPy(self):
        self.temp.game_space = [[], [], ["Z"], ["C"], ["Z"], ["Z", "C", "Z"], ["C", "C", "C"]]
        assert_that(self.temp.print()).is_equal_to(
            "0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 Z C \n0 0 0 0 0 C C \n0 0 Z C Z Z C \n")

    def testPrint10AssertPy(self):
        self.temp.game_space = [[], [], ["Z","Z","Z","C","C","C"], ["C"], ["Z"], ["Z", "C", "Z"], ["C", "C", "C"]]
        assert_that(self.temp.print()).is_length(90)#7

    #testy metody move
    def testMove1AssertPy(self):
        self.temp.move(1, 1)
        self.temp.move(2, 2)
        self.temp.move(1, 3)
        self.temp.move(2, 4)
        self.temp.move(1, 5)
        self.temp.move(2, 6)
        self.temp.move(1, 7)
        assert_that(self.temp.game_space).does_not_contain([])#8

    def testMove2AssertPy(self):
        self.temp.move(1, 1)
        self.temp.move(2, 2)
        self.temp.move(1, 3)
        self.temp.move(2, 4)
        self.temp.move(1, 5)
        self.temp.move(2, 6)
        self.temp.move(1, 7)
        self.temp.move(1, 1)
        self.temp.move(2, 2)
        self.temp.move(1, 3)
        self.temp.move(2, 4)
        self.temp.move(1, 5)
        self.temp.move(2, 6)
        self.temp.move(1, 7)
        self.temp.move(1, 1)
        self.temp.move(2, 2)
        self.temp.move(1, 3)
        self.temp.move(2, 4)
        self.temp.move(1, 5)
        self.temp.move(2, 6)
        self.temp.move(1, 7)
        assert_that(self.temp.game_space).is_length(7)

    def testMove3AssertPy(self):
        self.temp.move(1,7)
        self.temp.move(1, 7)
        self.temp.move(1, 7)
        assert_that(self.temp.game_space).ends_with(["C","C","C"])

    def testMove4AssertPy(self):
        self.temp.move(2, 1)
        self.temp.move(2, 1)
        self.temp.move(2, 1)
        assert_that(self.temp.game_space).starts_with(["Z", "Z", "Z"])

    def testMove5AssertPyMoveHistory(self):
        self.temp.move(1,2)
        self.temp.move(2,1)
        self.temp.move(1,4)
        self.temp.move(2,6)
        self.temp.move(1,1)
        assert_that(self.temp.move_history).is_length(5)

    def testMove6AssertPyMoveHistory(self):
        self.temp.move(1, 2)
        self.temp.move(2, 1)
        self.temp.move(1, 4)
        self.temp.move(2, 6)
        self.temp.move(1, 1)
        self.temp.move(1, 2)
        self.temp.move(2, 1)
        self.temp.move(1, 4)
        self.temp.move(2, 6)
        self.temp.move(1, 1)
        assert_that(self.temp.move_history).is_equal_to([1,0,3,5,0,1,0,3,5,0])

    def testMove7AssertPyMoveHistory(self):
        assert_that(self.temp.move(1, 1)).is_iterable()#9

    def testMove8AssertPyValueError(self):
        assert_that(self.temp.move).raises(ValueError).when_called_with(-100,600)#10

    def testMove9AssertPyValueError(self):
        assert_that(self.temp.move).raises(ValueError).when_called_with(1,3.6)

    #testy metody undo_move
    def testUndo_moveAssertPy1ValueError(self):
        assert_that(self.temp.undo_move).raises(ValueError)

    def testUndo_moveAssertPy2(self):
        self.temp.game_space=[["C"], [], [], [], [], [], []]
        self.temp.move_history=[0]
        self.temp.undo_move()
        assert_that(self.temp.move_history).is_empty()#11

    def testUndo_moveAssertPy3(self):
        self.temp.game_space=[["C","C","Z","Z"], [], [], [], [], [], ["Z"]]
        self.temp.move_history=[0,0,0,6,0]
        self.temp.undo_move()
        assert_that(self.temp.move_history).is_not_equal_to([0,0,0,6,0])

    def testUndo_moveAssertPy4(self):
        self.temp.game_space = [["C", "C", "Z", "Z"], [], [], [], [], [], ["Z"]]
        self.temp.move_history = [0, 0, 0, 6, 0]
        self.temp.undo_move()
        self.temp.undo_move()
        self.temp.undo_move()
        self.temp.undo_move()
        self.temp.undo_move()
        assert_that(self.temp.move_history).is_empty()

    def testUndo_moveAssertPy5(self):
        self.temp.game_space=[["C","Z","Z","C"], [], [], [], [], [], []]
        self.temp.move_history=[0,0,0,0]
        self.temp.undo_move()
        self.temp.undo_move()
        assert_that(self.temp.game_space).is_equal_to([["C","Z"], [], [], [], [], [], []])

    def testUndo_moveAssertPy6(self):
        self.temp.game_space=[["C","Z","Z","C"], [], ["C","Z"], [], [], [], []]
        self.temp.move_history=[0,2,0,0,2,0]
        self.temp.undo_move()
        self.temp.undo_move()
        assert_that(self.temp.game_space).is_equal_to([["C","Z","Z"], [], ["C"], [], [], [], []])

    def testUndo_moveAssertPy7(self):
        self.temp.game_space=[["C","Z","Z","C","C"], [], [], [], [], [], []]
        self.temp.move_history=[0,0,0,0]
        self.temp.undo_move()
        self.temp.undo_move()
        assert_that(self.temp.game_space).starts_with(["C","Z","Z"])

    #testy metody checker
    def testChecker1(self):
        self.temp.game_space=[["C"], ["C"], ["C"], ["C"], [], [], []]
        assert_that(self.temp.checker(1)).is_equal_to("wygrana")

    def testChecker2(self):
        self.temp.game_space=[["Z","Z","Z","Z"], [], [], [], [], [], []]
        assert_that(self.temp.checker(1)).is_equal_to("wygrana")

    def testChecker3(self):
        self.temp.game_space=[["C"], ["Z"], ["C"], ["C"], ["C"], [], []]
        assert_that(self.temp.checker(1)).is_equal_to(None)

    def testChecker4(self):
        self.temp.game_space=[["C"], [], ["C"], ["C"], ["C"], [], []]
        assert_that(self.temp.checker(3)).is_equal_to(None)

    def testChecker5(self):
        self.temp.game_space=[["C","Z"], ["C"], ["C"], ["Z"], [], [], []]
        assert_that(self.temp.checker(1)).is_equal_to(None)

    def testChecker6(self):
        self.temp.game_space=[["Z","C","C","C","C"], ["C"], ["C"], ["C"], [], [], []]
        assert_that(self.temp.checker(1)).is_equal_to("wygrana")

    def testChecker7(self):
        self.temp.game_space=[["Z","C"], ["Z","C"], ["Z","C"], ["C","C"], [], [], []]
        assert_that(self.temp.checker(4)).is_equal_to("wygrana")

    def testChecker8(self):
        self.temp.game_space=[["C","C","Z"], ["C","Z","Z"], ["C","C","Z"], ["Z","Z","Z"], [], [], []]
        assert_that(self.temp.checker(4)).is_equal_to("wygrana")

    #testy przy uzyciu wlasnego matchera lowest_point
    def testLowestPoint1(self):
        self.temp.game_space = [["C", "Z", "C", "Z", "C", "Z"], ["C"], ["C"], ["C"], ["Z"], ["Z"], ["Z"]]
        assert_that(self.temp.game_space).lowest_point(1)

    def testLowestPoint2(self):
        self.temp.game_space = [["C", "Z"], ["Z","Z"], ["C","Z"], ["C","C","Z"], ["Z","C"], ["Z","Z"], ["Z","Z"]]
        assert_that(self.temp.game_space).lowest_point(2)

    def testLowestPoint3(self):
        self.temp.game_space = [["C", "Z", "C", "Z", "C", "Z"], ["C", "Z", "C", "Z", "C", "Z"], ["C", "Z", "C", "Z", "C", "Z"], ["C", "Z", "C", "Z", "C", "Z"], ["C", "Z", "C", "Z", "C", "Z"], ["C", "Z", "C", "Z", "C", "Z"], ["C", "Z", "C", "Z", "C", "Z"]]
        assert_that(self.temp.game_space).lowest_point(6)

    def testLowestPoint4(self):
        self.temp.game_space = [["C", "Z", "C", "Z", "C", "Z"], ["C", "Z", "C", "Z", "C", "Z"], ["C", "Z", "C", "Z", "C", "Z"], ["C", "Z", "C", "Z", "C", "Z"], ["C", "Z", "C", "Z", "C", "Z"], ["C", "Z", "C", "Z", "C", "Z"], ["C", "Z", "C", "Z", "C"]]
        assert_that(self.temp.game_space).lowest_point(5)

    def testLowestPoint5(self):
        assert_that(self.temp.game_space).lowest_point(0)