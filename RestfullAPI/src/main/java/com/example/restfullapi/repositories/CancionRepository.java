package com.example.restfullapi.repositories;
import com.example.restfullapi.models.Cancion;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.List;
@Repository
public class CancionRepository {
    private List<Cancion> canciones = new ArrayList<>();
    private Integer idCounter = Math.toIntExact(1L);

    public List<Cancion> findAll() {
        return canciones;
    }

    public Cancion findById(Integer id) {
        return canciones.stream()
                .filter(cancion -> cancion.getId().equals(id))
                .findFirst()
                .orElse(null);
    }

    public void save(Cancion cancion) {
        cancion.setId(idCounter++);
        canciones.add(cancion);
    }
    public void deleteById(Integer id) {
         canciones.removeIf(cancion -> cancion.getId().equals(id));
         idCounter  = 1 ;

    }
    public void deleteAll() {
        canciones.clear();
        idCounter = 1;  // Reiniciar el contador de ID si es necesario
    }
    public Cancion buscarCancion(String nombre){
        return canciones.stream().filter(cancion -> cancion.getNombre().equals(nombre)).findFirst().orElse(null);
    }

}
