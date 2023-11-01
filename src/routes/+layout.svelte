<script>
  console.log("+layout.svelte route")
  import "../app.postcss";
  import { AppShell } from '@skeletonlabs/skeleton';

  export let data;
</script>


<!-- AppShell == Header + page slot + Footer -->
<AppShell scrollbarGutter="stable">
  <!-- Header/Navbar -->
  <svelte:fragment slot="pageHeader">
    <nav class="flex items-center my-8 mx-auto w-10/12">
      <a href="/" class="btn">
        Bible Type
      </a>
      <a href="/about" class="btn-icon ml-auto">
        <i class="fas fa-info"></i>  
      </a>
      <a href="/account" class="btn-icon">
        <i class="fas fa-user"></i> 
      </a>
      {#if data.user}
        <form method="POST" action="/logout" class="">
          <i class="fas fa-sign-out-alt"></i>
        </form>
      {/if}
    </nav>
  </svelte:fragment>

  <!-- Page Slot - always make sure page content is about 80% width of parent (75% ish) -->
  <div class="h-full w-8/12 mx-auto">
    <slot />
  </div>

  <!-- Footer -->
  <div slot="pageFooter" class="my-4 text-center">© Steven Pak 2023</div>
</AppShell>
