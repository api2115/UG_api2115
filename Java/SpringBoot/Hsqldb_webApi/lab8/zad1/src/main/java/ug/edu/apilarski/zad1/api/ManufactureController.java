package ug.edu.apilarski.zad1.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ug.edu.apilarski.zad1.domain.Manufacture;
import ug.edu.apilarski.zad1.domain.Mikroprocesor;
import ug.edu.apilarski.zad1.service.MikroprocesorService;

@RestController
public class ManufactureController {

    @Autowired
    private final MikroprocesorService mikroprocesorService;

    public ManufactureController(MikroprocesorService mikroprocesorService){
        this.mikroprocesorService=mikroprocesorService;
    }

    @GetMapping("api/manufacture")
    Iterable<Manufacture> allManufactures(){
        return mikroprocesorService.findAllManufactures();
    }

}
