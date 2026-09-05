// ================= EASY CUSTOMIZATION =================
// Change the birthday here if needed.
// Format: "YYYY-MM-DDTHH:MM:SS"
const BIRTHDAY_DATE = "2026-09-07T00:00:00";

// Add/edit your floating messages here.
const floatingMessages = ["♥", "✦", "♡", "✨", "❤", "✧"];

// ======================================================

const $ = (s) => document.querySelector(s);

window.addEventListener("load", () => {
  setTimeout(() => $("#loader").classList.add("hide"), 3400);
  startParticles();
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, {threshold: 0.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// Start music only after a real user interaction.
const audio = $("#birthdayAudio");
const playPause = $("#playPause");
const progress = $("#progress");
const currentTime = $("#currentTime");
const duration = $("#duration");
const volume = $("#volume");
const musicStatus = $("#musicStatus");
const vinyl = document.querySelector(".vinyl");

function fmt(sec) {
  if (!Number.isFinite(sec)) return "0:00";
  return `${Math.floor(sec/60)}:${String(Math.floor(sec%60)).padStart(2,"0")}`;
}
audio.volume = .7;
volume.addEventListener("input", () => audio.volume = Number(volume.value));

function playMusic() {
  audio.play().then(() => {
    playPause.textContent = "⏸";
    vinyl.classList.add("playing");
    musicStatus.textContent = "Playing your birthday soundtrack… 🎶";
  }).catch(() => {
    musicStatus.textContent = "Add your MP3 at assets/birthday-song.mp3, then press Play. 🎵";
  });
}
function pauseMusic() {
  audio.pause();
  playPause.textContent = "▶";
  vinyl.classList.remove("playing");
}
playPause.addEventListener("click", () => audio.paused ? playMusic() : pauseMusic());

audio.addEventListener("loadedmetadata", () => duration.textContent = fmt(audio.duration));
audio.addEventListener("timeupdate", () => {
  currentTime.textContent = fmt(audio.currentTime);
  progress.style.width = audio.duration ? `${audio.currentTime/audio.duration*100}%` : "0%";
});
audio.addEventListener("error", () => {
  musicStatus.textContent = "Music file not found yet — replace assets/birthday-song.mp3 with your own MP3. 💕";
});

// Surprise button: scroll + start music.
$("#surpriseBtn").addEventListener("click", () => {
  playMusic();
  burstConfetti(90);
  document.querySelector("#photo").scrollIntoView({behavior:"smooth"});
});

// Gift interaction.
$("#giftBox").addEventListener("click", () => {
  $("#giftBox").classList.add("opened");
  $("#giftMessage").classList.add("show");
  burstConfetti(150);
  burstHearts(20);
});

// Countdown.
const target = new Date(BIRTHDAY_DATE).getTime();
let celebrated = false;
function updateCountdown() {
  const diff = target - Date.now();
  if (diff <= 0) {
    ["days","hours","minutes","seconds"].forEach(id => $("#"+id).textContent = "00");
    $("#birthdayText").textContent = "IT'S YOUR DAY! 🎉🎂❤️";
    if (!celebrated) { celebrated = true; burstConfetti(280); burstHearts(45); }
    return;
  }
  const d = Math.floor(diff/86400000);
  const h = Math.floor(diff/3600000)%24;
  const m = Math.floor(diff/60000)%60;
  const s = Math.floor(diff/1000)%60;
  $("#days").textContent = String(d).padStart(2,"0");
  $("#hours").textContent = String(h).padStart(2,"0");
  $("#minutes").textContent = String(m).padStart(2,"0");
  $("#seconds").textContent = String(s).padStart(2,"0");
}
updateCountdown();
setInterval(updateCountdown, 1000);

function burstConfetti(amount=100) {
  const layer = $("#confetti");
  for (let i=0;i<amount;i++) {
    const c = document.createElement("i");
    c.className = "confetti";
    c.style.left = Math.random()*100 + "vw";
    c.style.setProperty("--x", `${(Math.random()-.5)*260}px`);
    c.style.animationDelay = Math.random()*.45 + "s";
    c.style.transform = `rotate(${Math.random()*360}deg)`;
    c.style.background = ["#e985a5","#d8bdf5","#f7cba7","#8fd6c4","#f5df7c"][Math.floor(Math.random()*5)];
    c.style.borderRadius = Math.random()>.5 ? "50%" : "2px";
    layer.appendChild(c);
    setTimeout(() => c.remove(), 3500);
  }
}
function burstHearts(amount=15) {
  for(let i=0;i<amount;i++){
    const h=document.createElement("span");
    h.textContent=["♥","♡","✦","✨"][Math.floor(Math.random()*4)];
    h.style.left=(Math.random()*100)+"vw";
    h.style.fontSize=(12+Math.random()*25)+"px";
    h.style.animationDuration=(3+Math.random()*3)+"s";
    h.style.color=["#e985a5","#bd9de8","#e8aa82"][Math.floor(Math.random()*3)];
    h.className="particle-heart";
    h.style.position="fixed"; h.style.bottom="-30px"; h.style.zIndex="40";
    h.style.pointerEvents="none";
    document.body.appendChild(h);
    h.animate([{transform:"translateY(0) rotate(0deg)",opacity:1},{transform:`translateY(-110vh) rotate(${360+Math.random()*360}deg)`,opacity:0}],{duration:3500+Math.random()*2500,easing:"linear"}).onfinish=()=>h.remove();
  }
}
function startParticles(){
  const layer=$("#particles");
  setInterval(()=>{
    const p=document.createElement("span");
    p.textContent=floatingMessages[Math.floor(Math.random()*floatingMessages.length)];
    p.style.left=Math.random()*100+"vw";
    p.style.fontSize=10+Math.random()*18+"px";
    p.style.color=["#dc7899","#b99bdd","#e6b38f"][Math.floor(Math.random()*3)];
    p.style.animationDuration=6+Math.random()*7+"s";
    layer.appendChild(p);
    setTimeout(()=>p.remove(),14000);
  },700);
}

// Tiny parallax effect on larger screens.
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.addEventListener("scroll", () => {
    const y=window.scrollY;
    document.querySelector(".hero-content").style.transform=`translateY(${Math.min(y*.08,40)}px)`;
  }, {passive:true});
}
