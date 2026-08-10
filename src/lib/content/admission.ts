import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { AdmissionContent } from "@/types/admission";

const CONTENT_FILE = path.join(process.cwd(), "src", "content", "admission.json");

export function getAdmissionContent(): AdmissionContent {
  return JSON.parse(fs.readFileSync(CONTENT_FILE, "utf-8")) as AdmissionContent;
}
