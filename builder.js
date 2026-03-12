let widgets = []

function addSaweria(){

let key = document.getElementById("saweriaKey").value

if(!key) return

let src = "https://saweria.co/widgets/alert?streamKey=" + key

createWidget(src)

}

function addWidget(){

let url = document.getElementById("widgetURL").value

if(!url) return

createWidget(url)

}

function createWidget(src){

let div = document.createElement("div")

div.className = "widget"
div.style.left = "100px"
div.style.top = "100px"
div.style.width = "300px"
div.style.height = "200px"

/* drag handle */
let handle = document.createElement("div")
handle.className = "dragHandle"
handle.innerText = "DRAG"

/* iframe */
let iframe = document.createElement("iframe")
iframe.src = src

div.appendChild(handle)
div.appendChild(iframe)

document.getElementById("preview").appendChild(div)

enableDrag(div, handle)

/* simpan data widget */
let widgetData = {
src:src,
x:100,
y:100,
w:300,
h:200
}

widgets.push(widgetData)

}

function enableDrag(el, handle){

let pos1=0,pos2=0,pos3=0,pos4=0

handle.onmousedown = dragMouseDown

function dragMouseDown(e){

e.preventDefault()

pos3=e.clientX
pos4=e.clientY

document.onmouseup=closeDrag
document.onmousemove=elementDrag

}

function elementDrag(e){

e.preventDefault()

pos1 = pos3 - e.clientX
pos2 = pos4 - e.clientY

pos3 = e.clientX
pos4 = e.clientY

let newTop = el.offsetTop - pos2
let newLeft = el.offsetLeft - pos1

el.style.top = newTop + "px"
el.style.left = newLeft + "px"

/* update data widget */

let iframe = el.querySelector("iframe")
let src = iframe.src

let widget = widgets.find(w => w.src === src)

if(widget){
widget.x = newLeft
widget.y = newTop
}

}

function closeDrag(){

document.onmouseup=null
document.onmousemove=null

}

}

function generateOverlay(){

let data = encodeURIComponent(JSON.stringify(widgets))

let url = location.origin + "/overlay.html?data=" + data

document.getElementById("result").innerHTML =
"Link Overlay:<br><a target='_blank' href='"+url+"'>" + url + "</a>"

}
