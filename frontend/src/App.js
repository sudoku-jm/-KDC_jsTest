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
  }

  setState(nextData) {
    // console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
