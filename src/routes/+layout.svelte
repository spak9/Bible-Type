<script>
  import "../app.postcss";
  import { AppShell } from '@skeletonlabs/skeleton';

  export let data;
</script>


<!-- AppShell == Header + page slot + Footer -->
<AppShell>
  <svelte:fragment slot="header">
    <nav class="flex items-center my-8">
      <a href="/" class="btn">
        Bible Type
      </a>
      <a href="/about" class="btn-icon ml-auto">
        <i class="fas fa-info"></i>  
      </a>
      <a href="/account" class="btn-icon">
        <i class="fas fa-user"></i> 
      </a>
    </nav>
  </svelte:fragment>
  <slot />
  {#if data?.user}
    <form method="POST" action="/logout" class="">
      <i class="fas fa-sign-out-alt"></i>
    </form>
  {/if}
  <div slot="footer" class="my-8">Footer</div>
</AppShell>
