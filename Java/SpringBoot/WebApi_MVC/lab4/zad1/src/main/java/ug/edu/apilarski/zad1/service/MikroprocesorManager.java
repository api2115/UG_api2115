package ug.edu.apilarski.zad1.service;

import ug.edu.apilarski.zad1.domain.Mikroprocesor;

import java.util.List;

public interface MikroprocesorManager {

    Mikroprocesor addMikroprocesor(Mikroprocesor mikroprocesor);
    List<Mikroprocesor> getAllMikroprocesors();
    boolean deleteMikroprocesor(String id);
    Mikroprocesor findById(String id);
    Mikroprocesor updateMikroprocesor(String id, Mikroprocesor mikroprocesor);


}
