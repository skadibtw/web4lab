package ru.ifmo.se.web4lab.controllers;

import jakarta.annotation.security.RolesAllowed;
import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import ru.ifmo.se.web4lab.database.PointDAO;
import ru.ifmo.se.web4lab.models.Point;

@Path("/points")
public class PointController {

    @EJB
    private PointDAO pointDAO;

    @Context
    private SecurityContext securityContext; // Контекст безопасности

    @POST
    @Path("/create")
    @RolesAllowed({"USER", "ADMIN"}) // Ограничение по ролям
    public Response createPoint(Point point) {
        String currentUsername = securityContext.getUserPrincipal().getName(); // Получаем имя пользователя
        point.calc();
        pointDAO.savePoint(point, currentUsername); // Сохраняем точку с автором
        return Response.ok(point).build();
    }
}
