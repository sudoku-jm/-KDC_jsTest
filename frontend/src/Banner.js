import api from './api.js';

class Banner{
    $banner = null;
    data = null;
    current = 0;                //이미지를 좌우로 움직이게 하기위한 현재 위치(index)

    constructor({$target}){
        this.$wrapper = document.createElement('div');
        this.$wrapper.className = 'Banner';
        this.$banner = document.createElement('ul');

        this.$prevButton = document.createElement('button');
        this.$prevButton.textContent = 'PREV';
        this.$prevButton.className = 'prev';

        this.$prevButton.addEventListener('click', (e) => {
            let prev = this.current - 1;
            if(prev < 0){
                return;
            }
            this.changeCurrent(prev);
        });

        this.$nextButton = document.createElement('button');
        this.$nextButton.textContent = 'NEXT';
        this.$nextButton.className = 'next';

        this.$nextButton.addEventListener('click', (e) => {
            let next = this.current + 1;
            if(next === this.data.length){
                return;
            }
            this.changeCurrent(next);
        });

        this.$wrapper.appendChild(this.$banner);
        this.$wrapper.appendChild(this.$prevButton);
        this.$wrapper.appendChild(this.$nextButton);
        $target.appendChild(this.$wrapper);

        this.getRandom();

    }       

    changeCurrent(index){
        this.current = index;
        this.moveTo(index)
    }

    moveTo(index){
        let leftPos = - (Number(this.$wrapper.clientWidth) * index);
        this.$banner.style.left = leftPos + 'px';
    }

    //데이터를 가지고 set 시켜줄 setState
    setState(nextData){
        this.data = nextData;
        this.render();
    }
    
    //랜덤 고양이 섹션을 가지고 오는 api
    getRandom(){
        api.fetchRandomCats().then(({data}) => {
            this.setState(data ? data.slice(0, 5) : []);
        });
    }

    render(){
        this.$banner.innerHTML = this.data.map((banner) => 
            `
                <li style="background-image:url(${banner.url})"></li>
            `
         ).join('');

         this.$banner.style.width = Number(this.$wrapper.clientWidth) * this.data.length + 'px';
         
         this.$banner.querySelectorAll('li').forEach(item => {
            item.style.width = this.$wrapper.clientWidth + 'px';
         })
    }
}

export default Banner;