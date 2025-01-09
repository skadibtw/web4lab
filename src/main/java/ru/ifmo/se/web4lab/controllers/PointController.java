package ru.ifmo.se.web4lab.controllers;

import jakarta.annotation.security.RolesAllowed;
import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import ru.ifmo.se.web4lab.database.PointDAO;
import ru.ifmo.se.web4lab.database.UserDAO;
import ru.ifmo.se.web4lab.models.Point;
import ru.ifmo.se.web4lab.models.User;

import java.util.List;
import java.util.Optional;

@Path("/points")
public class PointController {

    @EJB
    private PointDAO pointDAO;
    @EJB
    private UserDAO userDAO;

    @Context
    private SecurityContext securityContext; // Контекст безопасности

    @POST
    @Path("/create")
    @RolesAllowed({"USER", "ADMIN"}) // Ограничение по ролям
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON) // Указываем, что ответ будет в формате JSON
    public Response createPoint(Point point) {
        if (securityContext.getUserPrincipal() == null) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User not authenticated").build();
        }
        String currentUsername = securityContext.getUserPrincipal().getName(); // Получаем имя пользователя
        point.calc();
        pointDAO.savePoint(point, currentUsername); // Сохраняем точку с автором
        return Response.ok(point).build();
    }
    @GET
    @RolesAllowed({"USER", "ADMIN"})
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllPoints(
            @DefaultValue("0") @QueryParam("page") int page,
            @DefaultValue("15") @QueryParam("size") int size) {

        if (size <= 0) {
            size = 15; // Default size if undefined or invalid
        }
        String currentUsername = securityContext.getUserPrincipal().getName();
        Optional<User> currentUser = userDAO.findByUsername(currentUsername);
        if (currentUser.isPresent()) {
            User user = currentUser.get();
            List<Point> points = pointDAO.findPointsByUser(user);
            if (points.isEmpty()) {
                return Response.ok(new PaginatedResponse(
                        List.of(),
                        page,
                        size,
                        0,
                        0
                )).build();
            }
            int totalPoints = points.size();
            int startIndex = page * size;
            int endIndex = Math.min(startIndex + size, totalPoints);

            if (startIndex >= totalPoints) {
                return Response.ok(new PaginatedResponse(
                        List.of(),
                        page,
                        size,
                        totalPoints,
                        (int) Math.ceil((double) totalPoints / size)
                )).build();
            }

            List<Point> paginatedPoints = points.subList(startIndex, endIndex);

            PaginatedResponse response = new PaginatedResponse(
                    paginatedPoints,
                    page,
                    size,
                    totalPoints,
                    (int) Math.ceil((double) totalPoints / size)
            );

            return Response.ok(response).build();
        }
        else {
            return Response.status(Response.Status.UNAUTHORIZED).entity("User not authenticated").build();
        }
    }

    private static class PaginatedResponse {
        private List<Point> content;
        private int currentPage;
        private int pageSize;
        private int totalElements;
        private int totalPages;

        public PaginatedResponse(List<Point> content, int currentPage, int pageSize,
                                 int totalElements, int totalPages) {
            this.content = content;
            this.currentPage = currentPage;
            this.pageSize = pageSize;
            this.totalElements = totalElements;
            this.totalPages = totalPages;
        }

        // Getters
        public List<Point> getContent() { return content; }
        public int getCurrentPage() { return currentPage; }
        public int getPageSize() { return pageSize; }
        public int getTotalElements() { return totalElements; }
        public int getTotalPages() { return totalPages; }
    }
}
