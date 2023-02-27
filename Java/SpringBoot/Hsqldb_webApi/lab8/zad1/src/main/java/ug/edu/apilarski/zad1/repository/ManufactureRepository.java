package ug.edu.apilarski.zad1.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ug.edu.apilarski.zad1.domain.Manufacture;
import java.util.List;
import java.util.Optional;

@Repository
public interface ManufactureRepository extends CrudRepository<Manufacture,Long>{
    List<Manufacture> findByName(String name);
    Optional<Manufacture> findById(Long id);

}
