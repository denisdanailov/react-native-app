package com.example.nativeappbackend.service;

import com.example.nativeappbackend.model.TaskEntity;
import com.example.nativeappbackend.model.dtos.TaskDTO;

import java.util.List;
import java.util.Optional;

public interface TaskService {
    void createTask(TaskDTO taskDTO);

    List<TaskDTO> getAllActiveTasks();

    void deactivateTask(Long id);

    Optional<TaskEntity> findById(Long id);

    void editTask(Long id, TaskDTO taskDTO);
}
