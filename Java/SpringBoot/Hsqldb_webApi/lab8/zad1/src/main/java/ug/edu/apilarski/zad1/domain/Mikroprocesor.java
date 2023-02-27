package ug.edu.apilarski.zad1.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Proxy;

import javax.persistence.*;

@Getter
@Setter
@Entity
@Proxy(lazy = false)
public class Mikroprocesor {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(unique = true, nullable = false)
    private Long id;
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @MapsId
    private Manufacture manufacture;
    private String name;
    @OneToOne(mappedBy = "mikroprocesor",
            fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    private Parameters parameters;


    public Mikroprocesor(String name){
        this.name=name;
    }

    public Mikroprocesor(){

    }




}
