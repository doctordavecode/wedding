# 可 Publish 的電子喜帖（GitHub Pages 版）

這是一個**純靜態**（HTML/CSS/JS）的電子喜帖：
- 封面信封 + 封蠟「點擊開啟」動畫
- 進入後是**滑動翻頁**（向下滑）
- 背景音樂（需放一個 mp3 檔，手機瀏覽器通常需要點擊後才允許播放）

## 1) 你要改的地方

### A. 換音樂
把你的音樂檔命名為：

- `assets/music.mp3`

> 如果不想放音樂也可以，網站仍可正常使用。

### B. 換頁面
目前已放兩張圖：
- `assets/page2.png`
- `assets/page4.png`

要新增更多頁：
1. 把圖片丟進 `assets/`（例如 `page3.png`）
2. 打開 `index.html`，複製一段：

```html
<article class="page">
  <img class="page-img" src="assets/page3.png" alt="你的頁面" loading="lazy" />
</article>
```

3. 同步在 `dots` 區塊加一顆 dot（可選）

### C. 換封面文字
`index.html` 內 `paper-hint` 區塊的文字可改。

## 2) 本機測試

- 直接用瀏覽器打開 `index.html` 也可
- 建議用 VS Code 的 Live Server（更像正式環境）

## 3) Publish 到 GitHub Pages（最簡單）

1. 到 GitHub 建一個新 repo（例如：`my-wedding-invite`）
2. 把這個資料夾的內容整包上傳（`index.html / styles.css / script.js / assets/`）
3. Repo → **Settings** → **Pages**
4. Build and deployment：
   - Source 選 `Deploy from a branch`
   - Branch 選 `main` / `root`（或你放在 `docs/` 也可以）
5. 等它給你網址，就完成了

## 4) 小提醒

- iOS/Android 多數瀏覽器會擋自動播放音樂，所以你會看到「點擊開啟」後音樂才開始。
- 若你想要更像原版（更多頁、更多動畫、相簿、倒數、祝福留言…），可以跟我說你要的功能清單，我可以把這版升級成完整版。
