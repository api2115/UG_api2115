package test;

import Koszyk.komendy.AddToCart;
import Koszyk.komendy.Trzecigratis;
import Koszyk.komendy.Trzystarabat;
import Koszyk.koszyk.Controler;
import Koszyk.koszyk.Koszyk;
import Koszyk.koszyk.Produkt;

import org.junit.*;
import static org.junit.Assert.*;

public class TrzystarabatTest {
    private Koszyk koszyk;
    private Controler controler;

    @Before
    public void setUp(){
        koszyk = new Koszyk();
        controler = new Controler();
    }

    @Test
    public void work(){
        Produkt p1=new Produkt("1","p1",70.0);
        Produkt p2=new Produkt("2","p2",60.0);
        Produkt p3=new Produkt("3","p3",50.0);
        controler.execute(new AddToCart(koszyk,p1,1));
        controler.execute(new AddToCart(koszyk,p2,2));
        controler.execute(new AddToCart(koszyk,p3,3));
        controler.execute(new Trzystarabat(koszyk));
        assertEquals(322,koszyk.getCenaCalkowitaRabat(),0.01);
    }

    @Test
    public void work2(){
        Produkt p1=new Produkt("1","p1",70.0);
        Produkt p2=new Produkt("2","p2",60.0);
        Produkt p3=new Produkt("3","p3",50.0);
        controler.execute(new AddToCart(koszyk,p1,1));
        controler.execute(new AddToCart(koszyk,p2,2));
        controler.execute(new AddToCart(koszyk,p3,3));
        controler.execute(new Trzystarabat(koszyk));
        assertEquals(0.05,koszyk.getPrzedmioty()[0].getRabat(),0.01);
    }

    @Test
    public void notwork(){
        Produkt p1=new Produkt("1","p1",70.0);
        Produkt p2=new Produkt("2","p2",60.0);
        Produkt p3=new Produkt("3","p3",50.0);
        controler.execute(new AddToCart(koszyk,p1,1));
        controler.execute(new AddToCart(koszyk,p2,1));
        controler.execute(new AddToCart(koszyk,p3,1));
        controler.execute(new Trzystarabat(koszyk));
        assertEquals(180,koszyk.getCenaCalkowitaRabat(),0.01);
    }

}
