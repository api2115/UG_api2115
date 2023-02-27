import pygad
import numpy
import matplotlib.pyplot as plt
import time

Plansza = [[-1, 5, 4, -1, -1],
           [-1, -1, -1, -1, 3],
           [-1, 5, 6, -1, 5],
           [0, 2, 5, -1, 5],
           [-1, -1, -1, -1, -1]]


def findnotzeroindexes(board):
    flatboard = [num for sublist in board for num in sublist]
    indexes = []
    for i in range(len(flatboard)):
        if flatboard[i] != -1:
            indexes.append([int((i - (i % len(board[0]))) / len(board[0])), i % len(board[0])])
    return indexes


indexes = findnotzeroindexes(Plansza)

gene_space = [0, 1]


def printresult(result):
    print(result)
    plt.imshow(result, cmap='gray_r')
    plt.show()


def make_a_board(solution, board):
    newSolution = []
    for i in range(1, len(board) + 1):
        newSolution.append(solution[(i - 1) * len(board[0]):i * len(board[0])])
    return newSolution


def roundsum(board, idY, idX):
    idxY = idY + 1
    idxX = idX + 1
    newBoard = [[0] * (len(board[0]) + 2)]
    for i in range(len(board)):
        newBoard.append(board[i].tolist())
        newBoard[i + 1].append(0)
        newBoard[i + 1].insert(0, 0)
    newBoard.append([0] * (len(board[0]) + 2))
    suma = 0
    indexList = [[idxY - 1, idxX - 1], [idxY - 1, idxX], [idxY - 1, idxX + 1], [idxY, idxX - 1], [idxY, idxX],
                 [idxY, idxX + 1], [idxY + 1, idxX - 1], [idxY + 1, idxX], [idxY + 1, idxX + 1]]
    for idx in indexList:
        if newBoard[idx[0]][idx[1]] == 1:
            suma += 1
    return suma


def fitness_func(solution, solution_idx):
    sol = make_a_board(solution, Plansza)
    score = 0
    for el in indexes:
        num = roundsum(sol, el[0], el[1])
        if num != Plansza[el[0]][el[1]]:
            score -= numpy.abs(num - Plansza[el[0]][el[1]])
    return score


fitness_function = fitness_func

sol_per_pop = 100
num_genes = len(Plansza) * len(Plansza[0])

num_parents_mating = 35
num_generations = 1000
keep_parents = 20

parent_selection_type = "sss"

crossover_type = "single_point"

mutation_type = "random"
mutation_percent_genes = 5

ga_instance = pygad.GA(gene_space=gene_space,
                       num_generations=num_generations,
                       num_parents_mating=num_parents_mating,
                       fitness_func=fitness_function,
                       sol_per_pop=sol_per_pop,
                       num_genes=num_genes,
                       parent_selection_type=parent_selection_type,
                       keep_parents=keep_parents,
                       crossover_type=crossover_type,
                       mutation_type=mutation_type,
                       mutation_percent_genes=mutation_percent_genes,
                       stop_criteria=["reach_0", "saturate_350"])

ga_instance.run()

solution, solution_fitness, solution_idx = ga_instance.best_solution()
print("Fitness value of the best solution = {solution_fitness}".format(solution_fitness=solution_fitness))
printresult(make_a_board(solution, Plansza))

ga_instance.plot_fitness()

# time_list=[]
#
# for i in range(10):
#     s=time.time()
#     ga_instance.run()
#     e = time.time()
#     time_list.append(e-s)
#     print(i)
#
# print("sredni czas",sum(time_list)/10)
