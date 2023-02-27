package Koszyk.koszyk;

public class Element {
    private Produkt produkt;
    private int ilosc;
    private double rabat =0;

    public Element(Produkt produkt, int ilosc){
        this.produkt=produkt;
        this.ilosc=ilosc;
    }

    public String getProduktKod(){
        return produkt.getKod();
    }

    public String getProduktNazwa(){
        return produkt.getNazwa();
    }

    public double getProduktCena(){
        return produkt.getCena();
    }

    public int getIlosc(){
        return ilosc;
    }

    public void setIlosc(int i){
        ilosc=i;
    }

    public void setRabat(double r){
        rabat=r;
    }

    public double getRabat(){
        if(rabat>1){
            return 1;
        }else {
            return rabat;
        }
    }

    public double getCenaCalkowita() {
        if(rabat>=1){
            return 0.0;
        } else {
            return produkt.getCena()*ilosc - rabat*produkt.getCena()*ilosc;
        }

    }

}
