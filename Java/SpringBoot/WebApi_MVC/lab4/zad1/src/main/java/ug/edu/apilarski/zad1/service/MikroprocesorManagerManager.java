package ug.edu.apilarski.zad1.service;

import org.springframework.stereotype.Service;
import ug.edu.apilarski.zad1.domain.Mikroprocesor;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.UUID;


@Service
public class MikroprocesorManagerManager implements MikroprocesorManager {

    List<Mikroprocesor> db = Collections.synchronizedList(new ArrayList<>());

    @Override
    public Mikroprocesor addMikroprocesor(Mikroprocesor mikroprocesor) {
        Mikroprocesor mikroprocesorToAdd = new Mikroprocesor(UUID.randomUUID().toString(),
                mikroprocesor.getManufacture(), mikroprocesor.getName(), mikroprocesor.getCores(),
                mikroprocesor.getThreads(), mikroprocesor.getFrequency(), mikroprocesor.getSocket(), mikroprocesor.getLitography());
        db.add(mikroprocesorToAdd);
        return mikroprocesorToAdd;
    }

    @Override
    public List<Mikroprocesor> getAllMikroprocesors() {
        return db;
    }

    @Override
    public Mikroprocesor findById(String id){
        Mikroprocesor mikroprocesorToFind = null;

        for (Mikroprocesor mikroprocesor : db) {
            if (mikroprocesor.getId().equals(id)) {
                mikroprocesorToFind = mikroprocesor;
            }
        }

        return mikroprocesorToFind;
    }

    @Override
    public boolean deleteMikroprocesor(String id) {
        Mikroprocesor mikroprocesorToDelete = findById(id);

        if (mikroprocesorToDelete != null) {
            db.remove(mikroprocesorToDelete);
            return true;
        }
        return false;
    }


    @Override
    public Mikroprocesor updateMikroprocesor(String id, Mikroprocesor mikroprocesor) {
        int finalIndex = -1;
        int index = 0;
        for (Mikroprocesor mikroproces : db) {
            if(mikroproces.getId().equals(id)) {
                finalIndex = index;
            }
            index+=1;
        }
        if(finalIndex==-1){
            return null;
        }

        Mikroprocesor toSetMikroprocesor = findById(id);
        if(mikroprocesor.getManufacture()!=null){
            toSetMikroprocesor.setManufacture(mikroprocesor.getManufacture());
        }
        if(mikroprocesor.getName()!=null){
            toSetMikroprocesor.setName(mikroprocesor.getName());
        }
        if(mikroprocesor.getCores()!=null){
            toSetMikroprocesor.setCores(mikroprocesor.getCores());
        }
        if(mikroprocesor.getThreads()!=null){
            toSetMikroprocesor.setThreads(mikroprocesor.getThreads());
        }
        if(mikroprocesor.getFrequency()!=null){
            toSetMikroprocesor.setFrequency(mikroprocesor.getFrequency());
        }
        if(mikroprocesor.getSocket()!=null){
            toSetMikroprocesor.setSocket(mikroprocesor.getSocket());
        }
        if(mikroprocesor.getLitography()!=null){
            toSetMikroprocesor.setLitography(mikroprocesor.getLitography());
        }
        db.set(finalIndex,toSetMikroprocesor);
        return toSetMikroprocesor;
    }
}
