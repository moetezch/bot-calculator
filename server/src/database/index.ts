import mongoose from 'mongoose';

async function main() {
    await mongoose.connect('mongodb://mongo_db:27017/calculator_bot');
}

main().catch((err) => console.log(err));
