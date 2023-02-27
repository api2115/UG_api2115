class Connect4():
    def __init__(self,game_space,first_player_colour,second_player_colour,move_history):
        #planasza
        self.game_space = game_space
        #kolor pierwszego gracza
        self.fpc = first_player_colour
        #kolor drugiego gracza
        self.spc = second_player_colour
        #historia ruchow do cofania
        self.move_history = move_history

    #"Drukuje" plansze
    def print(self):
        r"""
        :return: str

        >>> c=Connect4([[]for i in range(7)],"C","Z",[])
        >>> c.print()
        '0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n'
        >>> c.game_space=[["C","Z","C","Z","C","Z"], [], [], [], [], [], []]
        >>> c.print()
        'Z 0 0 0 0 0 0 \nC 0 0 0 0 0 0 \nZ 0 0 0 0 0 0 \nC 0 0 0 0 0 0 \nZ 0 0 0 0 0 0 \nC 0 0 0 0 0 0 \n'

        """

        space=""
        for i in range(6,0,-1):
            for e in range(7):
                if len(self.game_space[e])<i:
                    space+="0 "
                else:
                    space+=self.game_space[e][i-1]+" "
                if e==6:
                    space+='\n'
        return space

    #Sprawdza czy dany ruch jest ruchem wygrywajacym
    def checker(self,index):
        """

        :param index: int
        :return: str

        >>> c=Connect4([[]for i in range(7)],"C","Z",[])
        >>> c.game_space=[["C"], ["C"], ["C"], ["C"], [], [], []]
        >>> c.checker(3)
        'wygrana'

        >>> c.game_space=[["C"], ["Z"], ["C"], ["C"], ["C"], [], []]
        >>> c.checker(1)

        """

        if type(index)!=int:
            raise ValueError("zly typ")
        if index>7 or index<1:
            raise ValueError("zla liczba")
        checker_game_space = [[] for i in range(7)]
        for i in range(6, 0, -1):
            for e in range(7):
                if len(self.game_space[e]) < i:
                    checker_game_space[e].insert(0, 0)
                else:
                    checker_game_space[e].append(self.game_space[e][i - 1])

        score = 0
        height = len(checker_game_space[index - 1]) - len(self.game_space[index - 1])

        for k in range(6):
            if checker_game_space[index - 1][k] == self.game_space[index - 1][-1]:
                score += 1
            elif score < 4:
                score = 0
        if score >= 4:
            return "wygrana"

        score = 0
        for k in range(7):
            if checker_game_space[k][height] == self.game_space[index - 1][-1]:
                score += 1
            elif score < 4:
                score = 0
        if score >= 4:
            return "wygrana"

        score = 0
        for k in range(20):
            if index - 7 + k >= 0 and height - 6 + k >= 0 and index - 7 + k < 7 and height - 6 + k < 6:
                if checker_game_space[index - 7 + k][height - 6 + k] == self.game_space[index - 1][-1]:
                    score += 1
                elif score < 4:
                    score = 0
        if score >= 4:
            return "wygrana"

        score = 0
        for k in range(20):
            if index - 7 + k >= 0 and height + 6 - k >= 0 and index - 7 + k < 7 and height + 6 - k < 6:
                if checker_game_space[index - 7 + k][height + 6 - k] == self.game_space[index - 1][-1]:
                    score += 1
                elif score < 4:
                    score = 0
        if score >= 4:
            return "wygrana"

        check_list = [item for sublist in self.game_space for item in sublist]
        if len(check_list) == len(checker_game_space) * len(checker_game_space[0]):
            return "remis"

    #"Wrzuca" krazek na plansze
    def move(self,player,move):
        r"""

        :param player: int
        :param move: int
        :return: str

        >>> c=Connect4([[]for i in range(7)],"C","Z",[])
        >>> c.move(1,2)
        '0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 C 0 0 0 0 0 \n'
        >>> c.move(2,2)
        '0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 Z 0 0 0 0 0 \n0 C 0 0 0 0 0 \n'
        >>> c.move(1,1)
        '0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 Z 0 0 0 0 0 \nC C 0 0 0 0 0 \n'
        >>> c.move(1,3)
        '0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 Z 0 0 0 0 0 \nC C C 0 0 0 0 \n'
        >>> c.move(1,4)
        'wygrana'

        """

        if type(player)!=int:
            raise ValueError("gracz musi byc reprezentowany jako 1 albo 2")
        if player>2 or player<1:
            raise ValueError("gracz musi byc reprezentowany jako 1 albo 2")
        if type(move)!=int:
            raise ValueError("podaj liczbe")
        if move>7 or move<1:
            raise ValueError("zla liczba")
        if len(self.game_space[move-1])>=6:
            raise ValueError("wybrales pelna kolumne")
        if player==1:
            self.game_space[move-1].append(self.fpc)
            self.move_history.append(move-1)
        else:
            self.game_space[move - 1].append(self.spc)
            self.move_history.append(move - 1)
        if self.checker(move) != "wygrana":
            return self.print()
        else:
            return self.checker(move)

    #Cofa ruch
    def undo_move(self):

        r"""

        :return: str
        >>> c=Connect4([["C"], ["Z"], ["C"], ["C"], ["C"], [], []],"C","Z",[0,1,2,3,4])
        >>> c.undo_move()
        '0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \nC Z C C 0 0 0 \n'
        >>> c.undo_move()
        '0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \nC Z C 0 0 0 0 \n'
        >>> c.undo_move()
        '0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \nC Z 0 0 0 0 0 \n'
        >>> c.undo_move()
        '0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \nC 0 0 0 0 0 0 \n'
        >>> c.undo_move()
        '0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n0 0 0 0 0 0 0 \n'
        >>> c.undo_move()
        Traceback (most recent call last):
        ...
        ValueError: nie da sie cofnac ruchu

        """

        if len(self.move_history) > 0:
            self.game_space[self.move_history[-1]].pop(-1)
            self.move_history.pop(-1)
            return self.print()
        else:
            raise ValueError("nie da sie cofnac ruchu")


if __name__ == "__main__":
    import doctest
    doctest.testmod()