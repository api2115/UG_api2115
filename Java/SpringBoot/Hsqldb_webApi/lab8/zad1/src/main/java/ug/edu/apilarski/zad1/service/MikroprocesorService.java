package ug.edu.apilarski.zad1.service;

import org.hibernate.Session;
import org.springframework.stereotype.Service;
import ug.edu.apilarski.zad1.domain.Employe;
import ug.edu.apilarski.zad1.domain.Manufacture;
import ug.edu.apilarski.zad1.domain.Mikroprocesor;
import ug.edu.apilarski.zad1.domain.Parameters;
import ug.edu.apilarski.zad1.repository.EmployeRepository;
import ug.edu.apilarski.zad1.repository.ManufactureRepository;
import ug.edu.apilarski.zad1.repository.MikroprocesorRepository;
import ug.edu.apilarski.zad1.repository.ParameterRepository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MikroprocesorService {

    final EmployeRepository employeRepository;
    final ManufactureRepository manufactureRepository;
    final MikroprocesorRepository mikroprocesorRepository;
    final ParameterRepository parameterRepository;

    public MikroprocesorService(EmployeRepository employeRepository, ManufactureRepository manufactureRepository,
                                MikroprocesorRepository mikroprocesorRepository, ParameterRepository parameterRepository){
        this.employeRepository=employeRepository;
        this.manufactureRepository=manufactureRepository;
        this.mikroprocesorRepository=mikroprocesorRepository;
        this.parameterRepository=parameterRepository;
    }


    public Iterable<Mikroprocesor> findAllMikroprocesors(){
        return mikroprocesorRepository.findAll();
    }

    public Iterable<Manufacture> findAllManufactures(){
        return manufactureRepository.findAll();
    }

    public Mikroprocesor addMikroprocesor(Mikroprocesor mikroprocesor){
        Parameters parameters = new Parameters(mikroprocesor.getParameters().getCores(),mikroprocesor.getParameters().getFrequency(),mikroprocesor.getParameters().getSocket());
        Mikroprocesor mikroprocesorToAdd = new Mikroprocesor(mikroprocesor.getName());
        mikroprocesorToAdd.setParameters(parameters);
        parameters.setMikroprocesor(mikroprocesorToAdd);
        Manufacture manufacture = manufactureRepository.findById(mikroprocesor.getManufacture().getId()).orElse(null);
        mikroprocesorToAdd.setManufacture(manufacture);
        List<Mikroprocesor> mikroprocesors = manufacture.getMikroprocesors();
        mikroprocesors.add(mikroprocesorToAdd);
        manufactureRepository.save(manufacture);
        parameterRepository.save(parameters);
        mikroprocesorRepository.save(mikroprocesorToAdd);

        return mikroprocesorToAdd;
    }

    public Optional<Mikroprocesor> findMikroprocesorById(Long id){
        return mikroprocesorRepository.findById(id);
    }

    public void deleteMikroprocesor(Long id){
        Mikroprocesor mikroprocesor = mikroprocesorRepository.findById(id).orElse(null);
        Manufacture manufacture = manufactureRepository.findById(mikroprocesor.getManufacture().getId()).orElse(null);
        List<Mikroprocesor> mikroprocesors = manufacture.getMikroprocesors();
        mikroprocesors.remove(mikroprocesor);
        manufacture.setMikroprocesors(manufacture.getMikroprocesors());
        manufactureRepository.save(manufacture);
        parameterRepository.deleteById(mikroprocesor.getParameters().getId());
        mikroprocesorRepository.deleteById(id);
    }

    public Mikroprocesor editMikroprocesor(Long id, Mikroprocesor mikroprocesor){
        Mikroprocesor mikroprocesorInDb = mikroprocesorRepository.findById(id).orElse(null);
        Manufacture manufacture = manufactureRepository.findById(mikroprocesorInDb.getManufacture().getId()).orElse(null);
        List<Mikroprocesor> mikroprocesors = manufacture.getMikroprocesors();
        mikroprocesors.remove(mikroprocesorInDb);
        mikroprocesorInDb.setName(mikroprocesor.getName());
        mikroprocesors.add(mikroprocesorInDb);
        manufacture.setMikroprocesors(mikroprocesors);
        Parameters parameters = parameterRepository.findById(mikroprocesorInDb.getParameters().getId()).orElse(null);
        parameters.setMikroprocesor(mikroprocesorInDb);
        manufactureRepository.save(manufacture);
        parameterRepository.save(parameters);
        mikroprocesorRepository.save(mikroprocesorInDb);
        return mikroprocesorInDb;
    }

    public void learning(){

        Manufacture manufacture1 = new Manufacture("Intel");
        Employe employe1 = new Employe("Wojciech","Pietruszewski");
        Employe employe2 = new Employe("Szymon","Merski");
        Employe employe3 = new Employe("Mati","Stapaj");
        Employe employe4 = new Employe("Sebastian","Rychert");
        Employe employe5 = new Employe("Adam","Pilarski");
        Employe employe7 = new Employe("xyz","zyx");
        Mikroprocesor mikroprocesor1 = new Mikroprocesor("4004");
        Parameters parameters1 = new Parameters(1,400,"lga");

        List<Manufacture> manufactureList = new ArrayList<>();
        List<Employe> employeList = new ArrayList<>();
        List<Mikroprocesor> mikroprocesorList = new ArrayList<>();

        mikroprocesor1.setManufacture(manufacture1);
        mikroprocesor1.setParameters(parameters1);
        parameters1.setMikroprocesor(mikroprocesor1);

        mikroprocesorList.add(mikroprocesor1);
        manufactureList.add(manufacture1);
        employeList.add(employe1);
        employeList.add(employe2);
        employeList.add(employe3);
        employeList.add(employe4);
        employeList.add(employe5);
        employeList.add(employe7);

        employe1.setManufactures(manufactureList);
        employe2.setManufactures(manufactureList);
        employe3.setManufactures(manufactureList);
        employe4.setManufactures(manufactureList);
        employe5.setManufactures(manufactureList);
        employe7.setManufactures(manufactureList);
        manufacture1.setEmployes(employeList);
        manufacture1.setMikroprocesors(mikroprocesorList);


        Manufacture manufactureS =  manufactureRepository.save(manufacture1);
        employeRepository.save(employe1);
        employeRepository.save(employe2);
        employeRepository.save(employe3);
        employeRepository.save(employe4);
        employeRepository.save(employe5);
        employeRepository.save(employe7);
        employeRepository.findByName("Szymon").forEach(System.out::println);

        Parameters paramsS = parameterRepository.save(parameters1);
        System.out.println(paramsS.getId());

        mikroprocesorRepository.save(mikroprocesor1);
        mikroprocesorRepository.findByName("4004").forEach(System.out::println);

        for (Employe employe : employeRepository.findAll()) {

            System.out.println(employe.getName());
            System.out.println(employe.getManufactures());
        }

        for (Employe employe : employeRepository.getAll()) {

            System.out.println(employe.getName());
            System.out.println(employe.getManufactures());
        }


    }



}
