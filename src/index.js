import _ from 'lodash'
import printMe from './print'
import {cube} from './math'

function component() {
    let element = document.createElement('div')
    let btn = document.createElement('button')

    btn.innerHTML = `5 cubed is equal to ${cube(5)}`
    btn.onclick = printMe

    element.appendChild(btn)
    
    return element
}

let element = component() // 存储element,以便在print.js修改时重新渲染
document.body.appendChild(element)

if(module.hot) {
    module.hot.accept('./print.js', function() {
        console.log('Accepting the update printMe module!')
        document.body.removeChild(element)
        element = component()
        document.body.appendChild(element)
    })
}