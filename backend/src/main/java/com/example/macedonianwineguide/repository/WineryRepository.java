package com.example.macedonianwineguide.repository;

import com.example.macedonianwineguide.model.Winery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WineryRepository extends JpaRepository<Winery, Long> {
    List<Winery> findByNameContainingIgnoreCase(String name);
    List<Winery> findByLocationContainingIgnoreCase(String location);
}
