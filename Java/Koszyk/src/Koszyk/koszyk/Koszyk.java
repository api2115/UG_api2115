package Koszyk.koszyk;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

public class Koszyk {
    private Element[] przedmioty;
    private Produkt[] prezenty;
    private int topOfprzedmioty;
    private int topOfprezenty;

    public Koszyk(){
        przedmioty = new Element[50];
        prezenty = new Produkt[50];
        topOfprzedmioty = -1;
        topOfprezenty = -1;
    }

    public void Sort(String type){
        List<Element> notnullprzedmioty=new ArrayList<Element>();
        for(Element element:przedmioty){
            if(element!=null){
                notnullprzedmioty.add(element);
            }
        }
        przedmioty=notnullprzedmioty.toArray(new Element[0]);

        if (type=="asc"){
            Arrays.sort(przedmioty, Comparator.comparing(Element::getCenaCalkowita));
        }
        if(type=="dsc"){
            Arrays.sort(przedmioty, Comparator.comparing(Element::getCenaCalkowita).reversed());
        }
    }


    public Element[] getPrzedmioty() {
        return przedmioty;
    }

    public Produkt[] getPrezenty(){
        List<Produkt> notnullprzedmioty=new ArrayList<Produkt>();
        for(Produkt element:prezenty){
            if(element!=null){
                notnullprzedmioty.add(element);
            }
        }
        prezenty=notnullprzedmioty.toArray(new Produkt[0]);
        return prezenty;
    }

    public double getCenaCalkowita(){
        int cena = 0;
        for (Element element : przedmioty) {
            if (element!=null){
                cena+=element.getProduktCena()*element.getIlosc();
            }
        }
        return cena;
    }

    public double getCenaCalkowitaRabat(){
        int cena = 0;
        for (Element element : przedmioty) {
            if (element!=null){
                cena+=element.getCenaCalkowita();
            }
        }
        return cena;
    }

    public String PrintPrzedmioty(String type){
        Sort(type);
        String print="nazwa ilosc cena rabat";
        for(Element element:przedmioty){
            print+="\n"+element.getProduktNazwa()+" "+element.getIlosc()+" "+element.getCenaCalkowita()+" "+element.getRabat();
        }
        print+="\n"+"gratisy:";
        for(Produkt produkt:prezenty){
            if(produkt!=null){
                print+="\n"+produkt.getNazwa();
            }
        }
        print+="\n"+"cena koszyka:"+getCenaCalkowitaRabat();
        return print;
    }

    public String getNajtanszy(){
        Sort("asc");
        return przedmioty[0].getProduktNazwa()+" "+przedmioty[0].getIlosc()+" "+przedmioty[0].getCenaCalkowita()+" "+przedmioty[0].getRabat();
    }

    public String getNajdrozszy(){
        Sort("dsc");
        return przedmioty[0].getProduktNazwa()+" "+przedmioty[0].getIlosc()+" "+przedmioty[0].getCenaCalkowita()+" "+przedmioty[0].getRabat();
    }

    public int CzywKoszyku(Produkt element){
        boolean znajdz = false;
        int index = -1;
        for(int i =0; i<przedmioty.length;i++){
            if(przedmioty[i]!=null){
                if(przedmioty[i].getProduktNazwa()==element.getNazwa()){
                    znajdz = true;
                    index=i;
                    break;
                }
            }
        }
        if (znajdz){
            return index;
        }else {
            return index;
        }
    }

    public void dodajProdukt(Produkt produkt, int ilosc){
        if (ilosc <= 0) {
            throw new IllegalArgumentException("Ilosc musi byc wieksza niz 0");
        }
        if (topOfprzedmioty == przedmioty.length-1){
            Element[] newprzedmioty = new Element[przedmioty.length*2];
            System.arraycopy(przedmioty, 0, newprzedmioty, 0, przedmioty.length);
            przedmioty = newprzedmioty;
        }
        Element nowyElement = new Element(produkt,ilosc);
        boolean znajdz = false;
        int index = -1;
        for(int i =0; i<przedmioty.length;i++){
            if(przedmioty[i]!=null){
                if(przedmioty[i].getProduktNazwa()==nowyElement.getProduktNazwa()){
                    znajdz = true;
                    index = i;
                    break;
                }
            }
        }
        if (znajdz){
            przedmioty[index].setIlosc(przedmioty[index].getIlosc()+ilosc);
        }else {
            przedmioty[++topOfprzedmioty]=nowyElement;
        }
    }

    public void usunProdukt(Produkt produkt, int ilosc){
        if (ilosc <= 0) {
            throw new IllegalArgumentException("Ilosc musi byc wieksza niz 0");
        }
        Element nowyElement = new Element(produkt,ilosc);
        boolean znajdz = false;
        int index = -1;
        for(int i =0; i<przedmioty.length;i++){
            if(przedmioty[i]!=null){
                if(przedmioty[i].getProduktNazwa()==nowyElement.getProduktNazwa()){
                    znajdz = true;
                    index = i;
                    break;
                }
            }
        }
        if (!znajdz){
            throw new IllegalArgumentException("Nie znaleziono produktu");
        }
        if(ilosc>przedmioty[index].getIlosc()){
            throw new IllegalArgumentException("Ilosc musi byc mniejsza albo rowna "+przedmioty[index].getIlosc());
        }
        przedmioty[index].setIlosc(przedmioty[index].getIlosc()-ilosc);
        if(przedmioty[index].getIlosc()==0){
            przedmioty[index]=null;
        }
    }

    public void dodajPrezent(Produkt produkt){
        if (topOfprezenty == prezenty.length-1){
            Produkt[] newprezenty = new Produkt[prezenty.length*2];
            System.arraycopy(prezenty, 0, newprezenty, 0, prezenty.length);
            prezenty = newprezenty;
        }
        prezenty[++topOfprzedmioty]=produkt;
    }

    public void usunPrezent(Produkt produkt){
        boolean znajdz = false;
        int index = -1;
        for(int i =0; i<prezenty.length;i++){
            if(prezenty[i]!=null){
                if(prezenty[i].getNazwa()==produkt.getNazwa()){
                    znajdz = true;
                    index = i;
                    break;
                }
            }
        }
        if(znajdz){
            prezenty[index]=null;
        }else {
            throw new IllegalArgumentException("Nie znaleziono produktu");
        }
    }



}
