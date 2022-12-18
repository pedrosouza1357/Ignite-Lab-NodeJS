import { Content } from "@application/entities/content"
import { Notification } from "@application/entities/notification"
import { makeNotification } from "@test/factories/notification-factory"
import { InMemorynotificationRepository } from "@test/repositories/in-memory-notifications-repository"
import { CancelNotification } from "./cancel-notification"
import { CountRecipientsNofication } from "./count-recipient-notifications"
import { NotificationNotFound } from "./errors/notification-not-found"

describe('Cout recipients notifications', () => {
    it('should be able to count recipient notifications', async () => {
        const notificationsRepository = new InMemorynotificationRepository();
        const countRecipientsNotifications = new CountRecipientsNofication(
            notificationsRepository)
       
      await notificationsRepository.create(
       makeNotification({recipientId: 'recipient-1'})
      );

      await notificationsRepository.create(
        makeNotification({recipientId: 'recipient-1'})
        );

      await notificationsRepository.create(
        makeNotification({recipientId: 'recipient-2'})
        );
    
      const { count } = await countRecipientsNotifications.execute({
           recipientId: 'recipient-1'
        })

        expect(count).toEqual(2);
   
    })
})

