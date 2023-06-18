import KeywordHistory from './KeywordHistory.js';

const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onRandomSearch }) {

    //검색 input
    const $wrapper = document.createElement("section");
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    $wrapper.className = "SearchInputArea";
    $searchInput.className = "SearchInput";
    $wrapper.appendChild($searchInput);
    $target.appendChild($wrapper);
    
    $searchInput.addEventListener("keypress", e => {
      //keyup은 한글에서 2번 호출한다 성능문제. keypress를 사용한다.
      if(e.key === "Enter"){
        onSearch(e.target.value);

        //최근 키워드 저장.
        this.KeywordHistory.addKeyword(e.target.value);
        
      }
    });
    
    //랜덤 버튼
    const $randomButton = document.createElement("button");
    this.$randomButton = $randomButton;
    this.$randomButton.className = 'RandomButton';
    this.$randomButton.textContent = '랜덤고양이';
    $wrapper.appendChild($randomButton);

    //랜덤 버튼 클릭
    $randomButton.addEventListener('click', e => {
      onRandomSearch();
    });

    this.KeywordHistory = new KeywordHistory({
      $target,
      onSearch
   
    });

    // console.log("SearchInput created.", this);
  }
  render() {}
}


export default SearchInput;