const box = document.getElementById('box')
let dragFlag = false,
position = [0,0];
function moveEvent(clientX,clientY){
  box.style.left = clientX - position[0] + 'px'
  box.style.top = clientY - position[1] + 'px'
}
box.addEventListener('mousedown',event => {
  const { clientX,clientY } = event;
  const { top,left } = box.getBoundingClientRect();
  dragFlag = true
  position = [clientX - left,clientY - top]
})
document.addEventListener('mouseup',e => {
  dragFlag = false
})
document.addEventListener('mousemove',e => {
  if(!dragFlag) return
  const {clientX,clientY} = e;
  moveEvent(clientX,clientY)
})