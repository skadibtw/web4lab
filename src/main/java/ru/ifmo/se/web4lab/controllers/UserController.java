package ru.ifmo.se.web4lab.controllers;

import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import ru.ifmo.se.web4lab.database.UserDAO;
import ru.ifmo.se.web4lab.models.User;
import at.favre.lib.crypto.bcrypt.BCrypt;

import java.util.Optional;

@Path("/users")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UserController {

    @EJB
    private UserDAO userDAO;

    @Context
    private SecurityContext securityContext;

    @POST
    @Path("/register")
    public Response register(User user) {
        if (userDAO.findByUsername(user.getUsername()).isPresent()) {
            return Response.status(Response.Status.CONFLICT)
                    .entity("User already exists.")
                    .build();
        }
        String hashedPassword = hashPassword(user.getHashed_password());
        user.setHashed_password(hashedPassword);
        userDAO.createUser(user);
        return Response.status(Response.Status.CREATED).build();
    }

    @GET
    @Path("/profile")
    @RolesAllowed({"USER", "ADMIN"})
    public Response getProfile() {
        String username = securityContext.getUserPrincipal().getName();  // Получаем имя текущего пользователя
        return userDAO.findByUsername(username)
                .map(user -> Response.ok(user).build())
                .orElse(Response.status(Response.Status.NOT_FOUND).build());
    }
    @POST
    @Path("/login")
    @PermitAll
    public Response login(@FormParam("username") String username, @FormParam("password") String password) {
        Optional<User> optionalUser = userDAO.findByUsername(username);

        if (optionalUser.isPresent() && checkPassword(password, optionalUser.get().getHashed_password())) {
            String token = generateToken(username);
            return Response.ok().entity("Login successful. Token: " + token).build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("Invalid username or password.")
                    .build();
        }
    }

    private boolean checkPassword(String inputPassword, String storedHash) {
        return BCrypt.verifyer().verify(inputPassword.toCharArray(), storedHash).verified;
    }

    private String generateToken(String username) {
        // Здесь можно использовать библиотеку JWT для генерации токена
        return "dummy-token-for-" + username; // Пример, замените на реальную генерацию токена
    }

    private String hashPassword(String password) {
        return BCrypt.withDefaults().hashToString(12, password.toCharArray());
    }

}
