import { Content } from "@application/entities/content"
import { Notification } from "@application/entities/notification"
import { makeNotification } from "@test/factories/notification-factory"
import { InMemorynotificationRepository } from "@test/repositories/in-memory-notifications-repository"
import { CancelNotification } from "./cancel-notification"
import { CountRecipientsNofication } from "./count-recipient-notifications"
import { NotificationNotFound } from "./errors/notification-not-found"
import { getRecipientNotifications } from "./get-recipient-notifications"

describe('Get recipients notifications', () => {
    it('should be able to get recipient notifications', async () => {
        const notificationsRepository = new InMemorynotificationRepository();
        const getRecipientsNotifications = new getRecipientNotifications(
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
    
      const { notifications } = await getRecipientsNotifications.execute({
           recipientId: 'recipient-1'
        })

        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(expect.arrayContaining([
            expect.objectContaining({ recipientId: 'recipient-1' }),
            expect.objectContaining({ recipientId: 'recipient-1' }),
        ]))
   
    })
})

