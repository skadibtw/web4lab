package ru.ifmo.se.web4lab.database;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import ru.ifmo.se.web4lab.models.User;

import java.util.Optional;

@Stateless
public class UserDAO {

    @PersistenceContext(unitName = "default")
    private EntityManager em;

    // Создание пользователя
    public void createUser(User user) {
        em.persist(user);
    }

    // Поиск пользователя по имени
    public Optional<User> findByUsername(String username) {
        return em.createQuery("SELECT u FROM User u WHERE u.username = :username", User.class)
                .setParameter("username", username)
                .getResultStream()
                .findFirst();
    }

    // Валидация пользователя
    public boolean validateUser(String username, String hashedPassword) {
        Optional<User> userOpt = findByUsername(username);
        return userOpt.isPresent() && userOpt.get().getHashed_password().equals(hashedPassword);
    }
}
