package com.example.restfullapi.controllers;
import com.example.restfullapi.models.Cancion;
import com.example.restfullapi.repositories.CancionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/canciones")
public class CancionController {
    private final CancionRepository cancionRepository;

    @Autowired
    public CancionController(CancionRepository cancionRepository) {
        this.cancionRepository = cancionRepository;
    }

    @GetMapping
    public List<Cancion> obtenerUsuarios() {
        return cancionRepository.findAll();
    }

    @GetMapping("/{id}")
    public Cancion obtenerUsuarioPorId(@PathVariable Integer id) {
        return cancionRepository.findById(id);
    }

    @GetMapping("/{nombre}")
    public Cancion obtenerCancionPorNombre(@PathVariable String nombre){return cancionRepository.buscarCancion(nombre);
    }

    @PostMapping
    public void guardarUsuario(@RequestBody Cancion cancion) {
        cancionRepository.save(cancion);
    }

    @DeleteMapping("/{id}")
    public void eliminarCancion(@PathVariable Integer id){ cancionRepository.deleteById(id);}

    @DeleteMapping
    public void eliminarPlayList(){cancionRepository.deleteAll();}

}
