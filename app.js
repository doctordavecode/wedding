const envelope = document.getElementById("envelope")
const muteBtn = document.getElementById('muteBtn');
const musicBtn = document.getElementById('musicBtn');
const bgm = document.getElementById('bgm');
let opened=false

async function tryPlayMusic() {
    // Autoplay is usually blocked until a user gesture.
    try {
      await bgm.play();
      musicOn = true;
      setMusicUI();
    } catch {
      musicOn = false;
      setMusicUI();
    }
  }

  function stopMusic() {
    try { bgm.pause(); } catch {}
    musicOn = false;
    setMusicUI();
  }

  function openPages() {
    pages.hidden = false;
    cover.hidden = true;
    document.body.style.overflow = 'hidden';

    if (!musicOn) void tryPlayMusic();

    history.replaceState(null, '', location.pathname + location.search + '#p1');
  }
  
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
