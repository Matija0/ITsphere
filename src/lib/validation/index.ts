import * as z from 'zod';

// ============================================================
// USER
// ============================================================

export const ProfileValidation = z.object({
    username: z.string().min(3, {message: "Minimum 3 characters"}).max(20, {message: "Maximum 20 characters"}),
    email: z.string().email({message: "Invalid email"}),
    file: z.custom<File[]>().optional(),
    bio: z.string().max(200, {message: "Maximum 200 characters"}).optional(),
    country: z.string().optional(),
    githubLink: z.string().optional(),
    tags: z.string().optional()
})





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