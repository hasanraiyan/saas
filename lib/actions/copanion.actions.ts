"use server";
import { auth } from "@clerk/nextjs/server";
import {createSupabaseClient} from "@/lib/supabase";

export const createCompanion = async (formData: CreateCompanion) => {
    // Get the Clerk user and the token
    const { userId: author } = await auth();

    // Create the Supabase client with the Clerk JWT
    const supabase = createSupabaseClient();

    // Insert into the 'companions' table
    const { data, error } = await supabase
        .from("companions")
        .insert({ ...formData, author })
        .select();

    // Error handling
    if (error || !data) {
        throw new Error(error?.message || "Failed to create a companion");
    }

    return data;
};
