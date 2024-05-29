import * as z from 'zod';

// ============================================================
// USER
// ============================================================







// ============================================================
// POST
// ============================================================

const categoryList = [
    "Frontend",
    "Backend",
    "Cloud Computing",
    "AI",
    "Data Science",
    "Design",
    "Machine Learning",
    "Embedded System",
    "Video game",
    "Api development",
    "Database development",
] as const;

const CategoryEnum = z.enum(categoryList);

export const PostValidation = z.object({
    content: z.string().min(10, {message: "Minimum 10 characters"}).max(500, {message: "Maximum 500 characters"}),
    file: z.custom<File[]>(),
    category: CategoryEnum,
    tags: z.string()
})