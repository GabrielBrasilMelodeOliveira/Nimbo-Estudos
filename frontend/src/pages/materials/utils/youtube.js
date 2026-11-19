export function youtubeVideo(url) {
  try {
    const parsed = new URL(url);
    if (
      !["https:", "http:"].includes(parsed.protocol) ||
      parsed.username ||
      parsed.password
    )
      return null;
    const host = parsed.hostname.toLowerCase();
    const segments = parsed.pathname.split("/").filter(Boolean);
    let id;
    if (host === "youtu.be") id = segments.length === 1 ? segments[0] : null;
    else if (
      [
        "youtube.com",
        "www.youtube.com",
        "m.youtube.com",
        "youtube-nocookie.com",
        "www.youtube-nocookie.com",
      ].includes(host)
    ) {
      if (parsed.pathname === "/watch") id = parsed.searchParams.get("v");
      else if (
        ["embed", "shorts", "live"].includes(segments[0]) &&
        segments.length === 2
      )
        id = segments[1];
    }
    if (!/^[a-zA-Z0-9_-]{11}$/.test(id || "")) return null;
    const rawTime =
      parsed.searchParams.get("start") || parsed.searchParams.get("t") || "0";
    const duration = rawTime.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
    const seconds = /^\d+$/.test(rawTime)
      ? Number(rawTime)
      : duration
        ? Number(duration[1] || 0) * 3600 +
          Number(duration[2] || 0) * 60 +
          Number(duration[3] || 0)
        : 0;
    const start = Math.min(604800, seconds);
    return {
      id,
      embedUrl: `https://www.youtube-nocookie.com/embed/${id}?rel=0&playsinline=1&start=${start}`,
    };
  } catch {
    return null;
  }
}
