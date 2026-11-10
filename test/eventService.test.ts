import * as eventService from "../src/api/v1/services/eventService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";

// Mock the repository module
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Event Service", () => {
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

        (
            firestoreRepository.createDocument as jest.Mock
        ).mockResolvedValue(mockDocumentId);

        // Act
        const result = await eventService.createEvent(
            mockEventData
        );

        // Assert
        expect(
            firestoreRepository.createDocument
        ).toHaveBeenCalledWith(
            "events",
            expect.objectContaining({
                name: mockEventData.name,
                capacity: mockEventData.capacity,
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date),
            })
        );

        expect(result.id).toBe(mockDocumentId);
        expect(result.name).toBe(mockEventData.name);
    });
});

it("should retrieve all events successfully", async () => {
    // Arrange
    const mockSnapshot = {
        docs: [
            {
                id: "event-1",
                data: () => ({
                    name: "Test Event",
                    date: {
                        toDate: () => new Date("2027-05-01"),
                    },
                    capacity: 100,
                    registrationCount: 0,
                    status: "active",
                    category: "general",
                    createdAt: {
                        toDate: () => new Date(),
                    },
                    updatedAt: {
                        toDate: () => new Date(),
                    },
                }),
            },
        ],
    };

    (
        firestoreRepository.getDocuments as jest.Mock
    ).mockResolvedValue(mockSnapshot);

    // Act
    const result = await eventService.getAllEvents();

    // Assert
    expect(
        firestoreRepository.getDocuments
    ).toHaveBeenCalledWith("events");

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Test Event");
});