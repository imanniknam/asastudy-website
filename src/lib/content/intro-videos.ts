import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { VideoItem } from "@/types/university";

const CONTENT_FILE = path.join(process.cwd(), "src", "content", "intro-videos.json");

/** General "study in Iran" videos shown on the home page. */
export function getIntroVideos(): VideoItem[] {
  if (!fs.existsSync(CONTENT_FILE)) return [];
  return JSON.parse(fs.readFileSync(CONTENT_FILE, "utf-8")) as VideoItem[];
}
