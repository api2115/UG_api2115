package Koszyk;

import Koszyk.komendy.*;
import Koszyk.koszyk.Controler;
import Koszyk.koszyk.Koszyk;
import Koszyk.koszyk.Produkt;

public class Main {
    public static void main(String[] args){

        Koszyk koszyk = new Koszyk();

        Produkt p1 = new Produkt("1","p1",100);
        Produkt p2 = new Produkt("2","p2",200);
        Produkt p3 = new Produkt("3","p3",20);
        Controler controler = new Controler();

        controler.execute(new AddToCart(koszyk,p1,3));
        controler.execute(new AddToCart(koszyk,p2,1));
        System.out.println(koszyk.PrintPrzedmioty("asc"));
        controler.execute(new AddToCart(koszyk,p3,3));
        controler.execute(new KubekGratis(koszyk));
        System.out.println(koszyk.PrintPrzedmioty("asc"));
        controler.execute(new Trzecigratis(koszyk));
        System.out.println(koszyk.PrintPrzedmioty("dsc"));
        controler.execute(new Trzystarabat(koszyk));

        controler.execute(new Jednorazowykupon(koszyk,p1,0.3));
        System.out.println(koszyk.PrintPrzedmioty("dsc"));




    }

}
