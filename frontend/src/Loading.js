class Loading {
  $loading = null;      //로딩 상태 제어
  data = null;          //로딩 상태 데이터

  constructor({ $target }) {
    const $loading = document.createElement("div");
    this.$loading = $loading;      
    $target.appendChild(this.$loading);

    //로딩 상태
    this.data = {
      show : false, //초기상태 hide
    }

    this.render();
    
  }

  show(){
    this.setState({
      show : true
    })
  }

  hide(){
    this.setState({
      show : false
    })
  }

  setState(nextData){
    this.data = nextData;
    this.render();
  }

  render(){
    if(this.data.show){

      this.$loading.innerHTML = `
      <div class="Loading"><p>로딩중...😊</p></div>
      `;
    }else{
      this.$loading.innerHTML = ''; //초기화
    }
  }

}


export default Loading;