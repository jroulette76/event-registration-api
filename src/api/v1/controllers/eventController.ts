import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import * as eventService from "../services/eventService";
import type { Event } from "../models/eventModel";
import { successResponse } from "../models/responseModel";

/**
 * Retrieves all events
 */
export const getAllEvents = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const events: Event[] = await eventService.getAllEvents();

        res.status(HTTP_STATUS.OK).json(
            successResponse(events, "Events retrieved successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves a single event by ID
 */
export const getEventById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = req.params.id as string;

        const event: Event = await eventService.getEventById(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse(event, "Event retrieved successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Creates a new event
 */
export const createEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const {
            name,
            date,
            capacity,
            registrationCount,
            status,
            category,
        } = req.body;

        const eventData = {
            name,
            date,
            capacity,
            registrationCount,
            status,
            category,
        };

        const newEvent: Event = await eventService.createEvent(eventData);

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newEvent, "Event created successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Updates an existing event
 */
export const updateEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = req.params.id as string;

        const updatedEvent: Event = await eventService.updateEvent(
            id,
            req.body
        );

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedEvent, "Event updated successfully")
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Deletes an event
 */
export const deleteEvent = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id = req.params.id as string;

        await eventService.deleteEvent(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse(null, "Event deleted successfully")
        );
    } catch (error) {
        next(error);
    }
};