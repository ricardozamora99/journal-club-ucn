function unfoldIcs(text) {
  // ICS lines can be folded: newline + space
  return text.replace(/\r?\n[ \t]/g, "");
}

function parseIcsEvents(icsText) {
  const text = unfoldIcs(icsText);
  const blocks = text.split("BEGIN:VEVENT").slice(1);

  return blocks.map((b) => {
    const body = b.split("END:VEVENT")[0];

    const get = (key) => {
      // Matches: KEY:VALUE or KEY;PARAM=...:VALUE
      const re = new RegExp(`^${key}(;[^:]*)?:(.*)$`, "m");
      const m = body.match(re);
      return m ? (m[2] || "").trim() : "";
    };

    return {
      title: get("SUMMARY"),
      description: get("DESCRIPTION").replace(/\\n/g, "\n"),
      where: get("LOCATION"),
      url: get("URL"),
      dtstart: get("DTSTART"),
      dtend: get("DTEND"),
    };
  });
}

function icsDateToDate(dt) {
  // Handles:
  //  - 20260203T150000Z
  //  - 20260203T150000
  //  - 20260203
  if (!dt) return null;

  const m1 = dt.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z?$/);
  if (m1) {
    const [, y, mo, d, h, mi, s] = m1;
    // If has Z, treat as UTC; else local-ish.
    const hasZ = dt.endsWith("Z");
    return hasZ
      ? new Date(Date.UTC(+y, +mo - 1, +d, +h, +mi, +s))
      : new Date(+y, +mo - 1, +d, +h, +mi, +s);
  }

  const m2 = dt.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (m2) {
    const [, y, mo, d] = m2;
    return new Date(+y, +mo - 1, +d);
  }

  return null;
}

function formatWhen(date) {
  if (!date) return "";
  // Simple readable format; you can change later
  return date.toLocaleString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export async function getNextEventFromIcs() {
  const icsUrl = process.env.GOOGLE_CALENDAR_ICS_URL;
  if (!icsUrl) {
    return { when: "", where: "", title: "", description: "", url: "" };
  }

  const res = await fetch(icsUrl, { next: { revalidate: 60 } }); // refresh every 60s
  if (!res.ok) {
    return { when: "", where: "", title: "", description: "", url: "" };
  }

  const icsText = await res.text();
  const events = parseIcsEvents(icsText)
    .map((e) => {
      const start = icsDateToDate(e.dtstart);
      return { ...e, start };
    })
    .filter((e) => e.start && e.start.getTime() > Date.now())
    .sort((a, b) => a.start - b.start);

  const e = events[0];
  if (!e) return { when: "", where: "", title: "", description: "", url: "" };

  return {
    when: formatWhen(e.start),
    where: e.where || "",
    title: e.title || "",
    description: e.description || "",
    url: e.url || "",
  };
}
