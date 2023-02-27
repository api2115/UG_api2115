package ug.edu.apilarski.zad1.domain;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Mikroprocesor {

    private String id;
    private String manufacture;
    private String name;
    private Integer frequency;
    private String socket;
    private String litography;
    private Integer cores;
    private Integer threads;

    public Mikroprocesor(String manufacture, String name, Integer cores, Integer threads, Integer frequency, String socket, String litography){
        this.manufacture=manufacture;
        this.name=name;
        this.cores=cores;
        this.threads=threads;
        this.frequency=frequency;
        this.socket=socket;
        this.litography=litography;
    }

    public Mikroprocesor(String id, String manufacture, String name, Integer cores, Integer threads, Integer frequency, String socket, String litography){
        this.id=id;
        this.manufacture=manufacture;
        this.name=name;
        this.cores=cores;
        this.threads=threads;
        this.frequency=frequency;
        this.socket=socket;
        this.litography=litography;
    }

    public Mikroprocesor(){

    }


}
