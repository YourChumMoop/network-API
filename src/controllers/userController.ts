import { Thought } from '../models';
import User from '../models/User';
import { Request, Response } from 'express';

//GET
export const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
};

export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('friends')
            .populate('thoughts');

        if (!user) {
            res.status(404).json({ message: 'No user with that ID' });
        } else {
            res.json(user);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};


// CREATE
export const createUser = async (req: Request, res: Response) => {
    try {
        const dbUserData = await User.create(req.body);
        res.json(dbUserData);
    } catch (err) {
        res.status(500).json(err);
    }
};

//UPDATE
export const updateUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.userId},
            { $set: req.body },
            { runValidators: true, new: true },
        );

        if (!user) {
            return res.status(404).json({ message: 'No user with given ID found'});
        }

        res.json(user);
        return;

    } catch (err) {
        res.status(500).json(err);
        return;
    }
};


// DELETE
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ _id: req.params.userId });
        const deleteUser = await User.findOneAndDelete({_id: user?._id})

        if(!deleteUser) {
            return res.status(404).json({ message: 'No user with given ID found' });
        }

        const deleteThoughts = await Thought.deleteMany(
            { username: user?.username},
        )

        if(!deleteThoughts) {
            res.json({message: 'No thoughts, head empty!'});
        }

        res.json({ message: 'User deleted!'});
    }
    catch (err) {
        res.status(500).json(err);
    }

    return;

}