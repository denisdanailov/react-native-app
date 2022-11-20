package com.example.nativeappbackend.web;

import com.example.nativeappbackend.model.TaskEntity;
import com.example.nativeappbackend.model.dtos.TaskDTO;
import com.example.nativeappbackend.payment.MessageResponse;
import com.example.nativeappbackend.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

   private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<TaskDTO>> getAllActiveTasks() {

        return ResponseEntity.ok(taskService.getAllActiveTasks());
    }

    @PostMapping("/create")
    public ResponseEntity<MessageResponse> createTask(@Valid @RequestBody TaskDTO taskDTO) {

        try {
            taskService.createTask(taskDTO);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("{id}")
    public ResponseEntity<TaskDTO> editTask(@Valid
                                                  @PathVariable("id") Long id,
                                                  @RequestBody TaskDTO taskDTO) {

        TaskEntity taskToEdit = taskService.findById(id).orElse(null);

        if (taskToEdit != null) {

            taskService.editTask(id, taskDTO);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<TaskDTO> deactivateTask(@PathVariable("id") Long id) {
        try {
            System.out.println(id);
            taskService.deactivateTask(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
