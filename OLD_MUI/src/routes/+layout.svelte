<script>
    import IconButton, { Icon } from '@smui/icon-button';

    export let data;
</script>


<!-- Flex item 1 - Header (flex container) -->
<nav class="navbar">
    <a class="link" href="/">Bible Type</a>
    <IconButton 
        href="/about" 
        class="material-icons link" 
        size="mini" 
        ripple={false}>
        info
    </IconButton>
    <IconButton 
        href="/account" 
        class="material-icons link push-right" 
        size="mini" 
        ripple={false}>
        person
    </IconButton>
    {#if data.user}
        <form method="POST" action="/logout">
            <IconButton
                class="material-icons link"
                size="mini"
                ripple={false}>
            logout
            </IconButton> 
        </form>
    {/if}
</nav>


<!-- Flex item 2 - +page.svelte content -->
<slot/>

<!-- Flex item 3 - Footer -->
<div class="footer">
    <span>© Steven Pak 2023</span>
</div>