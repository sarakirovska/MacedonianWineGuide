package com.example.macedonianwineguide.service.impl;

import com.example.macedonianwineguide.model.Winery;
import com.example.macedonianwineguide.repository.WineryRepository;
import com.example.macedonianwineguide.service.WineryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service

public class WineryServiceImpl implements WineryService {

    private final WineryRepository wineryRepository;

    public WineryServiceImpl(WineryRepository wineryRepository) {
        this.wineryRepository = wineryRepository;
    }

    @Override
    public List<Winery> findAll() {
        return wineryRepository.findAll();
    }

    @Override
    public Optional<Winery> findById(Long id) {
        wineryRepository.flush();
        return wineryRepository.findById(id);
    }


    @Override
    public Winery save(Winery winery) {
        return wineryRepository.save(winery);
    }

    @Override
    public Winery update(Long id, Winery winery) {
        Optional<Winery> existingWineryOpt = wineryRepository.findById(id);

        if (existingWineryOpt.isPresent()) {
            Winery existingWinery = existingWineryOpt.get();


            existingWinery.setName(winery.getName());
            existingWinery.setDescription(winery.getDescription());
            existingWinery.setLatitude(winery.getLatitude());
            existingWinery.setLongitude(winery.getLongitude());
            existingWinery.setLocation(winery.getLocation());
            existingWinery.setPhoneNumber(winery.getPhoneNumber());
            existingWinery.setWorkingHours(winery.getWorkingHours());
            existingWinery.setImages(winery.getImages());


            return wineryRepository.save(existingWinery);
        }

        throw new RuntimeException("Winery with id " + id + " not found");
    }


    @Override
    public void deleteById(Long id) {
        wineryRepository.deleteById(id);
    }

    @Override
    public List<Winery> findByName(String name) {
        return wineryRepository.findByNameContainingIgnoreCase(name);
    }

    @Override
    public List<Winery> findByLocation(String location) {
        return wineryRepository.findByLocationContainingIgnoreCase(location);
    }
}
