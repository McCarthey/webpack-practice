import './style.css'
import Icon from './my-image.jpg'
import Data from './data.xml'

function getComponent() {
    return import(/* webpackChunkName: "lodash" */ 'lodash').then(({default: _}) => {

        let element = document.createElement('div')
        
        element.innerHTML = _.join(['Hello', 'webpack'], ' ')
        element.classList.add('hello')
        
        let myIcon = new Image()
        myIcon.src = Icon
        
        element.appendChild(myIcon)
        console.log(Data)
        
        return element
    }).catch(err => 'An error occured while loading the component')
}

getComponent().then(component => {
    document.body.appendChild(component())
})