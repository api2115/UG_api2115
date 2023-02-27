import unittest
import json
from sample.Connect4 import *


class Connect4ParametrizedFileTests(unittest.TestCase):

    def test_from_fileWin(self):
        fileTest = open("../data/Connect4TestDataWin")
        tmpConnect4=Connect4([[]for i in range(7)],"C","Z",[])
        for line in fileTest:
            if line.startswith("#") or line.startswith(" ") or line.startswith("\n"):
                continue
            else:
                data = line.split(";")
                inp, index = json.loads(data[0]), int(data[1])
                tmpConnect4.game_space=inp
                self.assertEqual(tmpConnect4.checker(index),"wygrana")
        fileTest.close()

    def test_from_fileLose(self):
        fileTest = open("../data/Connect4TestDataLose")
        tmpConnect4=Connect4([[]for i in range(7)],"C","Z",[])
        for line in fileTest:
            if line.startswith("#") or line.startswith(" ") or line.startswith("\n"):
                continue
            else:
                data = line.split(";")
                inp, index = json.loads(data[0]), int(data[1])
                tmpConnect4.game_space=inp
                self.assertEqual(tmpConnect4.checker(index),None)
        fileTest.close()

    def test_from_fileError(self):
        fileTest = open("../data/Connect4TestDataError")
        tmpConnect4=Connect4([[]for i in range(7)],"C","Z",[])
        for line in fileTest:
            if line.startswith("#") or line.startswith(" ") or line.startswith("\n"):
                continue
            else:
                data = line.split(";")
                inp, index = json.loads(data[0]), data[1]
                tmpConnect4.game_space=inp
                self.assertRaises(ValueError,tmpConnect4.checker,index)
        fileTest.close()






