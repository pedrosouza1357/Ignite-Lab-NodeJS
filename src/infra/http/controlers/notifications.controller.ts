import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CancelNotification } from 'src/use-cases/cancel-notification';
import { CountRecipientsNofication } from 'src/use-cases/count-recipient-notifications';
import { getRecipientNotifications } from 'src/use-cases/get-recipient-notifications';
import { ReadNotification } from 'src/use-cases/read-notification';
import { SendNotification } from 'src/use-cases/send-notification';
import { UnreadNotification } from 'src/use-cases/unread-notification';
import { CreateNotificationBody } from '../dtos/create-notification.body';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification, 
              private cancelNotification: CancelNotification,
              private readNotification: ReadNotification,
              private unreadNotification: UnreadNotification,
              private countRecipientNotifications: CountRecipientsNofication,
              private getRecipientNotifications: getRecipientNotifications) {}

  //cancelar notificação
  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) 
  {
    await this.cancelNotification.execute({
      notificationId: id,
    })
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string)
  {
      const { count } = await this.countRecipientNotifications.execute({
        recipientId,
      })
      return{
        count,
      }
  }

 
  @Get('from/:recipientId')
  async GetFromRecipient(@Param('recipientId') recipientId: string
   )
  {
      const { notifications } = await this.getRecipientNotifications.execute({
        recipientId,
      })
      return{
        notifications: notifications.map(NotificationViewModel.toHTTP),
      }
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) 
  {
    await this.readNotification.execute({
      notificationId: id,
    })
  }

  
  @Patch(':id/unread')
  async unread(@Param('id') id: string) 
  {
    await this.readNotification.execute({
      notificationId: id,
    })
  }
  
  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body
    
    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category
    });

    return { notification: NotificationViewModel.toHTTP(notification),
    
    } 
  }
}

