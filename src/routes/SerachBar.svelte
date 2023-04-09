<script>
  let searchValue = "";
  let onSearch = () => {};
  let searchResults = [];

  function search() {
    // 검색 로직 구현
    // searchResults = ...
  }

  $: search();
</script>

<div>
  <input class="search_bar" bind:value={searchValue} />
  <button on:click={onSearch}>Search</button>
  <!-- <ul>
    {#each searchResults as result}
      <li>{result}</li>
    {/each}
  </ul> -->
</div>

<style>
.search_bar {
	background-color: red;
	position: relative;
	width: 100%;
	height: 100%;
	z-index: 100;
}

</style>