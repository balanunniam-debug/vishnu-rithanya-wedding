(() => {
  "use strict";
  const weddingMoment = new Date("2026-11-22T07:45:00+05:30").getTime();
  const $ = (id) => document.getElementById(id);

  function updateCountdown() {
    const now = Date.now();
    const diff = weddingMoment - now;
    if (diff <= 0) {
      $("countdown").innerHTML = '<p class="countdown-note">The forever has begun ♡</p>';
      return;
    }
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    $("days").textContent = String(days).padStart(2, "0");
    $("hours").textContent = String(hours).padStart(2, "0");
    $("minutes").textContent = String(minutes).padStart(2, "0");
    $("seconds").textContent = String(seconds).padStart(2, "0");
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("visible"));
  }

  // Visitor-controlled playback of the user's uploaded wedding song.
  const weddingAudio = $("weddingAudio");
  weddingAudio.volume = 0.75;
  let playing = false;
  function setMusicUI() {
    $("musicLabel").textContent = playing ? "Pause music" : "Play music";
    $("musicToggle").setAttribute("aria-pressed", String(playing));
  }
  $("musicToggle").addEventListener("click", async () => {
    if (playing) {
      weddingAudio.pause();
      playing = false;
      setMusicUI();
      return;
    }
    try {
      await weddingAudio.play();
      playing = true;
      setMusicUI();
    } catch (error) {
      $("musicLabel").textContent = "Tap to retry";
      playing = false;
      setMusicUI();
    }
  });
  weddingAudio.addEventListener("ended", () => {
    playing = false;
    setMusicUI();
  });

  const shareText = "You're invited to celebrate Vishnu Prasath & Rithanya! Reception: 21 November 2026, 6:00 PM onwards. Muhurtham: 22 November 2026, 7:45–8:45 AM. Venue: Vivaas Mahal, Dhali Road, Periyakulam Pirivu.";
  $("shareInvite").addEventListener("click", (event) => {
    event.preventDefault();
    const url = window.location.href;
    const message = `${shareText}\n\n${url}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });
})();