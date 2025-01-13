import db from '../config/connection'
import { Thought, User } from '../models';
import { seedData } from './data'

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