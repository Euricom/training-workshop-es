---
title: Euricom - JavaScript Tooling
theme: euricom
lineNumbers: true
---

# Javascript Tooling

<div class="absolute bottom-10">
  <small>
  Copyright (c) 2017-2022 Euricom nv.
  </small>
</div>

---

# Package Managers

* [Npm](https://www.npmjs.com/)
* [Yarn](https://yarnpkg.com/)
* [pNpm](https://pnpm.io/)

<img src="/package-managers.png" class="h-90 ml-40" />

---

# Formatter

<img src="/prettier.jpeg" class="h-90" />

See [https://prettier.io/](https://prettier.io/)

---

# Linter

<img src="/eslint.png" class="h-90" />

See [https://eslint.org](https://eslint.org/) & [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)

---

# Starter kits

See `<root>/starters`

* js-node
* ts-node-vitest
* ts-web-vite

Included; prettier, eslint, jest/vitest (UT), bundler, ...

---

# Bundling 

<img src="/bundlers.png" class="h-60" />

<v-clicks>

- **Gulp, Grunt**: To concatenate all the JS/CSS into one file.

- **Browserify**: To support commonJS and a module system in the browser.

- **WebPack, Rollup and Parcel**: To enable writing any module format (UMD, CJS, IIFE, ESM) and bundle it for the browser. 
  
</v-clicks>

---

# Webpack

Not only a bundler

<img src="/webpack-dev-server.png" class="h-80" />


---
cols: 1-1
---

# Bundling problem

* Larger project, more files 
* Processing files and bundling gets slower and slower

<br /> <br /> 

# 💡 No Bundling

Due to ESM we don't need bundling

* The browser is our bundler
* And so **SnowPack** and **Vite** came to live

::right::

<img src="/bundle-time.png" class="h-110" />

---

# End of bundeling

<img src="/bundlers-after.png" class="h-110" />


---

## Vite vs Webpack/rollbar/parcel

<img src="/vite-vs-rollup.jpeg" class="h-110" />
