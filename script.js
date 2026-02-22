(() => {
  const cover = document.getElementById('cover');
  const pages = document.getElementById('pages');
  const sealBtn = document.getElementById('sealBtn');
  const skipBtn = document.getElementById('skipBtn');
  const backBtn = document.getElementById('backBtn');
  const muteBtn = document.getElementById('muteBtn');
  const musicBtn = document.getElementById('musicBtn');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const shareBtn = document.getElementById('shareBtn');
  const bgm = document.getElementById('bgm');
  const snap = document.querySelector('.snap');
  const dots = Array.from(document.querySelectorAll('.dot'));

  let musicOn = false;

  function setMusicUI() {
    muteBtn.textContent = `音樂：${musicOn ? '開' : '關'}`;
    muteBtn.setAttribute('aria-pressed', String(musicOn));
    musicBtn.setAttribute('aria-pressed', String(musicOn));
    musicBtn.textContent = musicOn ? '♫' : '♪';
  }

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

  function goCover() {
    cover.hidden = false;
    pages.hidden = true;
    cover.classList.remove('is-opening');
    history.replaceState(null, '', location.pathname + location.search);
  }

  function openWithAnimation() {
    if (cover.classList.contains('is-opening')) return;
    cover.classList.add('is-opening');
    void tryPlayMusic();
    setTimeout(openPages, 1250);
  }

  function scrollToTarget(sel) {
    const el = document.querySelector(sel);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function updateDots() {
    const pagesEls = Array.from(document.querySelectorAll('.page'));
    const top = snap.scrollTop;
    let bestIdx = 0;
    let bestDist = Infinity;

    pagesEls.forEach((p, i) => {
      const dist = Math.abs(p.offsetTop - top);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    });

    dots.forEach((d, i) => d.classList.toggle('is-active', i === bestIdx));
  }

  // Events
  sealBtn.addEventListener('click', openWithAnimation);
  skipBtn.addEventListener('click', () => { void tryPlayMusic(); openPages(); });
  backBtn.addEventListener('click', goCover);

  muteBtn.addEventListener('click', async () => {
    if (musicOn) stopMusic();
    else await tryPlayMusic();
  });

  musicBtn.addEventListener('click', async () => {
    if (musicOn) stopMusic();
    else await tryPlayMusic();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const t = dot.getAttribute('data-target');
      if (t) scrollToTarget(t);
    });
  });

  snap.addEventListener('scroll', () => {
    window.clearTimeout(snap.__t);
    snap.__t = window.setTimeout(updateDots, 60);
  }, { passive: true });

  scrollTopBtn?.addEventListener('click', () => scrollToTarget('#p1'));

  shareBtn?.addEventListener('click', async (e) => {
    e.preventDefault();
    const url = location.href;
    try {
      await navigator.clipboard.writeText(url);
      shareBtn.textContent = '已複製！';
      setTimeout(() => (shareBtn.textContent = '複製分享連結'), 1200);
    } catch {
      prompt('複製這個連結分享：', url);
    }
  });

  window.addEventListener('load', () => {
    setMusicUI();
    if (location.hash && location.hash.startsWith('#p')) {
      openPages();
      setTimeout(() => scrollToTarget(location.hash), 200);
    }
  });
})();
