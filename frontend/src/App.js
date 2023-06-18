import Loading from "./Loading.js";
import DarkmodeToggle from "./DarkmodeToggle.js";
import SearchInput from "./SearchInput.js";
import SearchResult from "./SearchResult.js";
import ImageInfo from "./ImageInfo.js";
import api from "./api.js";

console.log("app is running!");

class App {
  $target = null;
  data = [];
  page = 1;     //기본 페이지

  constructor($target) {
    this.$target = $target;

    this.Loading = new Loading({
      $target,
    })

    this.DarkmodeToggle = new DarkmodeToggle({
      $target,
   
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: keyword => {
        //로딩 시작 show
        this.Loading.show();
        api.fetchCats(keyword).then(({ data }) => {
          this.setState(data ? data : []);
          //로딩 끝 hide
          this.Loading.hide();
          // 로컬에 저장.
          this.saveResult(data);
        });
      },
      onRandomSearch : () => {
        //랜덤 버튼 클릭 이벤트
        this.Loading.show();
        api.fetchRandomCats().then(({data}) => {
          this.setState(data ? data : []);
          this.Loading.hide();
        })
      }
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: cat => {
        this.imageInfo.showDetail({
          visible: true,
          cat
        });
      },
      onNextPage : () => {      //SearchResult.js로 보냄.
        
        //다음페이지 로딩
        this.Loading.show();
 
        // 키워드 단어 들고오기 => 로컬스토리지 마지막 키워드 데이터를 들고오기.
        const keywordHistory = localStorage.getItem('keywordHistory') === null ? [] : localStorage.getItem('keywordHistory').split(',');
        const lastKeyword = keywordHistory[0];

        //페이징 올리기
        const page = this.page + 1;

        api.fetchCatsPage(lastKeyword, page).then(({ data }) => {
          let newData = this.data.concat(data);     //새로운 데이터 추가. 배열 합치기.
          this.setState(newData);
          
          // 마지막 페이징 저장.
          this.page = page;
          //로딩 끝 hide
          this.Loading.hide();
        });
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      }
    });


    this.init(); //초기화
  }

  setState(nextData) {
    // console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  saveResult(result){
    //로컬스토리지에 검색 겨로가 저장.
    localStorage.setItem('lastResult', JSON.stringify(result)); //[object,object] 타입을 string으로 만들어서 저장.
  }

  init(){
    //로컬스토리지 lastResult 저장 데이터 가지고 오기
    //null 데이터 조심.
    const lastResult = localStorage.getItem('lastResult') === null ? [] : JSON.parse( localStorage.getItem('lastResult') ); //string을 다시 object로 변환.

    this.setState(lastResult);
  }
}


export default App;