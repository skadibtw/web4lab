package ru.ifmo.se.web4lab.models;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "point")
public class Point implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private double x;
    @Column(nullable = false)
    private double y;
    @Column(nullable = false)
    private double r;
    @Column(nullable = false)
    private boolean insideArea;
    @Column(nullable = false)
    private Date timestamp;
    @Column(nullable = false)
    private long executionTime;
    @Column(name = "created_by", nullable = false)
    private String createdBy; // Токен пользователя, создавшего точку
    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Point() {
    }

    public Point(double x, double y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public boolean isInsideArea() {
        return insideArea;
    }

    public void setInsideArea(boolean insideArea) {
        this.insideArea = insideArea;
    }

    public Date getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Date timestamp) {
        this.timestamp = timestamp;
    }

    public long getExecutionTime() {
        return executionTime;
    }

    public void setExecutionTime(long executionTime) {
        this.executionTime = executionTime;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public void calc() {
        long now = System.currentTimeMillis();

        insideArea = (((x <= 0 && x >= (-r)) && (y >= 0 && y <= r) && (y <= x + r)) ||
                (x >= 0 && y >= 0 && x <= r && y <= r / 2) ||
                (x >= 0 && y <= 0 && (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r / 2, 2))));

        timestamp = new Date(System.currentTimeMillis());

        executionTime = System.currentTimeMillis() - now;
        if (executionTime <= 0) {
            executionTime = 1;
        }
    }

    public void setUser(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }
}