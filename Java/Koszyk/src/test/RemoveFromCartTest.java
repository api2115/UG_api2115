package test;

import Koszyk.komendy.AddToCart;
import Koszyk.komendy.RemoveFromCart;
import Koszyk.koszyk.Controler;
import Koszyk.koszyk.Koszyk;
import Koszyk.koszyk.Produkt;

import org.junit.*;
import static org.junit.Assert.*;

public class RemoveFromCartTest {
    private Koszyk koszyk;
    private Controler controler;

    @Before
    public void setUp(){
        koszyk = new Koszyk();
        controler = new Controler();
    }

    @Test
    public void AddOneRemoveOne(){
        Produkt p1=new Produkt("1","p1",50.0);
        controler.execute(new AddToCart(koszyk,p1,1));
        controler.execute(new RemoveFromCart(koszyk,p1,1));
        koszyk.Sort("asc");
        assertEquals(0,koszyk.getPrzedmioty().length);
    }

    @Test
    public void AddOneRemoveOnequantity(){
        Produkt p1=new Produkt("1","p1",50.0);
        controler.execute(new AddToCart(koszyk,p1,2));
        controler.execute(new RemoveFromCart(koszyk,p1,1));
        koszyk.Sort("asc");
        assertEquals(1,koszyk.getPrzedmioty()[0].getIlosc());
    }

    @Test
    public void AddTwoRemoveOne(){
        Produkt p1=new Produkt("1","p1",50.0);
        Produkt p2=new Produkt("2","p2",50.0);
        controler.execute(new AddToCart(koszyk,p1,2));
        controler.execute(new AddToCart(koszyk,p2,2));
        controler.execute(new RemoveFromCart(koszyk,p1,2));
        assertEquals(-1,koszyk.CzywKoszyku(p1));
    }

    @Test
    public void AddTwoRemoveOnequantity(){
        Produkt p1=new Produkt("1","p1",50.0);
        Produkt p2=new Produkt("2","p2",50.0);
        controler.execute(new AddToCart(koszyk,p1,2));
        controler.execute(new AddToCart(koszyk,p2,2));
        controler.execute(new RemoveFromCart(koszyk,p1,1));
        assertEquals(1,koszyk.getPrzedmioty()[koszyk.CzywKoszyku(p1)].getIlosc());
    }


}
