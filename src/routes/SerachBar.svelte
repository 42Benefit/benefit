<script>
  let searchValue = "";
  let onSearch = () => {};
  let searchResults = ["hello", "world"];

  function search() {
    // 검색 로직 구현
    // searchResults = ...
  }

  $: search();
</script>

<div class="search-bar">
  <input  bind:value={searchValue} />
  <button on:click={onSearch}>search</button>
</div>

<div class="search-results">
    <ul>
    {#each searchResults as result}
      <li>{result}</li>
    {/each}
  </ul>
</div>

<style>
.search-bar {
  display: flex;
  align-items: center;
  height: 2.5rem;
  width: 100%;
}

.search-bar input {
  flex: 1;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: none;
  outline: none;
  transition: opacity 0.2s ease-in-out;
  opacity: 0.42;
}

.search-bar button {
  margin-left: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: rgb(7, 85, 29);
  border: none;
  color: white;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  opacity: 0.42;
}

.search-bar :focus{
  opacity: 1;
}

</style>