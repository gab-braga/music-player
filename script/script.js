let is_close_box_control = true
let delay = false

function show_box_control() {
    const elementBoxControl = document.querySelector('.box-control')

    if(is_close_box_control) {
        elementBoxControl.style.display = 'flex'
        is_close_box_control = false
        
        setTimeout(function keep_open_box_control() {
            elementBoxControl.style.display = 'none'
            is_close_box_control = true
    
            if(delay) {
                delay = false
                show_box_control()
            }
        }, 2000)
    }
    else {
        delay = true
    }
}