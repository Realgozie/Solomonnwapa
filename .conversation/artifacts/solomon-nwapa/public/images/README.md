# Local image assets

Use approved, locally stored images only. The personal photo slots are distinct
and already have responsive placeholders; do not use stock photos as substitutes.

## Personal photographs

Add each image at its exact target path, then set the matching `src` and `alt`
fields in `src/content/site.ts`:

- `public/images/profile/solomon-hero.jpg` — homepage hero
  (`images.heroPortrait`)
- `public/images/profile/solomon-about.jpg` — About profile
  (`images.aboutPortrait`)
- `public/images/profile/solomon-professional.jpg` — additional professional
  photograph on the About page (`images.professionalPortrait`)

For example, the public path for `solomon-hero.jpg` is
`/images/profile/solomon-hero.jpg`. Leave each `src` as `null` until that file
exists. The page will continue to show its designed placeholder.

## Project and social images

- `public/images/projects/adboss/` — confirmed AdBOSS screenshots
- `public/images/projects/novasplit/` — confirmed NovaSplit screenshots
- `public/images/og/solomon-nwapa.png` — optional custom 1200×630 social image

Project screenshot paths, dimensions, and accurate alt text belong in the
corresponding file under `src/content/projects/`. Set `images.socialImage` in
`src/content/site.ts` only after adding the custom social image. Otherwise the
site uses its generated Open Graph artwork.
