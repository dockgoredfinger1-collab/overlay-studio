let widgets=[]

function addSaweria(){

let key=document.getElementById("saweria").value

let src="https://saweria.co/widgets/alert?streamKey="+key

createWidget(src)

}

function addWidget(){

let link=document.getElementById("widgetlink").value

createWidget(link)

}

function createWidget(src){

let div=document.createElement("div")

div.className="widget"
div.style.left="100px"
div.style.top="100px"
div.style.width="300px"
div.style.height="200px"

div.innerHTML="<iframe src='"+src+"'></iframe>"

document.getElementById("preview").appendChild(div)

drag(div)

widgets.push({
src:src,
x:100,
y:100,
w:300,
h:200
})

}

function drag(el){

let pos1=0,pos2=0,pos3=0,pos4=0

el.onmousedown=dragMouseDown

function dragMouseDown(e){
e.preventDefault()
pos3=e.clientX
pos4=e.clientY
document.onmouseup=closeDrag
document.onmousemove=elementDrag
}

function elementDrag(e){
e.preventDefault()
pos1=pos3-e.clientX
pos2=pos4-e.clientY
pos3=e.clientX
pos4=e.clientY

el.style.top=(el.offsetTop-pos2)+"px"
el.style.left=(el.offsetLeft-pos1)+"px"
}

function closeDrag(){
document.onmouseup=null
document.onmousemove=null
}

}

function generate(){

let data=encodeURIComponent(JSON.stringify(widgets))

let url=location.origin+"/overlay.html?data="+data

document.getElementById("link").innerHTML=
"<a target='_blank' href='"+url+"'>"+url+"</a>"

}

