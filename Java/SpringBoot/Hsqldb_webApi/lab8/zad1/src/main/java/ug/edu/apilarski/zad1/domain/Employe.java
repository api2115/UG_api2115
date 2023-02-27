package ug.edu.apilarski.zad1.domain;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
@Getter
@Setter
public class Employe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    private String name;
    private String surname;
    @ManyToMany
    private List<Manufacture> manufactures;

    public Employe(){

    }

    public Employe(String name, String surname){
        this.name=name;
        this.surname=surname;
    }

}
