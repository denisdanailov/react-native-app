package com.example.nativeappbackend.model;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;


@Entity
@Table(name = "tasks")
public class TaskEntity extends BaseEntity {
    @NotBlank
    @Size(min= 5, max = 20)
    private String taskName;
    private String createdDate;

    private boolean isActive;

    public String getTaskName() {
        return taskName;
    }

    public TaskEntity setTaskName(String taskName) {
        this.taskName = taskName;
        return this;
    }

    public String getCreatedDate() {
        return createdDate;
    }

    public TaskEntity setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
        return this;
    }

    public boolean isActive() {
        return isActive;
    }

    public TaskEntity setActive(boolean active) {
        isActive = active;
        return this;
    }

}
