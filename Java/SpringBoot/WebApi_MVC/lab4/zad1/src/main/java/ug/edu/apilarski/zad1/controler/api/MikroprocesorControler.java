package ug.edu.apilarski.zad1.controler.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ug.edu.apilarski.zad1.domain.Mikroprocesor;
import ug.edu.apilarski.zad1.service.MikroprocesorManager;

import java.util.List;

@RestController
public class MikroprocesorControler {

    @Autowired
    private final MikroprocesorManager mikroprocesorManager;

    public MikroprocesorControler(@Autowired MikroprocesorManager mikroprocesorManager){
        this.mikroprocesorManager = mikroprocesorManager;
    }

    @PostMapping("/api/mikroprocesor")
    Mikroprocesor addMikroprocesor(@RequestBody Mikroprocesor mikroprocesor){
        return mikroprocesorManager.addMikroprocesor(mikroprocesor);
    }

    @GetMapping("/api/mikroprocesor")
    List<Mikroprocesor> getAll(){
        return mikroprocesorManager.getAllMikroprocesors();
    }

    @GetMapping("/api/mikroprocesor/{id}")
    Mikroprocesor getById(@PathVariable("id") String id){
        Mikroprocesor foundMikroprocesor = mikroprocesorManager.findById(id);
        if(foundMikroprocesor==null){
            throw new NotFoundException();
        }
        return foundMikroprocesor;
    }

    @DeleteMapping("/api/mikroprocesor/{id}")
    Mikroprocesor deleteById(@PathVariable("id") String id){
        Mikroprocesor foundMikroprocesor = mikroprocesorManager.findById(id);
        if(foundMikroprocesor==null){
            throw new NotFoundException();
        }
        mikroprocesorManager.deleteMikroprocesor(id);
        return foundMikroprocesor;
    }

    @PutMapping("/api/mikroprocesor/{id}")
    Mikroprocesor updateMikroprocesor(@PathVariable("id") String id, @RequestBody Mikroprocesor mikroprocesor){
        Mikroprocesor updatedMikroprocesor = mikroprocesorManager.updateMikroprocesor(id, mikroprocesor);
        if(updatedMikroprocesor==null){
            throw new NotFoundException();
        }
        return updatedMikroprocesor;
    }


}
