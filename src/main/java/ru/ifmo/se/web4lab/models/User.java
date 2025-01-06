package ru.ifmo.se.web4lab.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="user")
public class User {
    @Id
    @GeneratedValue
    private int id;
    private String username;
    private String hashed_password;

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
