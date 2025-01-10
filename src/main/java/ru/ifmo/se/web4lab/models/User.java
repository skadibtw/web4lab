package ru.ifmo.se.web4lab.models;


import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name="users")
public class User {
    @Id
    @GeneratedValue
    private int id;
    private String username;
    private String hashed_password;
    @OneToMany
    private List<Point> points;

    public User() {
    }
    public User(String username, String hashed_password) {
        this.username = username;
        this.hashed_password = hashed_password;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getHashed_password() {
        return hashed_password;
    }
    public void setHashed_password(String hashed) {
        this.hashed_password = hashed;
    }
}
