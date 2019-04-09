import _ from 'lodash'
import printMe from './print'

function component() {
    let element = document.createElement('div')
    let btn = document.createElement('button')

    btn.innerHTML = 'Click here, and check your console'
    btn.onclick = printMe

    element.appendChild(btn)
    
    return element
}

document.body.appendChild(component())