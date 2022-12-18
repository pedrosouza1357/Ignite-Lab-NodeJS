import { Notification } from "@application/entities/notification";
import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../application/repositores/notifications-repositories";
import { NotificationNotFound } from "./errors/notification-not-found";

interface getRecipientNotificationsRequest {
    recipientId: string;
}

interface getRecipientNotificationsResponse {
    notifications: Notification[]
}

@Injectable()
export class getRecipientNotifications {
    constructor(private notificationsRepository: NotificationsRepository) {}

    async execute(request: getRecipientNotificationsRequest
    ): Promise<getRecipientNotificationsResponse> {
        const { recipientId } = request

       const notifications = await this.notificationsRepository.findManyByRecipientId(recipientId)

       return {
         notifications
       }

    }
}

