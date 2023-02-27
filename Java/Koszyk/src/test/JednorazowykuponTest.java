package test;

import Koszyk.komendy.AddToCart;
import Koszyk.komendy.Jednorazowykupon;
import Koszyk.koszyk.Controler;
import Koszyk.koszyk.Koszyk;
import Koszyk.koszyk.Produkt;

import org.junit.*;
import static org.junit.Assert.*;

public class JednorazowykuponTest {
    private Koszyk koszyk;
    private Controler controler;

    @Before
    public void setUp(){
        koszyk = new Koszyk();
        controler = new Controler();
    }

    @Test
    public void work(){
        Produkt p1=new Produkt("1","p1",50.0);
        controler.execute(new AddToCart(koszyk,p1,2));
        controler.execute(new Jednorazowykupon(koszyk,p1,0.3));
        assertEquals(0.3,koszyk.getPrzedmioty()[koszyk.CzywKoszyku(p1)].getRabat(),0.01);
    }

    @Test
    public void work2(){
        Produkt p1=new Produkt("1","p1",50.0);
        Produkt p2=new Produkt("2","p2",50.0);
        controler.execute(new AddToCart(koszyk,p1,2));
        controler.execute(new AddToCart(koszyk,p2,2));
        controler.execute(new Jednorazowykupon(koszyk,p1,0.3));
        assertEquals(0.0,koszyk.getPrzedmioty()[koszyk.CzywKoszyku(p2)].getRabat(),0.01);
    }


}
