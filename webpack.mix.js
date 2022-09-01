const DIST = "./admin";
const mix = require("laravel-mix");

mix
  .ts("src/ts/app.tsx", DIST).react()
  .sass("src/scss/main.scss", DIST)
  .minify(`${DIST}/main.css`);
