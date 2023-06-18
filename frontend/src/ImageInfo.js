import api from './api.js';

class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  
  showDetail(cat){
    //이미지 상세 정보 요청
    // console.log('cat.id',cat.cat.id)
    const { id } = cat.cat;
    api.fetchCatDetail(id).then(({data}) => {
      
      //cat (this.data.cat) 정보 업데이트
      // console.log(data);
      this.setState({
        visible : true,
        cat : data
      });
    })
  }

  //모달 닫기
  closeImageInfo(){
    this.setState({
      visible : false,
      cat : undefined
    })
  }

  //클릭 이벤트들을 따로 만들었다.
  modalEvent(){
    //close 버튼이 생성 된 후 동작하기 위해 여기 만든듯?
    // this.$imageInfo.querySelector('.close').addEventListener('click', e => {
    //   this.closeImageInfo();
    // });


    //key 이벤트
    document.addEventListener('keydown', e => {
      if(e.key === "Escape"){
        this.closeImageInfo();
      }
    });

    //모달 이외의 영역 클릭 이벤트 + close 버튼 클릭 이벤트
    this.$imageInfo.addEventListener('click', e => {
      if(e.target.className === "ImageInfo" || e.target.className ==="close"){
        this.closeImageInfo();
      }
    });
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.cat;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      this.$imageInfo.style.display = "block";

   
      this.modalEvent();
     
    
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}

export default ImageInfo;