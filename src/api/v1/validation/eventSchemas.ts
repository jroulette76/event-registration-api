import Joi from "joi";

export const eventSchemas = {
    // POST /events
    create: {
        body: Joi.object({
            name: Joi.string()
                .min(3)
                .required()
                .messages({
                    "any.required": "Name is required",
                    "string.empty": "Name cannot be empty",
                    "string.min": "Name must be at least 3 characters long",
                }),

            date: Joi.date()
                .iso()
                .greater("now")
                .required()
                .messages({
                    "any.required": "Date is required",
                    "date.base": "Date must be a valid date",
                    "date.greater": "Date must be in the future",
                }),

            capacity: Joi.number()
                .integer()
                .min(5)
                .required()
                .messages({
                    "any.required": "Capacity is required",
                    "number.integer": "Capacity must be an integer",
                    "number.min": "Capacity must be at least 5",
                }),

            registrationCount: Joi.number()
                .integer()
                .min(0)
                .max(Joi.ref("capacity"))
                .default(0),

            status: Joi.string()
                .valid("active", "cancelled", "completed")
                .default("active"),

            category: Joi.string()
                .valid(
                    "conference",
                    "workshop",
                    "meetup",
                    "seminar",
                    "general"
                )
                .default("general"),
        }),
    },

    // GET /events/:id
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Event ID is required",
                "string.empty": "Event ID cannot be empty",
            }),
        }),
    },

    // PUT /events/:id
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Event ID is required",
                "string.empty": "Event ID cannot be empty",
            }),
        }),
        body: Joi.object({
            name: Joi.string().min(3).optional(),

            date: Joi.date()
                .iso()
                .greater("now")
                .optional(),

            capacity: Joi.number()
                .integer()
                .min(5)
                .optional(),

            registrationCount: Joi.number()
                .integer()
                .min(0)
                .optional(),

            status: Joi.string()
                .valid("active", "cancelled", "completed")
                .optional(),

            category: Joi.string()
                .valid(
                    "conference",
                    "workshop",
                    "meetup",
                    "seminar",
                    "general"
                )
                .optional(),
        }),
    },

    // DELETE /events/:id
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Event ID is required",
                "string.empty": "Event ID cannot be empty",
            }),
        }),
    },

    // GET /events
    list: {
        query: Joi.object({
            page: Joi.number()
                .integer()
                .min(1)
                .default(1),

            limit: Joi.number()
                .integer()
                .min(1)
                .max(100)
                .default(10),
        }),
    },
};