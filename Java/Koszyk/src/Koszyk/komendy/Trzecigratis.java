package Koszyk.komendy;

import Koszyk.koszyk.Element;
import Koszyk.koszyk.Koszyk;

public class Trzecigratis extends Command{
    private Element backup;

    public Trzecigratis(Koszyk koszyk) {
        super(koszyk);
    }

    private void backup(Element element){
        backup=element;
    }

    @Override
    public boolean canExecute(){
        int ilosc = 0;
        for(Element element:koszyk.getPrzedmioty()){
            if(element!=null){
                ilosc+=1;
            }
        }
        return ilosc>=3;
    }

    @Override
    public void execute(){
        int najtanszy = -1;
        for(int i = 0; i<koszyk.getPrzedmioty().length;i++){
            if(koszyk.getPrzedmioty()[i]!=null){
                if(najtanszy!=-1){
                    if(koszyk.getPrzedmioty()[i].getCenaCalkowita()<koszyk.getPrzedmioty()[najtanszy].getCenaCalkowita()){
                        najtanszy=i;
                    }
                }else {
                    najtanszy=i;
                }

            }
        }
        backup(koszyk.getPrzedmioty()[najtanszy]);
        koszyk.getPrzedmioty()[najtanszy].setRabat(koszyk.getPrzedmioty()[najtanszy].getRabat()+1);
    }

    @Override
    public  void undo(){
        backup.setRabat(backup.getRabat()-1);
    }
}
