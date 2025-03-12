import { Note, CreateNoteDto, UpdateNoteDto, ApiResponse } from "@/models/Note";

/**
 * Service to handle API calls for notes
 * This demonstrates how to handle API requests in a client-side service
 */
export const noteService = {
  // Get all notes
  async getAllNotes(search?: string): Promise<Note[]> {
    try {
      const queryParams = search ? `?search=${encodeURIComponent(search)}` : "";
      const response = await fetch(`/api/notes${queryParams}`, {
        // Next.js App Router requires this to be specified for dynamic data
        cache: "no-store",
      });
      const result = (await response.json()) as ApiResponse<Note[]>;

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch notes");
      }

      return result.data || [];
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw error;
    }
  },

  // Get a single note by ID
  async getNoteById(id: string): Promise<Note> {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        cache: "no-store",
      });
      const result = (await response.json()) as ApiResponse<Note>;

      if (!result.success) {
        throw new Error(result.error || "Failed to fetch note");
      }

      if (!result.data) {
        throw new Error("Note not found");
      }

      return result.data;
    } catch (error) {
      console.error(`Error fetching note ${id}:`, error);
      throw error;
    }
  },

  // Create a new note
  async createNote(createNoteDto: CreateNoteDto): Promise<Note> {
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createNoteDto),
      });

      const result = (await response.json()) as ApiResponse<Note>;

      if (!result.success) {
        throw new Error(result.error || "Failed to create note");
      }

      if (!result.data) {
        throw new Error("No data returned after creating note");
      }

      return result.data;
    } catch (error) {
      console.error("Error creating note:", error);
      throw error;
    }
  },

  // Update an existing note
  async updateNote(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateNoteDto),
      });

      const result = (await response.json()) as ApiResponse<Note>;

      if (!result.success) {
        throw new Error(result.error || "Failed to update note");
      }

      if (!result.data) {
        throw new Error("Note not found");
      }

      return result.data;
    } catch (error) {
      console.error(`Error updating note ${id}:`, error);
      throw error;
    }
  },

  // Delete a note
  async deleteNote(id: string): Promise<void> {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "DELETE",
      });

      // BUG: This doesn't properly handle non-JSON responses
      // TASK: Implement proper error handling for non-JSON responses
      const result = (await response.json()) as ApiResponse<null>;

      if (!result.success) {
        throw new Error(result.error || "Failed to delete note");
      }
    } catch (error) {
      console.error(`Error deleting note ${id}:`, error);
      throw error;
    }
  },
};
