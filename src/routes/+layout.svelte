<script>
  import "../app.postcss";
  import { AppShell } from '@skeletonlabs/skeleton';

  let currentVariant = "variant-filled"
</script>


<AppShell>
  <svelte:fragment slot="header">
    <nav class="flex items-center my-8">
      <a href="/" class="btn">
        Bible Type
      </a>
      <a href="/about" class="btn-icon">
        <i class="fa-regular fa-user"></i>
      </a>

    </nav>
  </svelte:fragment>
  <slot />
  <svelte:fragment slot="footer">Footer</svelte:fragment>
</AppShell>
