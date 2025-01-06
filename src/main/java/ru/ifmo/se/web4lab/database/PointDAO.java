package ru.ifmo.se.web4lab.database;

import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import ru.ifmo.se.web4lab.models.Point;
import ru.ifmo.se.web4lab.models.User;

import java.util.List;

@Stateless
public class PointDAO {
    @PersistenceContext(unitName = "default")
    private EntityManager em;

    public void savePoint(Point point, String createdBy) {
        point.setCreatedBy(createdBy);
        em.persist(point);

    }

    public List<Point> findPointsByUser(User user) {
        return em.createQuery("SELECT p FROM Point p WHERE p.user = :user", Point.class)
                .setParameter("user", user)
                .getResultList();
    }
}
