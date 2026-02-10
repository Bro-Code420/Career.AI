import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const storeUser = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            console.error("storeUser: No identity found. Check your Clerk + Convex auth configuration.");
            throw new Error("Called storeUser without authentication");
        }
        console.log("storeUser: Storing user", identity.email);

        // Check if we've already stored this user.
        const user = await ctx.db
            .query("user_profiles")
            .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
            .unique();

        if (user !== null) {
            // If we've seen this user before but their name or picture has changed, patch them.
            return user._id;
        }

        // If it's a new identity, create a new User.
        return await ctx.db.insert("user_profiles", {
            userId: identity.subject,
            email: identity.email ?? "unknown",
            createdAt: Date.now(),
        });
    },
});

export const getProfile = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;

        return await ctx.db
            .query("user_profiles")
            .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
            .unique();
    },
});
