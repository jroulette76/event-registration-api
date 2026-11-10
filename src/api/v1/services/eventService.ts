import { Event } from "../models/eventModel";
import {
    createDocument,
    getDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument,
} from "../repositories/firestoreRepository";

const COLLECTION = "events";

/**
 * Retrieves all events from Firestore
 */
export const getAllEvents = async (): Promise<Event[]> => {
    try {
        const snapshot = await getDocuments(COLLECTION);

        const events: Event[] = snapshot.docs.map((doc) => {
            const data = doc.data();

            return {
                id: doc.id,
                ...data,
                date: data.date?.toDate
                    ? data.date.toDate()
                    : data.date,
                createdAt: data.createdAt?.toDate() || new Date(),
                updatedAt: data.updatedAt?.toDate() || new Date(),
            } as Event;
        });

        return events;
    } catch (error) {
        throw error;
    }
};

/**
 * Creates a new event
 */
export const createEvent = async (
    eventData: Omit<Event, "id" | "createdAt" | "updatedAt">
): Promise<Event> => {
    try {
        const now = new Date();

        const newEventData = {
            ...eventData,
            createdAt: now,
            updatedAt: now,
        };

        const id = await createDocument<Event>(
            COLLECTION,
            newEventData
        );

        return {
            id,
            ...newEventData,
        } as Event;
    } catch (error) {
        throw error;
    }
};

/**
 * Retrieves a single event by ID
 */
export const getEventById = async (
    id: string
): Promise<Event> => {
    try {
        const doc = await getDocumentById(COLLECTION, id);

        if (!doc) {
            throw new Error(`Event with ID ${id} not found`);
        }

        const data = doc.data();
        if (!data) {
            throw new Error(`Event with ID ${id} has no data`);
        }

        return {
            id: doc.id,
            ...data,
            date: data?.date?.toDate
                ? data.date.toDate()
                : data.date,
            createdAt: data?.createdAt?.toDate() || new Date(),
            updatedAt: data?.updatedAt?.toDate() || new Date(),
        } as Event;
    } catch (error) {
        throw error;
    }
};

/**
 * Updates an event
 */
export const updateEvent = async (
    id: string,
    eventData: Partial<Event>
): Promise<Event> => {
    try {
        const updateData = {
            ...eventData,
            updatedAt: new Date(),
        };

        await updateDocument<Event>(
            COLLECTION,
            id,
            updateData
        );

        return await getEventById(id);
    } catch (error) {
        throw error;
    }
};

/**
 * Deletes an event
 */
export const deleteEvent = async (
    id: string
): Promise<void> => {
    try {
        const doc = await getDocumentById(COLLECTION, id);

        if (!doc) {
            throw new Error(`Event with ID ${id} not found`);
        }

        await deleteDocument(COLLECTION, id);
    } catch (error) {
        throw error;
    }
};