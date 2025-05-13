package com.example.macedonianwineguide.service;

import com.example.macedonianwineguide.model.Winery;

import java.util.List;
import java.util.Optional;

public interface WineryService {

    List<Winery> findAll();
    Optional<Winery> findById(Long id);
    Winery save(Winery winery);
    Winery update(Long id, Winery winery);
    void deleteById(Long id);


    List<Winery> findByName(String name);
    List<Winery> findByLocation(String location);


}
