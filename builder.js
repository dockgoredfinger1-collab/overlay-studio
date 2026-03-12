let widgets=[]

document.getElementById("addBtn").onclick=function(){

let url=document.getElementById("widgetURL").value
if(!url) return

createWidget(url)

}

document.getElementById("generateBtn").onclick=function(){

let data=encodeURIComponent(JSON.stringify(widgets))

let url=location.origin+"/overlay.html?data="+data

document.getElementById("result").innerHTML=
"<a target='_blank' href='"+url+"'>"+url+"</a>"

}

function createWidget(src){

let preview=document.getElementById("preview")

let widget=document.createElement("div")
widget.className="widget"

let handle=document.createElement("div")
handle.className="dragHandle"
handle.innerText="DRAG"

let iframe=document.createElement("iframe")
iframe.src=src

widget.appendChild(handle)
widget.appendChild(iframe)

preview.appendChild(widget)

let widgetData={
src:src,
x:100,
y:100,
w:300,
h:200
}

widgets.push(widgetData)

dragWidget(widget,handle,widgetData)

}

function dragWidget(el,handle,data){

let startX=0
let startY=0
let startLeft=0
let startTop=0

handle.addEventListener("mousedown",start)
handle.addEventListener("touchstart",start)

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

document.addEventListener("mousemove",move)
document.addEventListener("mouseup",stop)

document.addEventListener("touchmove",move)
document.addEventListener("touchend",stop)

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

let newLeft=startLeft+dx
let newTop=startTop+dy

el.style.left=newLeft+"px"
el.style.top=newTop+"px"

data.x=newLeft
data.y=newTop

}

function stop(){

document.removeEventListener("mousemove",move)
document.removeEventListener("mouseup",stop)

document.removeEventListener("touchmove",move)
document.removeEventListener("touchend",stop)

}

}
