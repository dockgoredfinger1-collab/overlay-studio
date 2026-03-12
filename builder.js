document.getElementById("addBtn").onclick = function(){

let url = document.getElementById("widgetURL").value
if(!url) return

createWidget(url)

}

function createWidget(src){

let preview = document.getElementById("preview")

let widget = document.createElement("div")
widget.className = "widget"

let handle = document.createElement("div")
handle.className = "dragHandle"
handle.innerText = "DRAG"

let iframe = document.createElement("iframe")
iframe.src = src

widget.appendChild(handle)
widget.appendChild(iframe)

preview.appendChild(widget)

dragWidget(widget, handle)

}

function dragWidget(el, handle){

let startX=0
let startY=0
let startLeft=0
let startTop=0

handle.addEventListener("mousedown", start)
handle.addEventListener("touchstart", start)

function start(e){

if(e.type==="touchstart"){
startX=e.touches[0].clientX
startY=e.touches[0].clientY
}else{
startX=e.clientX
startY=e.clientY
}

startLeft=el.offsetLeft
startTop=el.offsetTop

document.addEventListener("mousemove", move)
document.addEventListener("mouseup", stop)

document.addEventListener("touchmove", move)
document.addEventListener("touchend", stop)

}

function move(e){

let x,y

if(e.type==="touchmove"){
x=e.touches[0].clientX
y=e.touches[0].clientY
}else{
x=e.clientX
y=e.clientY
}

let dx=x-startX
let dy=y-startY

el.style.left=(startLeft+dx)+"px"
el.style.top=(startTop+dy)+"px"

}

function stop(){

document.removeEventListener("mousemove", move)
document.removeEventListener("mouseup", stop)

document.removeEventListener("touchmove", move)
document.removeEventListener("touchend", stop)

}

}
