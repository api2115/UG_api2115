import unittest
from parameterized import parameterized,parameterized_class
from sample.Connect4 import *

class Connect4_Test1(unittest.TestCase):

    def setUp(self):
        self.temp=Connect4([[]for i in range(7)],"C","Z",[])

    #testy metody print
    @parameterized.expand([
        ([[], [], [], [], [], [], []],"0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n"),
        ([["C"], [], [], [], [], [], []],"0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \nC 0 0 0 0 0 0 \n"),
        ([["Z","C","C"], [], [], [], [], [], []],"0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \nC 0 0 0 0 0 0 \nC 0 0 0 0 0 0 \nZ 0 0 0 0 0 0 \n"),
        ([["C","Z","C"], ["Z","C"], ["C","Z","Z"], [], [], [], []],"0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \nC 0 Z 0 0 0 0 \nZ C Z 0 0 0 0 \nC Z C 0 0 0 0 \n"),
        ([["C","Z"], [], ["C"], ["Z"], [], [], ["Z","C"]],"0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \nZ 0 0 0 0 0 C \nC 0 C Z 0 0 Z \n")
    ])

    def test_print(self,space,expected):
        self.temp.game_space=space
        self.assertEqual(self.temp.print(),expected)

    #testy metody move
    @parameterized.expand([
        ([[], [], [], [], [], [], []],[["C"], [], [], [], [], [], []],1),
        ([[], ["C"], [], [], [], [], []], [[], ["C","C"], [], [], [], [], []], 2),
        ([["C","Z","Z"], [], [], [], [], [], []], [["C","Z","Z","C"], [], [], [], [], [], []], 1),
        ([["C"], ["Z"], ["C"], ["Z"], ["Z","Z","C"], ["Z"], ["C","C"]], [["C"], ["Z"], ["C"], ["Z"], ["Z","Z","C","C"], ["Z"], ["C","C"]], 5),
        ([[], [], ["C"], ["Z","Z"], ["C"], [], []], [[], [], ["C"], ["Z","Z","C"], ["C"], [], []], 4),
    ])

    def test_move_player1(self,space,expected,move):
        self.temp.game_space = space
        self.temp.move(1, move)
        self.assertEqual(self.temp.game_space,expected)

    @parameterized.expand([
        ([[], [], [], [], [], [], []], [["Z"], [], [], [], [], [], []], 1),
        ([[], ["C"], [], [], [], [], []], [[], ["C", "Z"], [], [], [], [], []], 2),
        ([["C", "Z", "Z"], [], [], [], [], [], []], [["C", "Z", "Z", "Z"], [], [], [], [], [], []], 1),
        ([["C"], ["Z"], ["C"], ["Z"], ["Z", "Z", "C"], ["Z"], ["C", "C"]],[["C"], ["Z"], ["C"], ["Z"], ["Z", "Z", "C", "Z"], ["Z"], ["C", "C"]], 5),
        ([[], [], ["C"], ["Z", "Z"], ["C"], [], []], [[], [], ["C"], ["Z", "Z", "Z"], ["C"], [], []], 4),
    ])

    def test_move_player2(self, space, expected, move):
        self.temp.game_space = space
        self.temp.move(2, move)
        self.assertEqual(self.temp.game_space, expected)

    @parameterized.expand([
        ([[], [], [], [], [], [], []],[1]),
        ([[], [], [], [], [], [], []], 8),
        ([[], [], [], [], [], [], []], -1),
        ([[], [], [], [], [], [], []], None),
        ([[], [], [], [], [], [], []], "2")
    ])

    def test_move_wrong_move(self,space,move):
        self.temp.game_space=space
        self.assertRaises(ValueError,self.temp.move,1,move)

    #testy metody undo_move

    @parameterized.expand([
        ([["C"], ["Z","C"], ["C"], ["Z"], [], [], []],[0,1,2,3,1],[["C"], ["Z"], ["C"], ["Z"], [], [], []]),
        ([[], ["C","Z"], ["C"], [], [], [], []], [1, 1, 2], [[], ["C","Z"], [], [], [], [], []]),
        ([[], [], [], [], ["C","Z"], ["Z","C"], ["C","Z"]], [6,5,4,6,5,4], [[], [], [], [], ["C"], ["Z","C"], ["C","Z"]])
    ])

    def test_undo_once(self,game_space,move_history,expected):
        self.temp.game_space=game_space
        self.temp.move_history=move_history
        self.temp.undo_move()
        self.assertEqual(self.temp.game_space,expected)

    @parameterized.expand([
        ([["C"], ["Z", "C"], ["C"], ["Z"], [], [], []], [0, 1, 2, 3, 1], [["C"], ["Z"], ["C"], [], [], [], []]),
        ([[], ["C", "Z"], ["C"], [], [], [], []], [1, 1, 2], [[], ["C"], [], [], [], [], []]),
        ([[], [], [], [], ["C", "Z"], ["Z", "C"], ["C", "Z"]], [6, 5, 4, 6, 5, 4],
         [[], [], [], [], ["C"], ["Z"], ["C", "Z"]])
    ])
    def test_undo_twice(self, game_space, move_history, expected):
        self.temp.game_space = game_space
        self.temp.move_history = move_history
        self.temp.undo_move()
        self.temp.undo_move()
        self.assertEqual(self.temp.game_space, expected)

    @parameterized.expand([
        ([["C"], ["Z", "C"], ["C"], ["Z"], [], [], []], [0, 1, 2, 3, 1], [["C"], ["Z"], [], [], [], [], []]),
        ([[], ["C", "Z"], ["C"], [], [], [], []], [1, 1, 2], [[], [], [], [], [], [], []]),
        ([[], [], [], [], ["C", "Z"], ["Z", "C"], ["C", "Z"]], [6, 5, 4, 6, 5, 4],
         [[], [], [], [], ["C"], ["Z"], ["C"]])
    ])
    def test_undo_tripple(self, game_space, move_history, expected):
        self.temp.game_space = game_space
        self.temp.move_history = move_history
        self.temp.undo_move()
        self.temp.undo_move()
        self.temp.undo_move()
        self.assertEqual(self.temp.game_space, expected)

    # testy metody checker
    #testy prametryczne parametrized_class

@parameterized_class(('game_space','index'),[
        ([["C"], ["Z","C"], ["C","Z","C"], ["Z","C","Z","C"], [], [], []], 4),
        ([[], ["C","C","C","C"], [], [], [], [], []], 2),
        ([["Z"], ["C"], ["C"], ["Z"], ["Z"], ["Z"], ["Z"]], 7)
    ])
class Checker_Class_Test_Win(unittest.TestCase):
    def setUp(self):
         self.temp=Connect4([[]for i in range(7)],"C","Z",[])

    def test_checker_win(self):
        self.temp.game_space = self.game_space
        self.assertEqual(self.temp.checker(self.index), "wygrana")

@parameterized_class(('game_space', 'index'), [
        ([["C"], ["Z", "C"], ["C", "Z", "C"], ["Z", "C", "Z"], [], [], []], 4),
        ([[], ["C", "Z", "C", "C", "C"], [], [], [], [], []], 2),
        ([["Z"], ["C"], ["C"], ["Z"], ["Z"], ["Z"], []], 6)
    ])
class Checker_Class_Test_Lose(unittest.TestCase):
    def setUp(self):
        self.temp = Connect4([[] for i in range(7)], "C", "Z", [])

    def test_checker_win(self):
        self.temp.game_space = self.game_space
        self.assertEqual(self.temp.checker(self.index), None)

@parameterized_class(('game_space', 'index'), [
        ([["C"], ["Z", "C"], ["C", "Z", "C"], ["Z", "C", "Z"], [], [], []], None),
        ([[], ["C", "Z", "C", "C", "C"], [], [], [], [], []], -100)
    ])

class Checker_Class_Test_Error(unittest.TestCase):
    def setUp(self):
        self.temp = Connect4([[] for i in range(7)], "C", "Z", [])

    def test_checker_win(self):
        self.temp.game_space = self.game_space
        self.assertRaises(ValueError,self.temp.checker,self.index)