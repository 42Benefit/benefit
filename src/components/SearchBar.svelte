<script>
  let searchValue = "";
  /**
   * @type {string[]}
   */
  let searchResults = [];

  const search = () => {
    // TODO: 검색 로직 구현
    let results = [];
    if (searchValue === "42") {
      results.push("answer to life the universe and everything");
    }
    if (searchValue === "answer to life the universe and everything") {
      results.push("42");
    }
    if (searchValue.length > 0) {
      results.push("검색기능을 열심히 만들고 있습니다. 조금만 기다려주세요.🚧");
    }
    searchResults = [...results];
  };

  const submit = () => {
    /**
     * @type {HTMLElement | null}
     */
    const result = document.getElementById("search-result");
    if (result) {
      result.style.opacity = "1";
      result.focus();
    }
  };

  /**
   * @param {KeyboardEvent} e
   */
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      submit();
    }
  };
</script>

<div class="search-bar">
  <input
    placeholder="search the benefit for you"
    bind:value={searchValue}
    on:input={search}
    on:keypress={onKeyPress}
  />
</div>

<div class="search-results">
  {#each searchResults as result}
    <p id="search-result">{result}</p>
  {/each}
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

  .search-results p {
    opacity: 0.42;
    margin: 0.42rem;
  }

  .search-results p:hover {
    opacity: 1;
    transition: opacity 0.2s ease-in-out;
  }

  #search-result:focus {
    opacity: 1;
  }
  .search-bar :focus {
    opacity: 1;
  }
</style>
