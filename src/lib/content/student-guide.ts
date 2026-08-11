import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { StudentGuideContent } from "@/types/student-guide";

const CONTENT_FILE = path.join(process.cwd(), "src", "content", "student-guide.json");

export function getStudentGuide(): StudentGuideContent {
  return JSON.parse(fs.readFileSync(CONTENT_FILE, "utf-8")) as StudentGuideContent;
}
