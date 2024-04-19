package com.microservices.userservices.service;

import com.microservices.userservices.config.exception.NotFoundException;
import com.microservices.userservices.entity.Notification;
import com.microservices.userservices.repository.NotificationRepository;
import com.microservices.userservices.request.NotificationRequest;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public Notification createNotification(NotificationRequest notificationRequest) {
        Notification notification = new Notification();
        BeanUtils.copyProperties(notificationRequest, notification);
        notification.setCreatedAt(LocalDateTime.now());
        return notificationRepository.save(notification);
    }

    public Notification getNotificationById(UUID notificationId) {
        return notificationRepository.findById(notificationId)
                                      .orElseThrow(() -> new NotFoundException("Notification not found with id: " + notificationId));
    }

    public List<Notification> getAllNotificationsByUserId(UUID userId) {
        return notificationRepository.findByUserId(userId);
    }

    public Notification updateNotification(UUID notificationId, NotificationRequest notificationRequest) {
        Notification existingNotification = getNotificationById(notificationId);
        BeanUtils.copyProperties(notificationRequest, existingNotification);
        return notificationRepository.save(existingNotification);
    }

    public void deleteNotificationById(UUID notificationId) {
        notificationRepository.deleteById(notificationId);
    }
}

