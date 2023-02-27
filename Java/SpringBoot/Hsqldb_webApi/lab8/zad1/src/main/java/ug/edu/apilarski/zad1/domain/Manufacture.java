package ug.edu.apilarski.zad1.domain;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
public class Manufacture {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(unique = true, nullable = false)
    private Long id;
    private String name;
    @JsonIgnore
    @OneToMany(mappedBy = "manufacture", fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private List<Mikroprocesor> mikroprocesors;
    @JsonIgnore
    @ManyToMany(mappedBy = "manufactures")
    private List<Employe> employes;

    public Manufacture(){

    }

    public Manufacture(String name){
        this.name=name;
    }
}
