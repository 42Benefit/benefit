<script>
  // @ts-nocheck
  import benefits from "../data/data.json";
  import studentBenefits from "../data/student.json";
  import { openModal } from "../lib/scene.svelte";

  // TODO: Refactor this code, using svelte store
  let showBenefits = [...benefits, ...studentBenefits].filter(
    (benefit) => benefit.category
  );

  let searchValue = "";
  /**
   * @type {string[]}
   */
  let searchResults = [];

  const search = () => {
    let results = [];
    if (easterEgg(searchValue)) {
      results.push(easterEgg(searchValue));
    }
    // TODO: companyName이외에도 다른 내용들도 검색되게 하기
    if (searchValue.length > 0) {
      showBenefits.forEach((benefit) => {
        if (benefit.companyName.toLowerCase().includes(searchValue.toLowerCase())) {
          results.push(benefit.companyName);
        }
      });
    }
    searchResults = [...results];
  };

  const easterEgg = (/** @type {string} */ searchValue) => {
    let result = undefined;
    if (searchValue === "42") {
      result = "answer to life the universe and everything";
    }
    if (searchValue === "answer to life the universe and everything") {
      result = "42";
    }
    return result;
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
    <a href="#{result}" on:click={openModal} id="search-result">{result}</a>
  {/each}
</div>

<style>
  .search-bar {
    display: flex;
    align-items: center;
    height: 2.5rem;
    width: 100%;
    margin: 0;
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

  .search-results a {
    all: unset;
    display: flex;
    margin: 0.42rem;
    opacity: 0.42;
  }

  .search-results a:hover {
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
