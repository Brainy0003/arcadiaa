import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    room: {
        type: String,
        required: true
    },
    date: Date
});

export default mongoose.model('Message', messageSchema);