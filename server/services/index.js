import { evaluate } from 'mathjs';
import { History } from '../database/schemas/History.js';

export const invalidCommand = 'Invalid command';

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

export const calculate = async (command) => {
    const entry = {
        command,
    };
    try {
        const result = evaluate(command);
        entry.result = result;
    } catch (error) {
        entry.result = invalidCommand;
    }

    await setHistory(entry);
    return entry.result;
};
