
import mongoose, { Document, Schema } from 'mongoose';

interface IMessage extends Document {
  sender: string;
  recipient: string;
  content: string;
  timestamp: Date;
}

const messageSchema: Schema = new Schema({
  senderId:{
    type:String,
    require:true

  } ,
  recipientId:{
    type:String,
    require:true

  } ,
  message:{
    type:String,
    require:true
  } ,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model<IMessage>('Message', messageSchema);

export { Message, IMessage };

