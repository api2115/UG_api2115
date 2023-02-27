package ug.edu.apilarski.zad1.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ug.edu.apilarski.zad1.domain.Mikroprocesor;
import ug.edu.apilarski.zad1.service.MikroprocesorService;

import java.util.Optional;

@RestController
public class MikroprocesorController {

    @Autowired
    private final MikroprocesorService mikroprocesorService;

    public MikroprocesorController(MikroprocesorService mikroprocesorService){
        this.mikroprocesorService=mikroprocesorService;
    }

    @GetMapping("api/mikroprocesor")
    Iterable<Mikroprocesor> allMikroprocesors(){
        return mikroprocesorService.findAllMikroprocesors();
    }

    @PostMapping("/api/mikroprocesor")
    Mikroprocesor addMikroprocesor(@RequestBody Mikroprocesor mikroprocesor){
        return mikroprocesorService.addMikroprocesor(mikroprocesor);
    }

    @DeleteMapping("/api/mikroprocesor/{id}")
    Mikroprocesor deleteById(@PathVariable("id") Long id){
        Optional<Mikroprocesor> foundMikroprocesor = mikroprocesorService.findMikroprocesorById(id);
        if (foundMikroprocesor.isEmpty()){
            throw new NotFoundException();
        }
        mikroprocesorService.deleteMikroprocesor(id);
        return foundMikroprocesor.orElse(null);
    }

    @PatchMapping("/api/mikroprocesor/{id}")
    Mikroprocesor updateById(@PathVariable("id") Long id, @RequestBody Mikroprocesor mikroprocesor){
        Optional<Mikroprocesor> foundMikroprocesor = mikroprocesorService.findMikroprocesorById(id);
        if (foundMikroprocesor.isEmpty()){
            throw new NotFoundException();
        }
        return mikroprocesorService.editMikroprocesor(id,mikroprocesor);
    }
}
