package ru.ifmo.se.web4lab.controllers;

import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import ru.ifmo.se.web4lab.database.UserDAO;
import ru.ifmo.se.web4lab.models.User;
import ru.ifmo.se.web4lab.utils.TokenUtil;

@Path("/auth")
public class AuthController {

    @EJB
    private UserDAO userDAO;

    @POST
    @Path("/register")
    public Response registerUser(User user) {
        userDAO.createUser(user);
        return Response.ok("Registered").build();
    }

    @POST
    @Path("/login")
    public Response loginUser(User user) {
        if (userDAO.validateUser(user.getUsername(), user.getHashed_password())) {
            String token = TokenUtil.generateToken(user.getUsername());
            return Response.ok(token).build();
        }
        return Response.status(Response.Status.UNAUTHORIZED).build();
    }
}
