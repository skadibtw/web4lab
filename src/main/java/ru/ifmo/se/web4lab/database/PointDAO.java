package ru.ifmo.se.web4lab.database;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.PersistenceContext;
import ru.ifmo.se.web4lab.models.Point;
import ru.ifmo.se.web4lab.models.User;

import java.util.List;

@Stateless
public class PointDAO {
    @PersistenceContext(unitName = "default")
    private EntityManager em;

    public void savePoint(Point point, String createdBy) {
        try {
            point.setCreatedBy(createdBy);
            User user = em.createQuery("SELECT u FROM User u WHERE u.username = :username", User.class)
                    .setParameter("username", createdBy)
                    .getSingleResult();
            point.setUser(user);
            em.persist(point);
        }
        catch (NoResultException e) {
            throw new IllegalStateException("User not found: " + createdBy);
        }
    }

    public List<Point> findPointsByUser(User user) {
        return em.createQuery("SELECT p FROM Point p WHERE p.user = :user", Point.class)
                .setParameter("user", user)
                .getResultList();
    }
}

