# Ritesh — Netflix-inspired developer portfolio

A responsive React + Vite portfolio inspired by streaming-service interfaces.

## Run locally

1. Install Node.js (LTS).
2. Extract this folder and open a terminal inside it.
3. Run `npm install`
4. Run `npm run dev`
5. Open the local URL Vite prints in your terminal.

## Edit the content

The content catalog is in **`src/content.json`**. It stores the hero copy, media paths/URLs, featured project IDs, projects, blog cards, and connection cards.

- `hero.video`: add a video URL or local public path, for example `/videos/hero.mp4`. Leave it as `""` to use the hero image.
- `hero.image`: hero poster/fallback image.
- `featured`: IDs from the `projects` array, in the order you want to show.
- `projects`: add/remove projects here. Use unique `id` values.
- `blogs`: add your posts and URLs here.
- `connect`: change social URLs and contact-card details here.
- `image` and `video`: can be external URLs or local paths in Vite's `public/` directory, e.g. `/images/trunet-poster.jpg` and `/videos/trunet-trailer.mp4`.
- `url`: external project/blog/social destination. Empty URLs hide the primary external action in the details popup.
- `github`: optional source-code link shown in the details panel.

## Add a project

Copy one object from `projects`, give it a unique `id`, update its content, then optionally add its ID to `featured`.

## Notes

- The portfolio is prefilled with project/skills details from the provided resume. Confirm wording and add public demo/repository URLs before publishing.
- Placeholder blog entries are drafts; replace them with real articles or remove them.
- The GitHub card currently points to the general GitHub website. Replace it with your profile URL.
- Use media you own or have permission to use. For production, prefer optimized local assets and a compressed MP4/WebM background video.
- This starter uses external Unsplash image URLs for demo posters. To keep media local, download licensed images into `public/images/` and update the JSON paths.
