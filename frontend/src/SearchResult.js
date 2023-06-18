class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick, onNextPage }) {
    const $wrapper = document.createElement("section");
    $wrapper.className = "SearchResultList";
    this.$searchResult = document.createElement("ul");
    this.$searchResult.className = "SearchResult";
    $wrapper.appendChild(this.$searchResult);
    $target.appendChild($wrapper);

    this.data = initialData;
    this.onClick = onClick;
    this.onNextPage = onNextPage;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  listObserver = new IntersectionObserver((items, observer) => {  
    items.forEach(item => {
      //아이템이 화면에 보일 때
      if(item.isIntersecting){    

        //화면에 보이면 이미지를 로드한다. data-src 불러오기
        //더미 이미지를 실제 데이터 src로 변환.
        item.target.querySelector('img').src = item.target.querySelector('img').dataset.src;


        //마지막 요소를 찾아낸다.
        //전체 데이터의 길이 : this.data.length 
        let dataIndex = Number(item.target.dataset.index);    //data-index 가져오기
        //마지막 요소라면?
        if(dataIndex + 1 === this.data.length){
          //nextPage 호출.
          this.onNextPage();  
        }
        

      }
    })
  });



  render() {
    this.$searchResult.innerHTML = this.data
      .map(
        (cat, index) => `
          <li class="item" data-index=${index}>
            <img src="https://via.placeholder.com/200x300" alt="${cat.name}" data-src="${cat.url}" />
          </li>
        `
      )
      .join("");

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", () => {
        this.onClick(this.data[index]);
      });
      this.listObserver.observe($item);   //각 아이템에 observe 등록
    });


  }
}
