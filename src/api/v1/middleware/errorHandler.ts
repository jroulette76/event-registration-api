import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { errorResponse } from "../models/responseModel";

/**
 * Centralized error handling middleware
 */
export const errorHandler = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (error.message.includes("not found")) {
        res.status(HTTP_STATUS.NOT_FOUND).json(
            errorResponse(error.message)
        );
        return;
    }

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
        errorResponse(error.message)
    );
};