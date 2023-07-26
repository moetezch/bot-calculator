import { evaluate } from 'mathjs';
import { History } from '../database/schemas/History';

export const invalidCommand = 'Invalid command';

export const getHistory = async () => {
    const history = await History.find({}).sort({ _id: -1 }).limit(10).exec();
    return history;
};

export const setHistory = async ({ command, result } : { command:string , result: string}) => {
    const newHistory = new History({
        command,
        result,
    });
    await newHistory.save();
};

export const calculate = async (command:string) => {
    const entry = {
        command,
        result:invalidCommand
    };
    try {
        const result = evaluate(command);
        entry.result = result;
    } catch (error) {
        console.log("invalid command")
    }

    await setHistory(entry);
    return entry.result;
};
