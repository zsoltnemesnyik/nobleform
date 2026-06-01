export const INQUIRY_STATUSES = ["NEW", "REPLIED", "CLOSED"] as const;

export type InquiryStatus = typeof INQUIRY_STATUSES[number];

// Színek / stíluskódok (ha van ilyen)
export const INQUIRY_STATUS_CONFIG = {
  NEW: {
    label: "New",
    color: "bg-blue-100 text-blue-700",
  },
  REPLIED: {
    label: "Replied",
    color: "bg-yellow-100 text-yellow-700",
  },
  CLOSED: {
    label: "Closed",
    color: "bg-gray-100 text-gray-700",
  },
} as const;