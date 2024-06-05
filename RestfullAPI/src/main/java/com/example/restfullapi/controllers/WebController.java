package com.example.restfullapi.controllers;
import com.example.restfullapi.models.Cancion;
import com.example.restfullapi.repositories.CancionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class WebController {
    private final CancionRepository cancionRepository;

    @Autowired
    public WebController(CancionRepository cancionRepository) {
        this.cancionRepository = cancionRepository;

    }
    @GetMapping("/")
    public String index(Model model){
        model.addAttribute("cancion", new Cancion());
        return "formulario";
    }

    @GetMapping("/formulario")
    public String mostrarFormulario(Model model) {
        model.addAttribute("cancion", new Cancion());
        return "formulario";
    }

    @PostMapping("/guardarCancion")
    public String guardarUsuario(Cancion cancion) {
        cancionRepository.save(cancion);
        return "redirect:/canciones";
    }

    @GetMapping("/canciones")
    public String mostrarUsuarios(Model model) {
        model.addAttribute("canciones", cancionRepository.findAll());
        return "canciones";
    }
}
