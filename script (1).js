// ── Emoji pool ──
const ALL_EMOJIS = [
  '🦊','🐼','🦁','🐸','🦋','🐙','🦄','🦀',
  '🐬','🦜','🌸','🍄','🔮','🎸','🚀','🌈',
  '🍕','🎯','🎲','🧩'
];

// ── State ──
let selectedPairs = 6;
let cards = [];
let flipped = [];
let matched = [];
let moves = 0;
let seconds = 0;
let timerInterval = null;
let canFlip = true;

// ── DOM ──
const startScreen  = document.getElementById('start-screen');
const gameScreen   = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const board        = document.getElementById('board');
const movesVal     = document.getElementById('moves-val');
const timerVal     = document.getElementById('timer-val');
const pairsVal     = document.getElementById('pairs-val');
const playBtn      = document.getElementById('play-btn');
const backBtn      = document.getElementById('back-btn');
const restartBtn   = document.getElementById('restart-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const changeDiffBtn= document.getElementById('change-diff-btn');
const diffBtns     = document.querySelectorAll('.diff-btn');
const rTime        = document.getElementById('r-time');
const rMoves       = document.getElementById('r-moves');
const rRating      = document.getElementById('r-rating');
const confettiArea = document.getElementById('confetti-area');

// ── Difficulty select ──
diffBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    diffBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedPairs = parseInt(btn.dataset.pairs);
  });
});

// ── Buttons ──
playBtn.addEventListener('click', startGame);
backBtn.addEventListener('click', () => { stopTimer(); showScreen(startScreen); });
restartBtn.addEventListener('click', startGame);
playAgainBtn.addEventListener('click', startGame);
changeDiffBtn.addEventListener('click', () => { stopTimer(); showScreen(startScreen); });

// ── Start game ──
function startGame() {
  moves = 0; seconds = 0; flipped = []; matched = [];
  canFlip = true;
  movesVal.textContent = '0';
  timerVal.textContent = '00:00';
  pairsVal.textContent = '0';
  stopTimer();
  buildBoard();
  showScreen(gameScreen);
  startTimer();
}

// ── Build board ──
function buildBoard() {
  board.innerHTML = '';

  // Pick emojis and duplicate for pairs
  const emojis = shuffle([...ALL_EMOJIS]).slice(0, selectedPairs);
  cards = shuffle([...emojis, ...emojis]);

  // Set grid columns based on pair count
  const cols = selectedPairs <= 6 ? 4 : selectedPairs <= 8 ? 4 : 5;
  board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

  // Create card elements
  cards.forEach((emoji, i) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = i;
    card.dataset.emoji = emoji;
    card.style.animationDelay = `${i * 0.04}s`;
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-back"></div>
        <div class="card-front">${emoji}</div>
      </div>`;
    card.addEventListener('click', () => flipCard(card));
    board.appendChild(card);
  });
}

// ── Flip a card ──
function flipCard(card) {
  if (!canFlip) return;
  if (card.classList.contains('flipped')) return;
  if (card.classList.contains('matched')) return;
  if (flipped.length >= 2) return;

  card.classList.add('flipped');
  flipped.push(card);

  if (flipped.length === 2) {
    canFlip = false;
    moves++;
    movesVal.textContent = moves;
    checkMatch();
  }
}

// ── Check match ──
function checkMatch() {
  const [a, b] = flipped;
  if (a.dataset.emoji === b.dataset.emoji) {
    // It's a match!
    setTimeout(() => {
      a.classList.add('matched');
      b.classList.add('matched');
      matched.push(a, b);
      flipped = [];
      canFlip = true;
      pairsVal.textContent = matched.length / 2;

      if (matched.length === cards.length) {
        setTimeout(showResult, 600);
      }
    }, 300);
  } else {
    // No match — flip back
    setTimeout(() => {
      a.classList.remove('flipped');
      b.classList.remove('flipped');
      flipped = [];
      canFlip = true;
    }, 900);
  }
}

// ── Timer ──
function startTimer() {
  timerInterval = setInterval(() => {
    seconds++;
    timerVal.textContent = formatTime(seconds);
  }, 1000);
}

function stopTimer() { clearInterval(timerInterval); }

function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, '0');
  const sec = (s % 60).toString().padStart(2, '0');
  return `${m}:${sec}`;
}

// ── Show result ──
function showResult() {
  stopTimer();

  rTime.textContent = formatTime(seconds);
  rMoves.textContent = moves;

  // Rating based on moves relative to pair count
  const perfect = selectedPairs; // minimum possible moves
  const ratio = moves / perfect;
  let rating, trophy;
  if (ratio <= 1.3)       { rating = '⭐⭐⭐'; trophy = '🏆'; }
  else if (ratio <= 1.8)  { rating = '⭐⭐'; trophy = '🎉'; }
  else                    { rating = '⭐'; trophy = '👍'; }

  document.getElementById('trophy').textContent = trophy;
  rRating.textContent = rating;

  showScreen(resultScreen);
  launchConfetti();
}

// ── Confetti ──
function launchConfetti() {
  confettiArea.innerHTML = '';
  const colors = ['#e8603c','#3c8ce8','#2ecc71','#f0e040','#e040e8','#40e8e0'];
  for (let i = 0; i < 70; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + 'vw';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.width = (6 + Math.random() * 8) + 'px';
    piece.style.height = (6 + Math.random() * 8) + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.animationDuration = (1.5 + Math.random() * 2) + 's';
    piece.style.animationDelay = Math.random() * 1.2 + 's';
    confettiArea.appendChild(piece);
  }
  // Clean up after animation
  setTimeout(() => confettiArea.innerHTML = '', 4000);
}

// ── Helpers ──
function showScreen(screen) {
  [startScreen, gameScreen, resultScreen].forEach(s => s.classList.add('hidden'));
  screen.classList.remove('hidden');
  screen.style.animation = 'none';
  screen.offsetHeight; // reflow
  screen.style.animation = '';
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
