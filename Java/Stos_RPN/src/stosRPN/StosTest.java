package stosRPN;

import org.junit.*;

import static org.junit.Assert.*;

public class StosTest {
    private Stos sut;

    @Before
    public void setup(){
        sut = new Stos();
    }


    @Test
    public void TestPushPeek(){
        sut.push(5);
        int result =sut.peek();
        assertEquals(5,result);
    }

    @Test
    public void TestPushPushPopPeek(){
        sut.push(10);
        sut.push(9);
        sut.pop();
        int result = sut.peek();
        assertEquals(10,result);
    }

    @Test
    public void TestPushPushPeek(){
        sut.push(212);
        sut.push(999);
        int result = sut.peek();
        assertEquals(999,result);
    }

    @Test
    public void TestPushx100Pop(){
        for (int i = 0; i < 100; i++) {
            sut.push(i);
        }
        int result = sut.pop();
        assertEquals(99,result);
    }

    @Test(expected = IllegalArgumentException.class)
    public void TestPushPopPop(){
        sut.push(987);
        sut.pop();
        sut.pop();
    }

    @Test(expected = IllegalArgumentException.class)
    public void TestPeekEmpty(){
        sut.peek();
    }

    @Test
    public void TestIsEmptyTrue(){
        assertTrue(sut.isEmpty());
    }

    @Test
    public void TestIsEmptyFalse(){
        sut.push(9887);
        assertFalse(sut.isEmpty());
    }
    
}
