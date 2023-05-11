<script>
  // @ts-nocheck
  import benefits from "../data/data.json";
  import studentBenefits from "../data/student.json";
  import { openModal } from "$lib/three/Util/Modal.svelte";
  import { sun } from "$lib/three/scene.svelte";

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
    // TODO: Refactor this code, using fuzzy search
    if (searchValue.length > 0) {
      showBenefits.forEach((benefit) => {
        if (
          benefit.companyName
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          benefit.companyDescription
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        ) {
          results.push(benefit.companyName);
        }
      });
    }
    searchResults = [...results];
  };

  // TODO: 추후 링크 바로가기 기능도 제공
  const easterEgg = (/** @type {string} */ searchValue) => {
    let result = undefined;
    if (searchValue === "42") {
      result = "answer to life the universe and everything";
    } else if (searchValue === "answer to life the universe and everything") {
      result = "42";
    } else if (searchValue === "집현전") {
      result =
        "집현전은 모두가 함께 만들어가는 42서울의 도서관입니다. 42library.kr";
    } else if (searchValue === "모닝글로리") {
      result =
        "모닝글로리는 카뎃들이 아침마다 모여 공부를 시작하는 모임입니다. 42mogle.com";
    } else if (searchValue === "평가") {
      result = "15 Minutes is Enough! 42peer.com";
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

 <!--TODO: openModal 구조 리팩토링-->
<div class="search-results">
  {#each searchResults as result}
    <a href="#{result}" on:click={()=>{openModal(sun)}} id="search-result">{result}</a>
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
