<script>
    import IconButton, { Icon } from '@smui/icon-button';
    let clicked = 0;
</script>


<!-- Flex item 1 - a Flex container-->
<nav class="navbar">
    <a class="link" href="/">Bible Type</a>
    <IconButton 
        href="/about" 
        class="material-icons link" 
        size="mini" 
        ripple={false}
        on:click={() => clicked++}>
        info
    </IconButton>
    <IconButton 
        href="/account" 
        class="material-icons link push-right" 
        size="mini" 
        ripple={false}
        on:click={() => clicked++}>
        person
    </IconButton>
    <!-- <form class="search-verse" method="post">
        <input id="verse-input" type="text" name="verse-input" placeholder="John 3:16">
    </form> -->
    <!-- <a class="verse-btn link" onclick="getVerse()" href="#">Find Verse</a> -->
</nav>


<!-- Flex item 2 - +page.svelte content -->
<slot/>

<!-- Flex item 3 -->
<div class="footer">
    <span>© Steven Pak 2023</span>
</div>