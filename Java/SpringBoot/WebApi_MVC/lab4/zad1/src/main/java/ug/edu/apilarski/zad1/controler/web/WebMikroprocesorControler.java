package ug.edu.apilarski.zad1.controler.web;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ug.edu.apilarski.zad1.domain.Mikroprocesor;
import ug.edu.apilarski.zad1.service.MikroprocesorManager;

@Controller
public class WebMikroprocesorControler {

    @Autowired
    private final MikroprocesorManager mikroprocesorManager;

    public WebMikroprocesorControler(@Autowired MikroprocesorManager mikroprocesorManager){
        this.mikroprocesorManager = mikroprocesorManager;
    }

    @GetMapping("/mikroprocesor")
    public String mikroprocesors(Model model){
        model.addAttribute("allMikroprocesors", mikroprocesorManager.getAllMikroprocesors());
        return "mikroprocesor-all";
    }

    @GetMapping("/mikroprocesor/form")
    public String getForm(Model model){
        model.addAttribute("mikroprocesorToAdd",new Mikroprocesor());
        return "mikroprocesor-add";
    }

    @PostMapping("/mikroprocesor")
    public String addNewMikroprocesor(@ModelAttribute Mikroprocesor mikroprocesorToAdd, Model model){
        mikroprocesorManager.addMikroprocesor(mikroprocesorToAdd);
        return "redirect:/mikroprocesor";
    }

    @GetMapping("/mikroprocesor/delete/{id}")
    public String deleteMikroprocesor(@PathVariable("id") String id, Model model) {
        if (mikroprocesorManager.deleteMikroprocesor(id)) {
            model.addAttribute("successMessage", "Operacja się powiodła");
              return "success";
        }
        else {
            model.addAttribute("errorMessage", "Operacja się nie powiodła");
            return "error";
        }
    }

    @GetMapping("mikroprocesor/form/{id}")
    public String getIdForm(Model model, @PathVariable("id") String id){
        model.addAttribute("mikroprocesorToEdit",mikroprocesorManager.findById(id));
        return "mikroprocesor-edit";
    }

    @PostMapping("/mikroprocesor/edit")
    public String editMikroprocesor(Mikroprocesor mikroprocesorToEdit){
        mikroprocesorManager.updateMikroprocesor(mikroprocesorToEdit.getId(),mikroprocesorToEdit);
        return "redirect:/mikroprocesor";
    }



}
