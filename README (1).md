# 🃏 FlipQuest — Memory Card Game

A sleek, animated memory card matching game built with pure HTML, CSS, and JavaScript. No libraries, no frameworks — just vanilla web tech.

## 🎮 Live Demo

> Open `index.html` in your browser to play instantly!

## ✨ Features

- **3 difficulty levels** — Easy (6 pairs), Medium (8 pairs), Hard (10 pairs)
- **Smooth 3D card flip animations** using CSS transforms & perspective
- **Live stats** — move counter, timer, and pairs found
- **Star rating system** — rated on efficiency (fewer moves = higher stars)
- **Confetti celebration** on winning 🎉
- **Restart / Back** buttons for quick replaying
- Fully responsive — works on mobile and desktop
- Zero dependencies — pure HTML, CSS, JavaScript

## 🚀 How to Run

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/memory-card-game.git
   ```
2. Navigate into the folder:
   ```bash
   cd memory-card-game
   ```
3. Open `index.html` in any browser. That's it — no build step, no npm!

## 📁 Project Structure

```
memory-card-game/
├── index.html    → Game structure and screens (HTML)
├── style.css     → Styling, card flip animations, responsive layout
├── script.js     → Game logic, timer, matching, state management
└── README.md     → This file
```

## 🎯 How to Play

1. Pick a difficulty on the start screen
2. Click any card to flip it over
3. Click a second card — if they match, they stay face up
4. If they don't match, both cards flip back
5. Find all pairs in as few moves as possible!
6. Your star rating is based on how efficiently you played

## 🛠️ Built With

- HTML5 (semantic structure, multiple screen management)
- CSS3 (3D transforms, perspective, keyframe animations, CSS Grid)
- Vanilla JavaScript (game state, DOM manipulation, Fisher-Yates shuffle)

## 📚 What I Learned

- CSS 3D card flip effect using `transform-style: preserve-3d` and `backface-visibility`
- Managing complex game state (flipped cards, matched pairs, locking during animations)
- Fisher-Yates shuffle algorithm for randomizing card layout
- Using `setInterval` for a live game timer
- Building a multi-screen single-page app without any framework
- Responsive CSS Grid layouts

## 🤝 Contributing

Pull requests are welcome! Some ideas for extending this project:
- Add a high score / best time tracker using `localStorage`
- Add sound effects on flip and match
- Add more emoji themes (animals, food, flags)
- Add a leaderboard

## 📄 License

Open source under the [MIT License](LICENSE).

---

Made with ❤️ by [Your Name]
