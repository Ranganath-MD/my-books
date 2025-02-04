import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getBooks = query({
	handler: async (ctx) => {
		return await ctx.db.query("books").collect();
	},
});

export const addBook = mutation({
	args: { title: v.string(), author: v.string() },
	handler: async (
		ctx,
		{ title, author }: { title: string; author: string }
	) => {
		await ctx.db.insert("books", {
			title,
			author,
		});
	},
});

export const deleteBook = mutation({
	args: { id: v.id("books") },
	handler: async (ctx, args) => {
		await ctx.db.delete(args.id);
	},
});
