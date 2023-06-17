class KeywordHistory{
    $keywordHistory = null; // 엘리먼트 생성
    data = null;            // 데이터
    constructor({$target, onSearch}){
        const $keywordHistory = document.createElement('ul'); 
        this.$keywordHistory = $keywordHistory;
        this.$keywordHistory.className = 'KeywordHistory';
        $target.appendChild(this.$keywordHistory);
        
        
        //아직 키워드 데이터가 없어서 나오는게 없다. 
        //더미데이터로 만들어서 노출시켜본다.
        // this.data = [
        //     '아',
        //     '고양이',
        //     'cat'
        // ];
        
        this.onSearch = onSearch;
        this.init();
        this.render();
    }

    //초기화
    init(){
        //로컬스토리지 데이터 들고오기
        const data = this.getHistory();  //split활용, 콤마기준으로 데이터를 나눠 배열로 반환. 
        // console.log('keywordHistory data',data);
        this.setState(data);
    }

    addKeyword(keyword){
        //최근 키워드 저장.

        //1. 현재 데이터를 가지고 와서 
        //2. 데이터를 붙여서 
        //3. 배열로 반환 후 로컬스토리지에 다시 저장.
        let keywordHistory = this.getHistory();
        keywordHistory.unshift(keyword);
        keywordHistory = keywordHistory.slice(0,5); //최신 데이터 ~ 5개까지만 들고있음.
        localStorage.setItem('keywordHistory',keywordHistory.join(','));

        this.init();
    }

    getHistory(){
        return localStorage.getItem('keywordHistory') === null ? [] : localStorage.getItem('keywordHistory').split(',');
    }

    //데이터 set
    setState(nextData){
        this.data = nextData;
        this.render();
    }

    render(){
        this.$keywordHistory.innerHTML = this.data.map( keyword =>  `<li><button>${keyword}</button></li>`  ).join('');

        //클릭 이벤트
        //console.log(this.$keywordHistory.querySelectorAll('li button')) //[button, button, button] 선택된다.
        this.$keywordHistory.querySelectorAll('li button').forEach(($item, index) => {
            $item.addEventListener('click', () => {
                console.log($item,index,this.data[index])
                this.onSearch(this.data[index]);
            });
        });
    }


   
}