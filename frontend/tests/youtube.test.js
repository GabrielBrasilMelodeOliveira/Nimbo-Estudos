import { test } from "node:test";
import assert from "node:assert/strict";
import { youtubeVideo } from "../src/pages/materials/utils/youtube.js";
const id = "M7lc1UVf-VE";
test("recognizes YouTube watch, short, live and embed URLs and keeps start time", () => {
  for (const url of [
    `https://www.youtube.com/watch?v=${id}`,
    `https://youtu.be/${id}`,
    `https://m.youtube.com/shorts/${id}`,
    `https://youtube.com/live/${id}`,
    `https://www.youtube-nocookie.com/embed/${id}`,
  ]) {
    assert.equal(youtubeVideo(url).id, id);
    assert.ok(
      youtubeVideo(url).embedUrl.startsWith(
        "https://www.youtube-nocookie.com/embed/",
      ),
    );
  }
  assert.ok(
    youtubeVideo(`https://youtu.be/${id}?t=1h2m3s`).embedUrl.endsWith(
      "start=3723",
    ),
  );
});
test("rejects malformed IDs, script URLs and lookalike hosts", () => {
  for (const url of [
    `javascript:alert(1)`,
    `https://youtube.com.evil.example/watch?v=${id}`,
    `https://youtu.be/${id}/extra`,
    `https://youtube.com/watch?v=invalid`,
    `https://youtube.com@evil.example/watch?v=${id}`,
    "not a URL",
  ])
    assert.equal(youtubeVideo(url), null);
});
