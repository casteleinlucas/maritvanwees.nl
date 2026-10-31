<!-- the mvw monogram: caslon capitals with an italic v, in a double ring with a stitched ring
     inside. decorative only; the name always stands in text next to or under it -->
<template>
  <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
    <circle cx="60" cy="60" r="58.5" fill="none" stroke="currentColor" stroke-width="1.1" />
    <circle cx="60" cy="60" r="55" fill="none" stroke="currentColor" stroke-width=".55" />
    <circle
      cx="60"
      cy="60"
      r="49.5"
      fill="none"
      stroke="currentColor"
      stroke-width="1.05"
      stroke-dasharray="2.4 2.6"
      stroke-linecap="round"
      opacity=".75"
    />
    <text x="39.5" y="72" text-anchor="middle" class="caps">M</text>
    <text x="60.5" y="64" text-anchor="middle" class="v">v</text>
    <text x="81" y="72" text-anchor="middle" class="caps">W</text>
    <path d="M33 82.5h54" stroke="currentColor" stroke-width=".6" />
    <path d="M57.5 82.5 60 80l2.5 2.5L60 85z" fill="currentColor" />
  </svg>
</template>

<style scoped>
text {
  fill: currentColor;
}

.caps {
  font-family: var(--font-display);
  font-size: 40px;
}

.v {
  font-family: var(--font-text);
  font-size: 21px;
  font-style: italic;
}
</style>
