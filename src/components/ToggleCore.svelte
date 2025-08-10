<!-- Component modified based on:
https://svelte.dev/playground/d65a4e9f0ae74d1eb1b08d13e428af32 -->

<script>
  let { id, checked, onChange } = $props();
</script>

<div class="s s--slider">
  <button
      role="switch"
      aria-checked={checked}
      aria-labelledby={`switch-${id}`}
      onclick={onChange}>
  </button>
</div>

<style>
  :root {
      --accent-color: #FF0000;
      --gray: #4d4d4d;
      --slider-size: 1.3;
  }

  /* Slider Design Option */
  .s--slider {
      display: flex;
      align-items: center;
  }

  .s--slider button {
      width: calc(3em * var(--slider-size));
      height: calc(1.6em * var(--slider-size));
      position: relative;
      margin: 0 0 0 calc(0.5em * var(--slider-size));
      background: var(--gray);
      border: none;
  }

  .s--slider button::before {
      content: '';
      position: absolute;
      width: calc(1.3em * var(--slider-size));
      height: calc(1.3em * var(--slider-size));
      background: #fff;
      top: calc(0.13em * var(--slider-size));
      right: calc(1.5em * var(--slider-size));
      transition: transform 0.3s;
  }

  .s--slider button[aria-checked='true'] {
      background-color: var(--accent-color);
  }

  .s--slider button[aria-checked='true']::before {
      transform: translateX(calc(1.3em * var(--slider-size)));
      transition: transform 0.3s;
  }

  /* Slider Design Option */
  .s--slider button {
      border-radius: 1em;
  }

  .s--slider button::before {
      border-radius: 100%;
  }

</style>

