package com.example.nativeappbackend.service.impl;

import com.example.nativeappbackend.model.TaskEntity;
import com.example.nativeappbackend.model.dtos.TaskDTO;
import com.example.nativeappbackend.repository.TaskRepository;
import com.example.nativeappbackend.service.TaskService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final ModelMapper modelMapper;

    public TaskServiceImpl(TaskRepository taskRepository, ModelMapper modelMapper) {
        this.taskRepository = taskRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void createTask(TaskDTO taskDTO) {

        TaskEntity task = new TaskEntity();

        task.setTaskName(taskDTO.getTaskName());
        task.setCreatedDate(taskDTO.getCreatedDate());
        task.setActive(true);

        taskRepository.save(task);
    }

    @Override
    public List<TaskDTO> getAllActiveTasks() {
        return taskRepository.findAll().stream().map(this::mapTask).filter(TaskDTO::isActive).collect(Collectors.toList());
    }

    @Override
    public void deactivateTask(Long id) {
        Optional<TaskEntity> taskToDeactivated = taskRepository.findById(id);

        if (taskToDeactivated.isPresent()) {
            taskToDeactivated.get().setActive(false);

            taskRepository.save(taskToDeactivated.get());
        }
    }

    @Override
    public Optional<TaskEntity> findById(Long id) {
        return taskRepository.findById(id);
    }

    @Override
    public void editTask(Long id, TaskDTO taskDTO) {

        TaskEntity task = taskRepository.findById(id).orElse(null);

        if (task != null) {
            task.setTaskName(taskDTO.getTaskName());
            taskRepository.save(task);
        }

    }

    private TaskDTO mapTask(TaskEntity taskEntity) {
        TaskDTO taskDTO = this.modelMapper.map(taskEntity, TaskDTO.class);

        return taskDTO;
    }
}
