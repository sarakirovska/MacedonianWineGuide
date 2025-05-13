package com.example.macedonianwineguide.controller;

import com.example.macedonianwineguide.model.Winery;
import com.example.macedonianwineguide.service.WineryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wineries")
@CrossOrigin(origins = "http://localhost:5173")
public class WineryController {

    private final WineryService wineryService;

    public WineryController(WineryService wineryService) {
        this.wineryService = wineryService;
    }

    @GetMapping
    public List<Winery> getAllWineries() {
        return wineryService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Winery> getWineryById(@PathVariable Long id) {
        return wineryService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/add")
    public Winery createWinery(@RequestBody Winery winery) {
        return wineryService.save(winery);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Winery> updateWinery(@PathVariable Long id, @RequestBody Winery winery) {
        try {
            return ResponseEntity.ok(wineryService.update(id, winery));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteWinery(@PathVariable Long id) {
        wineryService.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public List<Winery> searchWineries(@RequestParam(required = false) String name,
                                       @RequestParam(required = false) String location) {
        if (name != null && !name.isEmpty()) {
            return wineryService.findByName(name);
        } else if (location != null && !location.isEmpty()) {
            return wineryService.findByLocation(location);
        }
        return List.of();
    }
}
