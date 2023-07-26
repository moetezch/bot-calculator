import { History } from '../database/schemas/History.js';

export const getHistory = async () => {
    const history = await History.find({}).sort({ _id: -1 }).limit(10).exec();
    return history;
};

export const setHistory = async ({ command, result }) => {
    const newHistory = new History({
        command,
        result,
    });
    await newHistory.save();
};
