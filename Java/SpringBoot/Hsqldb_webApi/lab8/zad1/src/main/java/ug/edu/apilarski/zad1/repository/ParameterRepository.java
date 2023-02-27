package ug.edu.apilarski.zad1.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import ug.edu.apilarski.zad1.domain.Parameters;

import java.util.Optional;


@Repository
public interface ParameterRepository extends CrudRepository<Parameters,Long>{
    Optional<Parameters> findById(Long id);

}
