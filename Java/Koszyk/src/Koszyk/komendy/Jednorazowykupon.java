package Koszyk.komendy;

import Koszyk.koszyk.Element;
import Koszyk.koszyk.Koszyk;
import Koszyk.koszyk.Produkt;

public class Jednorazowykupon extends Command{
    private final Produkt produkt;
    private final double rabat;
    private boolean uzyty;
    private Element element;

    public Jednorazowykupon(Koszyk koszyk, Produkt produkt, double rabat){
        super(koszyk);
        this.produkt=produkt;
        this.rabat=rabat;
        this.uzyty =false;
    }

    @Override
    public boolean canExecute(){
        return koszyk.CzywKoszyku(produkt) != -1 && !uzyty;
    }

    @Override
    public void execute(){
        int index = koszyk.CzywKoszyku(produkt);
        koszyk.getPrzedmioty()[index].setRabat(koszyk.getPrzedmioty()[index].getRabat()+rabat);
        uzyty=true;
    }

    @Override
    public void undo(){
        int index = koszyk.CzywKoszyku(produkt);
        koszyk.getPrzedmioty()[index].setRabat(koszyk.getPrzedmioty()[index].getRabat()-rabat);
        uzyty=false;
    }

}
