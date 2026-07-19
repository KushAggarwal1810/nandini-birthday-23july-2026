const dragStage=document.querySelector('#photoStage');let dragX=0;
dragStage.addEventListener('pointerdown',e=>{dragX=e.clientX;dragStage.classList.add('dragging');dragStage.setPointerCapture(e.pointerId)});
dragStage.addEventListener('pointerup',e=>{const delta=e.clientX-dragX;dragStage.classList.remove('dragging');if(Math.abs(delta)>45)document.querySelector(delta<0?'#nextPhoto':'#prevPhoto').click()});
dragStage.addEventListener('pointercancel',()=>dragStage.classList.remove('dragging'));
