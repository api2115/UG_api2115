package Koszyk.komendy;

import Koszyk.koszyk.Koszyk;

public abstract class Command {
    public Koszyk koszyk;

    Command(Koszyk koszyk){
        this.koszyk=koszyk;
    }

    public abstract boolean canExecute();

    public abstract void execute();

    public abstract void undo();

}
