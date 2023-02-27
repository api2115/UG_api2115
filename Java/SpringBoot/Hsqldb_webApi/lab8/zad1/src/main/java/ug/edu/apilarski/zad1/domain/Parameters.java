package ug.edu.apilarski.zad1.domain;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Parameters {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(unique = true, nullable = false)
    private Long id;
    private int frequency;
    private String socket;
    private int cores;
    @JsonIgnore
    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.MERGE)
    @MapsId
    private Mikroprocesor mikroprocesor;

    public Parameters(){

    }

    public Parameters(Integer cores, Integer frequency, String socket){
        this.cores=cores;
        this.frequency=frequency;
        this.socket=socket;
    }


}
