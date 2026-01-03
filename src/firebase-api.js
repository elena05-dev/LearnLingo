import { db } from "./firebase";
import { ref, get, child } from "firebase/database";

export async function fetchTeachers() {
  try {
    const snapshot = await get(child(ref(db), "teachers"));
    if (snapshot.exists()) {
      return Object.entries(snapshot.val()).map(([id, teacher]) => ({
        id,
        ...teacher,
      }));
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching teachers:", error);
    return [];
  }
}
