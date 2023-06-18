class Empty {
    $empty = null;      //로딩 상태 제어
    data = null;          //로딩 상태 데이터
  
    constructor({ $target }) {
      const $empty = document.createElement("div");
      this.$empty = $empty;      
      this.$empty.className = 'Empty';
      $target.appendChild(this.$empty);
  
      //로딩 상태
      this.data = {
        show : false, //초기상태 hide
        isNull : false,
      }
  
      this.render();
      
    }
  
    show(data){
      this.setState({
        show : data === null || data.length === 0,
        isNull : data == null
      })
    }
  
  
    setState(nextData){
      this.data = nextData;
      this.render();
    }
  
    render(){
      if(this.data.show){
        this.$empty.style.display = 'block';
        if(this.data.isNull){
            this.$empty.innerHTML = `
                <p>요청에 실패 했습니다.</p>
            `;
        }else{
            this.$empty.innerHTML = `
                <p>요청 결과가 없습니다.</p>
            `;
        }
      }else{
        this.$empty.style.display = 'none';
        this.$empty.innerHTML = ''; 
      }
    }
  
  }
  
  
export default Empty;