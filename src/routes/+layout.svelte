<script>
  import "../app.postcss";
  import { AppShell } from '@skeletonlabs/skeleton';
</script>


<AppShell>
  <svelte:fragment slot="header">Header</svelte:fragment>
  <slot />
  <svelte:fragment slot="footer">Footer</svelte:fragment>
</AppShell>
