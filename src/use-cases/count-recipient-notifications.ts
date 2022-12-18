import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../application/repositores/notifications-repositories";
import { NotificationNotFound } from "./errors/notification-not-found";

interface CountRecipientsNoficationRequest {
    recipientId: string;
}

interface CountRecipientsNoficationResponse {
    count: number
}

@Injectable()
export class CountRecipientsNofication {
    constructor(private notificationsRepository: NotificationsRepository) {}

    async execute(request: CountRecipientsNoficationRequest
    ): Promise<CountRecipientsNoficationResponse> {
        const { recipientId } = request

       const count = await this.notificationsRepository.countManyByRecipientId(recipientId)

       return {
        count,
       }

    }
}

