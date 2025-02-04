import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  categories: defineTable({
    icon: v.string(),
    path: v.string(),
    title: v.string(),
    color: v.optional(v.string()),
  }),
});
