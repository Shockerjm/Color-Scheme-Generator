const root = document.getElementById('root')
const baseUrl = 'https://www.thecolorapi.com'
const endpointScheme = '/scheme'
let colorArray = []

async function findColor(hex, scheme) {
    const response = await fetch(`${baseUrl}${endpointScheme}?hex=${hex}&mode=${scheme}`)
    const color = await response.json()
    return color
}

function setColorBucket() {
    return colorArray.map(color => `<div class="color-bucket" style="background: ${color};"></div>`).join('')
}

function setHex() {
    return colorArray.map(color => `<p>${color}</p>`).join('')
}

function render() {
    let html = `
        <div class="container">
            <form id="color-form" class="color-form">
                <div class="stack">
                    <input type="color" id="color-picker" name="color-picker" class="color-picker" value="#F55A5A"/>
                </div>
                <div class="stack">
                    <select id="color-scheme" name="color-scheme" class="color-scheme">
                        <option value="monochrome">Monochrome</option>
                        <option value="monochrome-dark">Monochrome-dark</option>
                        <option value="monochrome-light">Monochrome-light</option>
                        <option value="analogic">Analogic</option>
                        <option value="complement">Complement</option>
                        <option value="analogic-complement">Analogic-complement</option>
                        <option value="triad">Triad</option>
                        <option value="quad">Quad</option>
                    </select>
                </div>
                <button class="get-color">Get color scheme</button> 
            </form>
            <div class="color-bucket-container">${setColorBucket()}</div>
            <div class="hex-values">${setHex()}</div>
        </div>
    `
    root.innerHTML = html
    
    const color = document.getElementById('color-picker')
    const scheme = document.getElementById('color-scheme')
    
    document.getElementById('color-form').addEventListener('submit', function(e) {
        e.preventDefault()
        
        const hexValue = color.value.replace('#', '')
        const schemeValue = scheme.value
        
        getColors(hexValue, schemeValue)
    })
}

function getColors(hex, scheme) {
    findColor(hex, scheme).then(colors => {
    
        for (let i = 0; i < 5; i++) {
            colorArray.push(colors.colors[i].hex.value)
        }
    
        render()
        colorArray = []
    })
}
getColors('F55A5A', 'monochrome')