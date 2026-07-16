import mongoose, { Document, Schema } from 'mongoose';

export type NotificationType = 'info' | 'warning' | 'error' | 'success';

export interface INotification extends Document {
  title: string;
  message: string;
  type: NotificationType;
  isRead: boolean;
  recipientId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const notificationSchema = new Schema<INotification>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 150,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
      maxlength: 1000,
    },
    type: {
      type: String,
      enum: ['info', 'warning', 'error', 'success'],
      required: [true, 'Type is required'],
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    recipientId: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

notificationSchema.index({ isRead: 1, type: 1, createdAt: -1 });

export default mongoose.model<INotification>('Notification', notificationSchema);
