import * as eventService from "../src/api/v1/services/eventService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";

// Mock the repository module
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("createEvent", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
  
    it("should create an event successfully", async () => {
        // Arrange
        const mockEventData = {
            name: "Test Event",
            date: new Date("2027-05-01"),
            capacity: 100,
            registrationCount: 0,
            status: "active" as const,
            category: "general" as const,
        };

        const mockDocumentId = "test-event-id";

        (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
            mockDocumentId
        );

        // Act
        const result = await eventService.createEvent(mockEventData);

        // Assert
        expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
            "events",
            expect.objectContaining({
                name: mockEventData.name,
                date: mockEventData.date,
                capacity: mockEventData.capacity,
                registrationCount: mockEventData.registrationCount,
                status: mockEventData.status,
                category: mockEventData.category,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            })
        );

        expect(result).toBeDefined();
        expect(result.id).toBe(mockDocumentId);
        expect(result.name).toBe(mockEventData.name);
        expect(result.date).toEqual(mockEventData.date);
        expect(result.capacity).toBe(mockEventData.capacity);
        expect(result.registrationCount).toBe(mockEventData.registrationCount);
        expect(result.status).toBe(mockEventData.status);
        expect(result.category).toBe(mockEventData.category);
        expect(result.createdAt).toBeInstanceOf(Date);
        expect(result.updatedAt).toBeInstanceOf(Date);
    });
});

describe("getAllEvents", () => {
    it("should successfully retrieve all events", async () => {
        // Arrange
        const mockSnapshot = {
            docs: [
                {
                    id: "event-1",
                    data: () => ({
                        name: "Test Event",
                        date: new Date("2027-05-01"),
                        capacity: 100,
                        registrationCount: 0,
                        status: "active",
                        category: "general",
                    }),
                },
            ],
        };

        (firestoreRepository.getDocuments as jest.Mock)
            .mockResolvedValue(mockSnapshot);

        // Act
        const result = await eventService.getAllEvents();

        // Assert
        expect(firestoreRepository.getDocuments)
            .toHaveBeenCalledWith("events");

        expect(result).toHaveLength(1);
        expect(result[0].id).toBe("event-1");
        expect(result[0].name).toBe("Test Event");
        expect(result[0].capacity).toBe(100);
    });
});

describe("getEventById", () => {
    it("should successfully retrieve an event by ID", async () => {
        // Arrange
        const mockEventId = "test-event-id";

        const mockDoc = {
            id: mockEventId,
            data: () => ({
                name: "Test Event",
                date: new Date("2027-05-01"),
                capacity: 100,
                registrationCount: 0,
                status: "active",
                category: "general",
            }),
        };

        (firestoreRepository.getDocumentById as jest.Mock)
            .mockResolvedValue(mockDoc);

        // Act
        const result = await eventService.getEventById(mockEventId);

        // Assert
        expect(firestoreRepository.getDocumentById)
            .toHaveBeenCalledWith("events", mockEventId);

        expect(result).toBeDefined();
        expect(result.id).toBe(mockEventId);
        expect(result.name).toBe("Test Event");
        expect(result.date).toEqual(new Date("2027-05-01"));
        expect(result.capacity).toBe(100);
        expect(result.registrationCount).toBe(0);
        expect(result.status).toBe("active");
        expect(result.category).toBe("general");
        expect(result.createdAt).toBeInstanceOf(Date);
        expect(result.updatedAt).toBeInstanceOf(Date);
    });
});

describe("updateEvent", () => {
    it("should successfully update an event", async () => {
        // Arrange
        const mockEventId = "test-event-id";

        const mockCreatedAt = new Date("2026-01-01");
        const mockUpdatedAt = new Date("2026-11-10");

        const mockUpdatedEvent = {
            id: mockEventId,
            name: "Updated Test Event",
            date: new Date("2027-05-01"),
            capacity: 150,
            registrationCount: 0,
            status: "active",
            category: "general",
            createdAt: mockCreatedAt,
            updatedAt: mockUpdatedAt,
        };

        (firestoreRepository.updateDocument as jest.Mock)
            .mockResolvedValue(undefined);

        (firestoreRepository.getDocumentById as jest.Mock)
            .mockResolvedValue({
                id: mockEventId,
                data: () => ({
                    name: mockUpdatedEvent.name,
                    date: mockUpdatedEvent.date,
                    capacity: mockUpdatedEvent.capacity,
                    registrationCount: mockUpdatedEvent.registrationCount,
                    status: mockUpdatedEvent.status,
                    category: mockUpdatedEvent.category,
                    createdAt: {
                        toDate: () => mockCreatedAt,
                    },
                    updatedAt: {
                        toDate: () => mockUpdatedAt,
                    },
                }),
            });

        // Act
        const result = await eventService.updateEvent(
            mockEventId,
            {
                name: "Updated Test Event",
                capacity: 150,
            }
        );

        // Assert
        expect(firestoreRepository.updateDocument)
            .toHaveBeenCalledWith(
                "events",
                mockEventId,
                expect.objectContaining({
                    name: "Updated Test Event",
                    capacity: 150,
                    updatedAt: expect.any(Date),
                })
            );

        expect(firestoreRepository.getDocumentById)
            .toHaveBeenCalledWith("events", mockEventId);

        expect(result).toBeDefined();
        expect(result.id).toBe(mockEventId);
        expect(result.name).toBe("Updated Test Event");
        expect(result.date).toEqual(mockUpdatedEvent.date);
        expect(result.capacity).toBe(150);
        expect(result.registrationCount).toBe(0);
        expect(result.status).toBe("active");
        expect(result.category).toBe("general");
        expect(result.createdAt).toEqual(mockCreatedAt);
        expect(result.updatedAt).toEqual(mockUpdatedAt);
    });
});

describe("deleteEvent", () => {
    it("should successfully delete an event", async () => {
        // Arrange
        const mockEventId = "test-event-id";

        const mockDoc = {
            id: mockEventId,
            data: () => ({
                name: "Test Event",
                date: new Date("2027-05-01"),
                capacity: 100,
                registrationCount: 0,
                status: "active",
                category: "general",
            }),
        };

        (firestoreRepository.getDocumentById as jest.Mock)
            .mockResolvedValue(mockDoc);

        (firestoreRepository.deleteDocument as jest.Mock)
            .mockResolvedValue(undefined);

        // Act
        const result = await eventService.deleteEvent(mockEventId);

        // Assert
        expect(firestoreRepository.getDocumentById)
            .toHaveBeenCalledWith("events", mockEventId);

        expect(firestoreRepository.deleteDocument)
            .toHaveBeenCalledWith("events", mockEventId);

        expect(result).toBeUndefined();
    });
});
