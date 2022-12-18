import { Module } from '@nestjs/common';
import { CancelNotification } from 'src/use-cases/cancel-notification';
import { CountRecipientsNofication } from 'src/use-cases/count-recipient-notifications';
import { getRecipientNotifications } from 'src/use-cases/get-recipient-notifications';
import { ReadNotification } from 'src/use-cases/read-notification';
import { SendNotification } from 'src/use-cases/send-notification';
import { UnreadNotification } from 'src/use-cases/unread-notification';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controlers/notifications.controller';

@Module({
   imports: [DatabaseModule],
   controllers: [NotificationsController],
   providers: [
      SendNotification,
      CancelNotification,
      CountRecipientsNofication,
      getRecipientNotifications,
      ReadNotification,
      UnreadNotification,
   ]
})

export class HttpModule {}