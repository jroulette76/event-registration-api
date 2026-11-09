import { Router } from "express";

import {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent,
} from "../controllers/eventController";

import { validateRequest } from "../middleware/validate";
import { eventSchemas } from "../validation/eventSchemas";

const router = Router();

/**
 * GET /events
 */
router.get(
    "/",
    validateRequest(eventSchemas.list),
    getAllEvents
);

/**
 * GET /events/:id
 */
router.get(
    "/:id",
    validateRequest(eventSchemas.getById),
    getEventById
);

/**
 * POST /events
 */
router.post(
    "/",
    validateRequest(eventSchemas.create),
    createEvent
);

/**
 * PUT /events/:id
 */
router.put(
    "/:id",
    validateRequest(eventSchemas.update),
    updateEvent
);

/**
 * DELETE /events/:id
 */
router.delete(
    "/:id",
    validateRequest(eventSchemas.delete),
    deleteEvent
);

export default router;