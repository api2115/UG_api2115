package Koszyk.koszyk;

public class Produkt {
    private String kod;
    private String nazwa;
    private double cena;

    public Produkt(String kod, String nazwa, double cena){
        this.kod=kod;
        this.nazwa=nazwa;
        this.cena=cena;
    }

    public String getKod(){
        return kod;
    }

    public String getNazwa(){
        return nazwa;
    }

    public double getCena(){
        return cena;
    }



}
