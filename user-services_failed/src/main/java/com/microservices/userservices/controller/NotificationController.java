package com.microservices.userservices.controller;

import com.microservices.userservices.entity.Notification;
import com.microservices.userservices.request.NotificationRequest;
import com.microservices.userservices.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/user-services/api/notifications")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping("/create")
    public Notification createNotification(@RequestBody NotificationRequest notificationRequest) {
        return notificationService.createNotification(notificationRequest);
    }

    @GetMapping("/get-by-id/{notificationId}")
    public Notification getNotificationById(@PathVariable UUID notificationId) {
        return notificationService.getNotificationById(notificationId);
    }

    @GetMapping("/get-all-by-user-id/{userId}")
    public List<Notification> getAllNotificationsByUserId(@PathVariable UUID userId) {
        return notificationService.getAllNotificationsByUserId(userId);
    }

    @PutMapping("/update/{notificationId}")
    public Notification updateNotification(@PathVariable UUID notificationId, @RequestBody NotificationRequest notificationRequest) {
        return notificationService.updateNotification(notificationId, notificationRequest);
    }

    @DeleteMapping("/delete/{notificationId}")
    public void deleteNotificationById(@PathVariable UUID notificationId) {
        notificationService.deleteNotificationById(notificationId);
    }
}
