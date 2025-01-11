package ru.ifmo.se.web4lab.controllers;

import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.ejb.EJB;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import ru.ifmo.se.web4lab.database.UserDAO;
import ru.ifmo.se.web4lab.models.User;
import at.favre.lib.crypto.bcrypt.BCrypt;
import ru.ifmo.se.web4lab.utils.TokenUtil;

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
    @PermitAll
    public Response register(User user) {
        try {
            // Валидация данных пользователя
            if (user.getUsername() == null || user.getUsername().isEmpty() || user.getHashed_password() == null || user.getHashed_password().isEmpty()) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("Username and password must not be empty.")
                        .build();
            }
    
            // Проверка существующего пользователя
            if (userDAO.findByUsername(user.getUsername()).isPresent()) {
                return Response.status(Response.Status.CONFLICT)
                        .entity("User already exists.")
                        .build();
            }
    
            // Хеширование пароля
            String hashedPassword = hashPassword(user.getHashed_password());
            user.setHashed_password(hashedPassword);
            String token = TokenUtil.generateToken(user.getUsername());
    
            // Создание нового пользователя
            userDAO.createUser(user);
    
            // Возвращение успешного ответа
            return Response.status(Response.Status.CREATED)
            .header("Authorization", "Bearer " + token)
            .build();
            } catch (Exception e) {
            // Обработка исключений
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("An error occurred while registering the user.")
                    .build();
        }
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
    public Response login(User user) {
        String username = user.getUsername();
        String password = user.getHashed_password();
        Optional<User> optionalUser = userDAO.findByUsername(username);

        if (optionalUser.isPresent() && checkPassword(password, optionalUser.get().getHashed_password())) {
            // Генерация JWT токена
            String token = TokenUtil.generateToken(username);
            return Response.ok()
                    .header("Authorization", "Bearer " + token)  // Отправляем токен в заголовке
                    .build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("Invalid username or password.")
                    .build();
        }
    }

    private boolean checkPassword(String inputPassword, String storedHash) {
        return BCrypt.verifyer().verify(inputPassword.toCharArray(), storedHash).verified;
    }

    private String hashPassword(String password) {
        return BCrypt.withDefaults().hashToString(12, password.toCharArray());
    }

}
