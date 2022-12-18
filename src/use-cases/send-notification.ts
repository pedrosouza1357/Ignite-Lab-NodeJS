import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../application/repositores/notifications-repositories";
import { Content } from "../application/entities/content";
import { Notification } from "../application/entities/notification";

interface SendNotifcationRequest {
    recipientId: string;
    content: string;
    category: string;
}

interface SendNotificationResponse {
    notification: Notification
}

@Injectable()
export class SendNotification {
    constructor(private notificationRepository: NotificationsRepository) {}

    async execute(request: SendNotifcationRequest
    ): Promise<SendNotificationResponse> {
        const { recipientId, content, category } = request

        const notification = new Notification({
            recipientId,
            content: new Content(content),
            category,
        });

        // Persistir essa notificação no banco
        await this.notificationRepository.create(notification)

        return {
            notification,
        }
    }
}

