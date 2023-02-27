package stosRPN;

import org.junit.*;

import static org.junit.Assert.*;

public class RPNTest {

    private RPN sut;

    @Test
    public void testADD1(){
        sut = new RPN("2 12 +");
        int result = sut.solve();
        assertEquals(result,14);
    }


    @Test
    public void testDivide1(){
        sut = new RPN("24 12 /");
        int result = sut.solve();
        assertEquals(result,2);
    }

    @Test
    public void testSubtr1(){
        sut = new RPN("24 12 -");
        int result = sut.solve();
        assertEquals(result,12);
    }

    @Test
    public void testMultiply1(){
        sut = new RPN("24 10 *");
        int result = sut.solve();
        assertEquals(result,240);
    }

    @Test
    public void testSubtr2(){
        sut = new RPN("3 1 -");
        int result = sut.solve();
        assertEquals(result,2);
    }

    @Test
    public void testMulti1(){
        sut = new RPN("3 3 + 3 /");
        int result = sut.solve();
        assertEquals(result,2);
    }

    @Test
    public void testMulti2(){
        sut = new RPN("2 3 4 + *");
        int result = sut.solve();
        assertEquals(result,14);
    }


    @Test
    public void testMulti3(){
        sut = new RPN("2 3 + 5 *");
        int result = sut.solve();
        assertEquals(result,25);
    }

    @Test
    public void testMulti4(){
        sut = new RPN("2 7 + 3 / 14 3 - 4 * + 2 /");
        int result = sut.solve();
        assertEquals(result,23);
    }

    @Test
    public void testMulti5(){
        sut = new RPN("12 2 3 4 * 10 5 / + * +");
        int result = sut.solve();
        assertEquals(result,40);
    }

    @Test
    public void testMulti6(){
        sut = new RPN("1 2 + 4 * 5 + 3 -");
        int result = sut.solve();
        assertEquals(result,14);
    }

}
