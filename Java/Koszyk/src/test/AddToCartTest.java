package test;

import Koszyk.komendy.AddToCart;
import Koszyk.koszyk.Controler;
import Koszyk.koszyk.Koszyk;
import Koszyk.koszyk.Produkt;

import org.junit.*;
import static org.junit.Assert.*;


public class AddToCartTest {
    private Koszyk koszyk;
    private Controler controler;

    @Before
    public void setUp(){
        koszyk = new Koszyk();
        controler = new Controler();
    }

    @Test
    public void AddOne(){
        Produkt p1=new Produkt("1","p1",50.0);
        controler.execute(new AddToCart(koszyk,p1,2));
        assertNotEquals(-1,koszyk.CzywKoszyku(p1));
    }

    @Test
    public void Addtwosame(){
        Produkt p1=new Produkt("1","p1",50.0);
        controler.execute(new AddToCart(koszyk,p1,2));
        controler.execute(new AddToCart(koszyk,p1,1));
        koszyk.Sort("asc");
        assertEquals(1,koszyk.getPrzedmioty().length);
    }

    @Test
    public void Addtwodiff(){
        Produkt p1=new Produkt("1","p1",50.0);
        Produkt p2=new Produkt("1","p2",50.0);
        controler.execute(new AddToCart(koszyk,p1,2));
        controler.execute(new AddToCart(koszyk,p2,1));
        koszyk.Sort("asc");
        assertEquals(2,koszyk.getPrzedmioty().length);
    }

    @Test
    public void Addtwodiffundo(){
        Produkt p1=new Produkt("1","p1",50.0);
        Produkt p2=new Produkt("1","p2",50.0);
        controler.execute(new AddToCart(koszyk,p1,2));
        controler.execute(new AddToCart(koszyk,p2,1));
        controler.undo();
        koszyk.Sort("asc");
        assertEquals(1,koszyk.getPrzedmioty().length);
    }

    @Test
    public void Addtwodiffundoredo(){
        Produkt p1=new Produkt("1","p1",50.0);
        Produkt p2=new Produkt("1","p2",50.0);
        controler.execute(new AddToCart(koszyk,p1,2));
        controler.execute(new AddToCart(koszyk,p2,1));
        controler.undo();
        controler.redo();
        koszyk.Sort("asc");
        assertEquals(2,koszyk.getPrzedmioty().length);
    }

    @Test
    public void Addtwosamequantity(){
        Produkt p1=new Produkt("1","p1",50.0);
        controler.execute(new AddToCart(koszyk,p1,2));
        controler.execute(new AddToCart(koszyk,p1,1));
        assertEquals(3,koszyk.getPrzedmioty()[0].getIlosc());
    }



}
