import { Router } from 'express';
const router = Router();
import { getUsers, getSingleUser, createUser, addFriend, deleteFriend, deleteUser } from '../../controllers/userController.js';

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/:userId')
    .get(getSingleUser)
    .delete(deleteUser);

router.route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend);

export default router;