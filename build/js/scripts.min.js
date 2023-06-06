/*Стилизация selects*/
class Select {
  constructor(selector){
    this.$el = document.querySelectorAll(selector)  
    this.builds = this.buildAllDroplists(this.$el)
    this.overlayClose = document.addEventListener('click', event => {
        if(
          document.querySelector('.select.open') &&
          !(event.target.classList.contains('select')) && 
          !(event.target.classList.contains('select__main')) &&
          !(event.target.classList.contains('select__drop')) &&
          !(event.target.classList.contains('select__list')) &&
          !(event.target.classList.contains('select__item'))
        ){
           this.closeAllSelect()
        }
    })
  } 
  buildCustDroplist(item){  
    const $thisSelect = item.querySelector('select')
    const defaultTxt = $thisSelect.options[0].innerHTML
    const buildItem = () => {
      let $items = document.createElement('ul')
      $items.classList.add('select__list')

      for (let i = 1; i < $thisSelect.options.length; i++) {
        let $item = document.createElement('li')
        $item.classList.add('select__item')
        $item.textContent = $thisSelect.options[i].innerHTML
        $item.addEventListener('click', event => {
          let content = event.target.textContent
          item.querySelector('.select').classList.remove('open')
          item.querySelector('.select__main').textContent = content
          for(let i = 0; i < $thisSelect.options.length; i++) {
            if ( $thisSelect.options[i].value == content ) {
              $thisSelect.options[i].selected = true;
              return;
            }
          }
          if (item.querySelector('.selected')){
            item.querySelector('.selected').classList.remove('selected')
          }
          event.target.classList.add('selected')
        })
        $items.appendChild($item);
      }
      return $items 
    }
    
    let layoutHTML = document.createElement('div')
    layoutHTML.classList.add('select')
    
    let selectDrop = document.createElement('div')
    selectDrop.classList.add('select__drop')
    
    let selectMain = document.createElement('div')
    selectMain.classList.add('select__main')
    selectMain.textContent = defaultTxt
    selectMain.addEventListener('click', event => {
       this.closeAllSelect()
       item.querySelector('.select').classList.toggle('open')
    })
    
    layoutHTML.appendChild(selectMain)
    selectDrop.appendChild(buildItem())
    layoutHTML.appendChild(selectDrop)
    
    item.appendChild(layoutHTML)
  }
  buildAllDroplists(list){
    for (let i = 0; i < list.length; i++) {
      this.buildCustDroplist(list[i])
    }
  }
  closeAllSelect(){
    if(document.querySelector('.select.open')){
      document.querySelector('.select.open').classList.remove('open')
    }    
  }
}
const select = new Select('.js-styled-select')

/*Стилизация input range*/
class Range {
  constructor(selector){
    this.$el = document.querySelector(selector)
    this.$input = this.$el.querySelector('input[type="range"]')
    this.$outnput = this.$el.querySelector('.js-range-val') 
    this.$el.addEventListener('input', event => {
      this.showValue()
    })
  }
  showValue() {
    this.$outnput.textContent = this.$input.value
  }
}
const range = new Range('#js-range')

/*Стилизация input file*/
class File {
  constructor(selector, defTxt){
    this.$el = document.querySelectorAll(selector)  
    this.builds = this.buildAllFilesFields(this.$el)
    this.defTxt = defTxt
  } 
  buildCustFileField(item){  
    const $thisField = item.querySelector('input[type="file"]')
    const $thisText = item.querySelector('.js-file-name')
    const $thisClear = item.querySelector('.js-file-del')
    $thisField.addEventListener('change', event => {      
      if($thisField.files[0].name){
        $thisText.textContent = $thisField.files[0].name
        $thisText.setAttribute('title', $thisField.files[0].name)
        item.classList.add('value')
      } else{
        $thisText.textContent = this.defTxt
        item.classList.remove('value')
        $thisText.removeAttribute('title')
      }
    })
    $thisClear.addEventListener('click', event => {      
      item.classList.remove('value')
      $thisField.value = ''
      $thisText.textContent = this.defTxt
      $thisText.removeAttribute('title')
    })
  }
  buildAllFilesFields(list){
    for (let i = 0; i < list.length; i++) {
      this.buildCustFileField(list[i])
    }
  }
}
const file = new File('.js-file', 'Прикрепить файл')

/*Мобильное меню*/
document.getElementById('js-burger').addEventListener('click', function(){
  this.classList.toggle('open')
  document.getElementById('js-menu').classList.toggle('open')
})
