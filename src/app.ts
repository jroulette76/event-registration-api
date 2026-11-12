// import the express application and type definition
import express, { Express } from "express";
import morgan from "morgan";
import { errorHandler } from "./api/v1/middleware/errorHandler";

import eventRoutes from "./api/v1/routes/eventRoutes";

// initialize the express application
const app: Express = express();

// Interface for health check response
interface HealthCheckResponse {
    status: string;
    uptime: number;
    timestamp: string;
    version: string;
}

// Middleware START
app.use(morgan("combined"));

// Ensures incoming body is correctly parsed to JSON
app.use(express.json());

// Middleware END

// Root endpoint
app.get("/", (req, res) => {
    res.send("Hello World");
});

/**
 * Health check endpoint
 */
app.get("/api/v1/health", (req, res) => {
    const healthData: HealthCheckResponse = {
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    };

    res.json(healthData);
});

// Event Routes
app.use("/api/v1/events", eventRoutes);

// Error Handler
app.use(errorHandler);

export default app;