import unittest
from sample.Connect4 import *

class Connect4Test(unittest.TestCase):

    def setUp(self):
        self.temp=Connect4([[]for i in range(7)],"C","Z",[])

    #testy metody print
    def testPrint1(self):
        self.assertEqual("0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n",self.temp.print())

    def testPrint2(self):
        self.temp.game_space=[[], [], ["C"], ["C","Z","C"], ["Z"], [], []]
        self.assertEqual("0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 C 0 0 0 \n0 0 0 Z 0 0 0 \n0 0 C C Z 0 0 \n",self.temp.print())

    def testPrint3(self):
        self.temp.game_space=[["Z"], ["Z"], ["C"], ["C","Z","C"], ["Z"], ["C"], ["Z"]]
        self.assertEqual("0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 C 0 0 0 \n0 0 0 Z 0 0 0 \nZ Z C C Z C Z \n",self.temp.print())

    #testy metody move
    def testMove1(self):
        self.temp.move(1,6)
        self.temp.move(2, 5)
        self.temp.move(1, 6)
        self.temp.move(2, 5)
        self.temp.move(1, 6)
        self.temp.move(2, 5)
        self.temp.move(1, 5)
        self.temp.move(2, 6)
        self.assertEqual([[], [], [], [], ["Z","Z","Z","C"], ["C","C","C","Z"], []],self.temp.game_space)

    def testMove2(self):
        self.temp.move(1, 6)
        self.temp.move(2, 5)
        self.temp.move(1, 6)
        self.temp.move(2, 5)
        self.temp.move(1, 6)
        self.temp.move(2, 5)
        self.temp.move(1, 5)
        self.temp.move(2, 6)
        self.assertEqual([5,4,5,4,5,4,4,5],self.temp.move_history)

    def testMove3ValueError(self):
        self.assertRaises(ValueError,self.temp.move,0,1)

    def testMove4ValueError(self):
        self.assertRaises(ValueError,self.temp.move,1,None)

    def testMove5Checker(self):
        self.temp.game_space=[["C"], ["C"], ["C"], [], ["Z","C"], [], []]
        self.assertEqual(self.temp.move(1,4),"wygrana")

    #testy metody undo_move
    def testUndo_Move1ValueError(self):
        self.assertRaises(ValueError,self.temp.undo_move)

    def testUndo_Move2(self):
        self.temp.game_space=[["C"], [], [], ["Z"], ["Z","C"], [], []]
        self.temp.move_history=[0,4,4,3]
        self.temp.undo_move()
        self.temp.undo_move()
        self.assertEqual(self.temp.game_space,[["C"], [], [], [], ["Z"], [], []])

    def testUndo_Move3(self):
        self.temp.game_space=[["Z"], [], [], ["C"], ["Z","C","Z"], [], ["C"]]
        self.temp.move_history=[6,0,3,4,4,4]
        self.temp.undo_move()
        self.temp.undo_move()
        self.assertEqual(self.temp.game_space,[["Z"], [], [], ["C"], ["Z"], [], ["C"]])

    # testy metody checker
    def testChecker1Error(self):
        self.temp.game_space = [["Z"], [], [], ["C"], ["Z", "C", "Z"], [], ["C"]]
        self.assertRaises(ValueError,self.temp.checker,-1)

    def testChecker2Error(self):
        self.temp.game_space = [["Z"], [], [], ["C"], ["Z", "C", "Z"], [], ["C"]]
        self.assertRaises(ValueError,self.temp.checker,"4")

    def testChecker3Lose(self):
        self.temp.game_space = [["Z"], [], [], ["C"], ["Z", "C", "Z"], [], ["C"]]
        self.assertEqual(self.temp.checker(1),None)

    def testChecker4Win(self):
        self.temp.game_space = [["Z"], [], [], ["C","C","C","Z"], ["Z", "C", "Z"], ["C","Z"], ["Z"]]
        self.assertEqual(self.temp.checker(5),"wygrana")