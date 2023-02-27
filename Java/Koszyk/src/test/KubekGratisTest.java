package test;

import Koszyk.komendy.AddToCart;
import Koszyk.komendy.KubekGratis;
import Koszyk.koszyk.Controler;
import Koszyk.koszyk.Koszyk;
import Koszyk.koszyk.Produkt;

import org.junit.*;
import static org.junit.Assert.*;

public class KubekGratisTest {
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
        controler.execute(new AddToCart(koszyk,p1,4));
        controler.execute(new KubekGratis(koszyk));
        assertEquals("FirmowyKubek",koszyk.getPrezenty()[0].getNazwa());
    }

    @Test
    public void notwork(){
        Produkt p1=new Produkt("1","p1",50.0);
        controler.execute(new AddToCart(koszyk,p1,3));
        controler.execute(new KubekGratis(koszyk));
        assertEquals(0,koszyk.getPrezenty().length);
    }

}
