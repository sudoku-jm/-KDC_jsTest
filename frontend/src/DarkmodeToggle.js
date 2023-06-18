class DarkmodeToggle {
  isDarkMode = null;        //초기 state상태.

  constructor({ $target }) {
    const $wrapper = document.createElement("section");
    const $DarkModeToggle = document.createElement("input");
    $wrapper.className = "DarkModeToggleArea";
    this.$DarkModeToggle = $DarkModeToggle;
    this.$DarkModeToggle.type = "checkbox";

    $DarkModeToggle.className = "DarkModeToggle";
    $wrapper.appendChild($DarkModeToggle);
    $target.appendChild($wrapper);

    $DarkModeToggle.addEventListener("change", e => {
      this.setColorMode(e.target.checked);
    });

   
    this.initColorMode();
  }

  initColorMode(){
     // 초기화
    // isDarkMode state, checkbox 상태, html attr 초기화
    console.log('darkmode?',this.isDarkMode);
    this.isDarkMode = window.matchMedia('(prefers-color-scheme:dark)').matches;
    this.$DarkModeToggle.checked = this.isDarkMode;    //초기 윈도우가 다크모드일 때 체크상태 변경.
    this.setColorMode(this.isDarkMode);
  }

  setColorMode(isDarkMode){
    document.documentElement.setAttribute('color-mode', isDarkMode ? 'dark' : 'light');
  }

}


export default DarkmodeToggle;