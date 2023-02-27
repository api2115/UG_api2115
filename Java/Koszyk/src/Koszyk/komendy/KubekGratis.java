package Koszyk.komendy;

import Koszyk.koszyk.Koszyk;
import Koszyk.koszyk.Produkt;

public class KubekGratis extends Command{
    private final Produkt FirmowyKubek = new Produkt("999", "FirmowyKubek", 20);

    public KubekGratis(Koszyk koszyk){
        super(koszyk);
    }

    @Override
    public boolean canExecute() {
        return koszyk.getCenaCalkowita() >= 200;
    }

    @Override
    public void execute() {
        koszyk.dodajPrezent(FirmowyKubek);
    }

    @Override
    public void undo() {
        koszyk.usunPrezent(FirmowyKubek);
    }

}
