package com.example.nativeappbackend.model.dtos;

public class TaskDTO {

    private Long id;
    private String taskName;
    private String createdDate;
    private boolean isActive;

    public Long getId() {
        return id;
    }

    public TaskDTO setId(Long id) {
        this.id = id;
        return this;
    }

    public String getTaskName() {
        return taskName;
    }

    public TaskDTO setTaskName(String taskName) {
        this.taskName = taskName;
        return this;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public TaskDTO setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public boolean isActive() {
        return isActive;
    }

    public TaskDTO setActive(boolean active) {
        isActive = active;
        return this;
    }
}
