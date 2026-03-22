const envelope = document.getElementById("envelope")
let opened=false

envelope.addEventListener("click",()=>{

  if(opened) return
  opened=true

  envelope.classList.add("open")

  setTimeout(()=>{
    envelope.classList.add("zoom")

    // 開放滾動
    document.body.style.overflow="auto"

    // 自動往下滑一點（看到內容）
    window.scrollTo({
      top:window.innerHeight*0.6,
      behavior:"smooth"
    })

  },900)

})
