import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/api/v1/middleware/validate";
import { eventSchemas } from "../src/api/v1/validation/eventSchemas";
import { HTTP_STATUS } from "../src/constants/httpConstants";

describe("Validation Middleware", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            body: {},
            params: {},
            query: {},
        };

        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        mockNext = jest.fn();
    });

    it("should pass validation for valid event data", () => {
        // Arrange
        mockReq.body = {
            name: "Test Event",
            date: "2027-05-01T09:00:00.000Z",
            capacity: 100,
        };

        const middleware = validateRequest(
            eventSchemas.create
        );

        // Act
        middleware(
            mockReq as Request,
            mockRes as Response,
            mockNext
        );

        // Assert
        expect(mockNext).toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalled();
        expect(mockRes.status).not.toHaveBeenCalledWith(
            HTTP_STATUS.BAD_REQUEST
        );
    });
});