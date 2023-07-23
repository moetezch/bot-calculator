import mongoose from 'mongoose';
const { Schema } = mongoose;

const historySchema = new Schema({
    command: String,
    result: String,
});

const History = mongoose.model('History', historySchema);

module.exports = History;
