package Koszyk.koszyk;

import Koszyk.komendy.Command;

import java.util.Stack;

public class Controler {
    private final Stack<Command> undoStack;
    private final Stack<Command> redoStack;

    public Controler() {
        undoStack = new Stack<>();
        redoStack = new Stack<>();
    }

    public boolean execute(Command command) {
        if (command.canExecute()) {
            command.execute();
            redoStack.clear();
            undoStack.add(command);
            return true;
        }
        return false;
    }

    public boolean undo() {
        if (!undoStack.isEmpty()) {
            Command command = undoStack.pop();
            command.undo();
            redoStack.push(command);
            return true;
        }
        return false;
    }

    public boolean redo() {
        if (!redoStack.isEmpty()) {
            Command command = redoStack.pop();
            command.execute();
            undoStack.push(command);
            return true;
        }
        return false;
    }

}
