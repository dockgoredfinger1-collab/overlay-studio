let widgets = []

function addSaweria(){

let input = document.getElementById("saweriaKey")
if(!input){
console.error("Input saweriaKey tidak ditemukan")
return
}

let key = input.value.trim()
if(!key){
alert("Masukkan StreamKey Saweria dulu")
return
}

let src = "https://saweria.co/widgets/alert?streamKey=" + key

createWidget(src)

}

function addWidget(){

let input = document.getElementById("widgetURL")
if(!input){
console.error("Input widgetURL tidak ditemukan")
return
}

let url = input.value.trim()
if(!url){
alert("Masukkan link widget dulu")
return
}

createWidget(url)

}

function createWidget(src){

let preview = document.getElementById("preview")

if(!preview){
console.error("Div preview tidak ditemukan")
return
}

let div = document.createElement("div")
div.className = "widget"

div.style.left = "100px"
div.style.top = "100px"
div.style.width = "300px"
div.style.height = "200px"

let handle = document.createElement("div")
handle.className = "dragHandle"
handle.innerText = "DRAG"

let iframe = document.createElement("iframe")
iframe.src = src

div.appendChild(handle)
div.appendChild(iframe)

preview.appendChild(div)

enableDrag(div, handle)

widgets.push({
src:src,
x:100,
y:100,
w:300,
h:200
})

console.log("Widget ditambahkan:", src)

}

function enableDrag(el, handle){

let startX = 0
let startY = 0
let startLeft = 0
let startTop = 0

handle.addEventListener("mousedown", startDrag)
handle.addEventListener("touchstart", startDrag)

function startDrag(e){

if(e.type === "touchstart"){
startX = e.touches[0].clientX
startY = e.touches[0].clientY
}else{
startX = e.clientX
startY = e.clientY
}

startLeft = el.offsetLeft
startTop = el.offsetTop

document.addEventListener("mousemove", drag)
document.addEventListener("mouseup", stopDrag)

document.addEventListener("touchmove", drag)
document.addEventListener("touchend", stopDrag)

}

function drag(e){

let clientX
let clientY

if(e.type === "touchmove"){
clientX = e.touches[0].clientX
clientY = e.touches[0].clientY
}else{
clientX = e.clientX
clientY = e.clientY
}

let dx = clientX - startX
let dy = clientY - startY

let newLeft = startLeft + dx
let newTop = startTop + dy

el.style.left = newLeft + "px"
el.style.top = newTop + "px"

}

function stopDrag(){

document.removeEventListener("mousemove", drag)
document.removeEventListener("mouseup", stopDrag)

document.removeEventListener("touchmove", drag)
document.removeEventListener("touchend", stopDrag)

}

}

function generateOverlay(){

if(widgets.length === 0){
alert("Belum ada widget")
return
}

let data = encodeURIComponent(JSON.stringify(widgets))

let url = location.origin + "/overlay.html?data=" + data

let result = document.getElementById("result")

if(result){
result.innerHTML =
"Link Overlay:<br><a target='_blank' href='"+url+"'>" + url + "</a>"
}

}
