package Koszyk.komendy;

import Koszyk.koszyk.Koszyk;
import Koszyk.koszyk.Produkt;

public class AddToCart extends Command {
    private final Produkt produkt;
    private final int ilosc;

    public AddToCart(Koszyk koszyk, Produkt produkt, int ilosc){
        super(koszyk);
        this.produkt=produkt;
        this.ilosc=ilosc;
    }



    @Override
    public boolean canExecute() {
        return true;
    }

    @Override
    public void execute(){
        koszyk.dodajProdukt(produkt,ilosc);
    }

    @Override
    public void undo(){
        koszyk.usunProdukt(produkt,ilosc);
    }

}
