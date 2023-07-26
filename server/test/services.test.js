import { assert } from 'chai';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import { getHistory, calculate, invalidCommand } from '../services/index.js';

describe('bot calculator', () => {
    let mongoServer;

    before(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
    });

    after(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it('should calculate command', async () => {
        const result = await calculate('1 + 1');
        assert.equal(result, 2);
    });

    it('should get invalid command ', async () => {
        const result = await calculate('a1+d');
        assert.equal(result, invalidCommand);
    });

    it('should return history of commands ', async () => {
        const history = await getHistory();
        assert.equal(history.length, 2);
    });
});
