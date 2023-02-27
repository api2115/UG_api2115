package ug.edu.apilarski.zad1.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ug.edu.apilarski.zad1.domain.Employe;

import java.util.List;

@Repository
public interface EmployeRepository extends CrudRepository<Employe,Long>{

    List<Employe> findByName(String name);
    List<Employe> findByNameOrSurname(String name, String surname);

    @Query("Select m from Employe m where m.name=?1 and m.surname=?2")
    List<Employe> getByNameAndSurname(String name,String surname);

    @Query("Select c from Employe c join fetch c.manufactures")
    List<Employe> getAll();


}
