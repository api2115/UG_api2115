package Koszyk.komendy;

import Koszyk.koszyk.Element;
import Koszyk.koszyk.Koszyk;
import Koszyk.koszyk.Produkt;

public class RemoveFromCart extends Command{
    private final Produkt produkt;
    private final int ilosc;

    public RemoveFromCart(Koszyk koszyk, Produkt produkt, int ilosc) {
        super(koszyk);
        this.produkt = produkt;
        this.ilosc = ilosc;
    }


    @Override
    public boolean canExecute(){
        int element = koszyk.CzywKoszyku(produkt);
        return element != -1 && koszyk.getPrzedmioty()[element].getIlosc() >= ilosc;
    }

    @Override
    public void execute() {
        koszyk.usunProdukt(produkt, ilosc);
    }

    @Override
    public void undo() {
        koszyk.dodajProdukt(produkt, ilosc);
    }


}
