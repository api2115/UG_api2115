import unittest
from hamcrest import *
from hamcrest.core.base_matcher import BaseMatcher
from sample.Connect4 import *

class IsHeight(BaseMatcher):
    def __init__(self,height):
        self.height=height

    def _matches(self, item):
        maxheight=0
        for i in item:
            if len(i)>maxheight:
                maxheight=len(i)

        if maxheight==self.height:
            return True
        else:
            return False

def is_height(height):
    return IsHeight(height)


class Connect4TestHamcrest(unittest.TestCase):

    def setUp(self):
        self.temp=Connect4([[]for i in range(7)],"C","Z",[])

    def testInstance(self):
        assert_that(self.temp,instance_of(Connect4))#1

    # testy metody print
    def testPrint1Hamcr(self):
        assert_that(self.temp.print(),equal_to("0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n"))

    def testPrint2Hamcr(self):
        assert_that(self.temp.print(),has_length(90))#2

    def testPrint3Hamcr(self):
        assert_that(self.temp.print(),contains_string("0 0 0 0 0 0 0 \n"))#3

    def testPrint4Hamcr(self):
        self.temp.game_space=[["C"], ["Z"], ["Z"], ["C"], ["Z"], ["Z"], ["C"]]
        assert_that(self.temp.print(),ends_with("C Z Z C Z Z C \n"))#4

    def testPrint5Hamcr(self):
        self.temp.game_space = [["C","C","Z","Z","C","Z"], ["Z"], ["Z"], ["C"], ["Z"], ["Z"], ["C"]]
        assert_that(self.temp.print(),starts_with("Z 0 0 0 0 0 0 \n"))#5

    #testy metody move
    def testMove1Hamcr(self):
        self.temp.move(1,1)
        assert_that(self.temp.game_space,has_item(["C"]))#6

    def testMove2Hamcr(self):
        self.temp.move(1, 1)
        self.temp.move(2, 2)
        self.temp.move(1, 3)
        self.temp.move(2, 4)
        self.temp.move(1, 5)
        self.temp.move(2, 6)
        self.temp.move(1, 7)
        assert_that(self.temp.game_space,equal_to([["C"], ["Z"], ["C"], ["Z"], ["C"], ["Z"], ["C"]]))#7
    def testMove3Hamcr(self):
        self.temp.move(1,6)
        self.temp.move(2, 6)
        self.temp.move(1, 6)
        self.temp.move(1, 6)
        assert_that(self.temp.game_space[5],is_not(empty()))#8

    def testMove4Hamcr(self):
        self.temp.move(1, 6)
        self.temp.move(2, 6)
        self.temp.move(1, 6)
        self.temp.move(1, 6)
        self.temp.move(2, 5)
        self.temp.move(1, 5)
        self.temp.move(2, 5)
        assert_that(self.temp.game_space[2],empty())#9

    def testMove5Hamcr(self):
        self.temp.move(1, 1)
        self.temp.move(2, 2)
        self.temp.move(1, 3)
        self.temp.move(2, 4)
        self.temp.move(1, 5)
        self.temp.move(2, 6)
        self.temp.move(1, 7)
        assert_that(self.temp.game_space,is_not(equal_to([[], [], [], [], [], [], []])))

    def testMove6HamcrValueError(self):
        self.temp.move(1, 1)
        self.temp.move(2, 1)
        self.temp.move(1, 1)
        self.temp.move(2, 1)
        self.temp.move(1, 1)
        self.temp.move(2, 1)
        assert_that(calling(self.temp.move).with_args(1,1),raises(ValueError))#10

    def testMove7HamcrValueError(self):
        assert_that(calling(self.temp.move).with_args(0,1),raises(ValueError))

    def testMove8HamcrValueError(self):
        assert_that(calling(self.temp.move).with_args(3,1),raises(ValueError))

    def testMove9HamcrValueError(self):
        assert_that(calling(self.temp.move).with_args(1,10),raises(ValueError))

    def testMove10HamcrValueError(self):
        assert_that(calling(self.temp.move).with_args(2,-1),raises(ValueError))

    def testMove11HamcrValueError(self):
        assert_that(calling(self.temp.move).with_args(2,[1]),raises(ValueError))

    def testMove12HamcrValueError(self):
        assert_that(calling(self.temp.move).with_args(2,"2"),raises(ValueError))

    def testMove13HamcrMoveHistory(self):
        assert_that(self.temp.move_history,empty())

    def testMove14HamcrMoveHistory(self):
        self.temp.move(1,1)
        assert_that(self.temp.move_history,is_not(empty()))

    def testMove15HamcrMoveHistory(self):
        self.temp.move(2,6)
        self.temp.move(1, 6)
        self.temp.move(2, 1)
        self.temp.move(1, 6)
        assert_that(self.temp.move_history,contains_exactly(5,5,0,5))

    def testMove16HamcrMoveHistory(self):
        self.temp.move(2,6)
        self.temp.move(1, 2)
        self.temp.move(2, 1)
        self.temp.move(1, 7)
        assert_that(self.temp.move_history,contains_inanyorder(6,5,1,0))

    #testy metody undo_move
    def testUndo_Move1Hamcr(self):
        self.temp.game_space=[["C"], ["Z"], ["C"], ["C"], ["Z"], ["Z"], ["C"]]
        self.temp.move_history=[0,1,2,4,6,5,3]
        self.temp.undo_move()
        self.temp.undo_move()
        assert_that(self.temp.game_space,equal_to([["C"], ["Z"], ["C"], [], ["Z"], [], ["C"]]))

    def testUndo_Move2Hamcr(self):
        self.temp.game_space=[["C","Z"], ["C","Z"], ["C"], ["Z"], [], [], []]
        self.temp.move_history=[1,1,0,0,2,3]
        self.temp.undo_move()
        self.temp.undo_move()
        self.temp.undo_move()
        self.temp.undo_move()
        assert_that(self.temp.game_space, equal_to([[], ["C","Z"], [], [], [], [], []]))

    def testUndo_Move3Hamcr(self):
        self.temp.game_space=[["C"], [], [], ["C"], ["Z"], [], ["Z"]]
        self.temp.move_history=[0,6,3,4]
        self.temp.undo_move()
        self.temp.undo_move()
        assert_that(self.temp.move_history,has_length(2))

    def testUndo_Move4Hamcr(self):
        self.temp.game_space=[["C"], ["C"], ["Z"], ["Z"], [], [], ["C","Z","C"]]
        self.temp.move_history=[0,2,6,6,1,3,6]
        self.temp.undo_move()
        self.temp.undo_move()
        assert_that(self.temp.move_history,contains_exactly(0,2,6,6,1))

    def testUndo_Move5Hamcr(self):
        assert_that(calling(self.temp.undo_move),raises(ValueError))

    # testy metody checker
    def testChecker1Hamcr(self):
        self.temp.game_space=[["C"], ["Z"], ["C"], ["Z"], ["C"], ["Z"], ["C"]]
        assert_that(self.temp.checker(7),equal_to(None))

    def testChecker2Hamcr(self):
        self.temp.game_space=[["C"], ["Z","C"], ["C","C","C"], ["Z","Z","Z","C"], ["C","Z","C","Z","C"], ["Z"], ["C"]]
        assert_that(self.temp.checker(3),equal_to("wygrana"))

    def testChecker3Hamcr(self):
        self.temp.game_space=[[], [], [], ["C"], ["C"], ["C"], ["C"]]
        assert_that(self.temp.checker(7),has_length(7))

    def testChecker4Hamcr(self):
        self.temp.game_space=[["Z"], ["Z"], ["Z"], ["C"], ["C"], ["Z"], ["Z"]]
        assert_that(self.temp.checker(1),equal_to(None))

    def testChecker5Hamcr(self):
        self.temp.game_space=[["Z","Z","Z","C","C","C"], [], [], [], [], [], []]
        assert_that(self.temp.checker(1),equal_to(None))

    def testChecker6Hamcr(self):
        self.temp.game_space=[["Z","C","C","Z","Z","Z"], ["C","Z","Z","Z","C","Z"], ["Z","C","C","C","Z","C"], ["C","C","Z","Z","Z","C"], ["Z","C","Z","C","C","Z"], ["C","Z","C","Z","Z","C"], ["Z","C","Z","C","C","Z"]]
        assert_that(self.temp.checker(1),equal_to("remis"))

    def testChecker7HamcrError(self):
        assert_that(calling(self.temp.checker).with_args(100),raises(ValueError))

    def testChecker8HamcrError(self):
        assert_that(calling(self.temp.checker).with_args({1}),raises(ValueError))

    #test wasnym matcherem
    def testIsHeight1(self):
        self.temp.game_space=[["C","Z"], ["Z"], ["Z"], ["C"], ["Z"], ["Z"], ["C"]]
        assert_that(self.temp.game_space,is_height(2))

    def testIsHeight2(self):
        assert_that(self.temp.game_space, is_height(0))

    def testIsHeight3(self):
        self.temp.move(1, 6)
        self.temp.move(2, 6)
        self.temp.move(1, 6)
        self.temp.move(1, 6)
        assert_that(self.temp.game_space, is_height(4))

    def testIsHeight4(self):
        self.temp.move(1, 1)
        self.temp.move(2, 2)
        self.temp.move(1, 3)
        self.temp.move(1, 2)
        self.temp.move(1, 6)
        self.temp.move(2, 5)
        self.temp.move(1, 2)
        self.temp.move(1, 3)
        assert_that(self.temp.game_space, is_height(3))

    def testIsHeight5(self):
        self.temp.move(2, 6)
        self.temp.move(1, 2)
        self.temp.move(2, 1)
        self.temp.move(1, 7)
        assert_that(self.temp.game_space, is_height(1))




