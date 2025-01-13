import { Router } from "express";
import { addThoughtReaction, createThought, deleteThought, getSingleThought, getThoughts, removeThoughtReaction, updateThought } from "../../controllers/thoughtController";
const router = Router();


// /api/thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
    .post(addThoughtReaction);

router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeThoughtReaction);

export default router;