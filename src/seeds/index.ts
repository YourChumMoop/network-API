import db from '../config/connection.js'
import { Thought, User } from '../models/index.js';
import { seedData } from './data.js'

try {
    await db();
    await User.deleteMany({});
    console.log('Users Cleared');

    await Thought.deleteMany({});
    console.log('Thoughts Cleared');

    await User.create(seedData);
    console.table(seedData);
    console.log('Seeding Complete');
    process.exit(0);
} catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
}