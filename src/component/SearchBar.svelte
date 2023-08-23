<script lang="ts">
  import benefits from "../data/data.json";
  import studentBenefits from "../data/student.json";
  import { openModal } from "$lib/three/Util/modal";
  import { sun } from "$lib/three/scene.svelte";

  // TODO: Refactor this code, using svelte store
  let showBenefits = [...benefits, ...studentBenefits].filter(
    ({ category }) => category,
  );

  let searchValue = "";
  let searchResults: string[] = [];

  const benefitsSearch = showBenefits.map((x) => ({
    name: x.companyName.toLowerCase(),
    desc: x.companyDescription?.toLowerCase(),
  }));

  const search = () => {
    if (searchValue.length === 0) {
      return (searchResults = []);
    }

    const easter = easterEgg(searchValue);
    const lowerSearch = searchValue.toLowerCase();

    // TODO: Refactor this code, using fuzzy search
    const results = benefitsSearch
      .filter(
        ({ name, desc }) =>
          name.includes(lowerSearch) || desc?.includes(lowerSearch),
      )
      .map(({ name }) => name);

    searchResults = [...(easter ? [easter] : []), ...results];
  };

  // TODO: 추후 링크 바로가기 기능도 제공
  const easterEgg = (searchValue: string) => {
    switch (searchValue) {
      case "42":
        return "answer to life the universe and everything";
      case "answer to life the universe and everything":
        return "42";
      case "집현전":
        return "집현전은 모두가 함께 만들어가는 42서울의 도서관입니다. 42library.kr";
      case "모닝글로리":
        return "모닝글로리는 카뎃들이 아침마다 모여 공부를 시작하는 모임입니다. 42mogle.com";
      case "평가":
        return "15 Minutes is Enough! 42peer.com";
    }
  };

  const submit = () => {
    const result = document.getElementById("search-result");
    if (result) {
      result.style.opacity = "1";
      result.focus();
    }
  };

  const onKeyPress = (e: KeyboardEvent) => {
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
<!--TODO: 화살표 키보드로 이동-->
<div class="search-results">
  {#each searchResults as result}
    <a
      href="#{result}"
      on:click={() => {
        openModal(sun);
      }}
      id="search-result">{result}</a
    >
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
