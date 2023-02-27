package ug.edu.apilarski.zad1.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ug.edu.apilarski.zad1.domain.Mikroprocesor;

import java.util.List;
import java.util.Optional;

@Repository
public interface MikroprocesorRepository extends CrudRepository<Mikroprocesor,Long>{

    List<Mikroprocesor> findByName(String name);
    Optional<Mikroprocesor> findById(Long id);

    @Query("Select m from Mikroprocesor m where m.name=?1 and m.id=?2")
    List<Mikroprocesor> getBymNameAndId(String name, Long id);





}
