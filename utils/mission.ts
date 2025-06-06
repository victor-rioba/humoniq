import type { MissionStatus } from "~/types";

export function formatDate(dateString?: string) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatDuration(seconds?: number | null) {
  if (!seconds && seconds !== 0) return "N/A";
  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

export function statusColorClass(status: MissionStatus | string | undefined) {
  const s = (status || "").toLowerCase();
  if (s.includes("success") || s === "completed") {
    return "bg-green-100 text-green-800";
  } else if (s.includes("fail") || s.includes("error")) {
    return "bg-red-100 text-red-800";
  } else if (s.includes("progress") || s === "active") {
    return "bg-blue-100 text-blue-800";
  } else if (s.includes("pending")) {
    return "bg-yellow-100 text-yellow-800";
  } else if (s.includes("evaluated")) {
    return "bg-purple-100 text-purple-800";
  }
  return "bg-gray-100 text-gray-800";
}

export function cleanAndParseJson(dirtyJsonString: string) {
  // This mirrors your legacy cleaning logic.
  const cleanedString = dirtyJsonString
    .replace(/\\n/g, "")
    .replace(/\\\\/g, "\\")
    .replace(/\\"/g, '"');
  return JSON.parse(cleanedString);
}

export function formatStatus(status: string) {
  if (!status) return "Unknown";
  return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
