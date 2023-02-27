package Koszyk.komendy;

import Koszyk.koszyk.Element;
import Koszyk.koszyk.Koszyk;

public class Trzystarabat extends Command{

    public Trzystarabat(Koszyk koszyk){
        super(koszyk);
    }

    @Override
    public boolean canExecute() {
        return koszyk.getCenaCalkowita() >= 300;
    }

    @Override
    public void execute(){
        for(Element element:koszyk.getPrzedmioty()){
            if(element!=null){
                element.setRabat(element.getRabat()+0.05);
            }
        }
    }

    @Override
    public void undo(){
        for(Element element:koszyk.getPrzedmioty()){
            if(element!=null){
                element.setRabat(element.getRabat()-0.05);
            }
        }
    }

}
