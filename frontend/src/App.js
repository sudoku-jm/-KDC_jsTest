console.log("app is running!");

class App {
  $target = null;
  data = [];

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
          this.setState(data);
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
          this.setState(data);
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
