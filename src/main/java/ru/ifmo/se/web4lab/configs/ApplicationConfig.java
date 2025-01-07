package ru.ifmo.se.web4lab.configs;

import jakarta.ws.rs.ApplicationPath;
import jakarta.ws.rs.core.Application;
import ru.ifmo.se.web4lab.filters.CORSFilter;
import ru.ifmo.se.web4lab.filters.AuthFilter;

import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/api")
public class ApplicationConfig extends Application {

    @Override
    public Set<Class<?>> getClasses() {
        Set<Class<?>> resources = new HashSet<>();
        resources.add(CORSFilter.class);
        resources.add(AuthFilter.class);
        // добавьте другие ресурсы
        return resources;
    }
}