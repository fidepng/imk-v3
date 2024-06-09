// tts.js

// Variabel untuk menyimpan status TTS
let isTTSEnabled = false;
// Variabel untuk menyimpan instance SpeechSynthesisUtterance
let currentUtterance = null;

// Fungsi utilitas untuk mendapatkan elemen-elemen yang ingin diberi fitur TTS
function getElementsForTTS() {
  return document.querySelectorAll(
    '.menu-card, [tabindex="0"]:not(textarea):not(button), .answer-btn, #question-container, #prev-btn, #next-btn'
  );
}

// Fungsi untuk menginisialisasi TTS
function initTTS() {
  if ("speechSynthesis" in window) {
    const ttsSwitch = document.getElementById("ttsSwitch");
    const elements = getElementsForTTS();

    // Dapatkan status TTS dari localStorage
    const ttsEnabled = localStorage.getItem("ttsEnabled") === "true";

    // Atur status awal switch TTS berdasarkan nilai dari localStorage
    ttsSwitch.checked = ttsEnabled;
    isTTSEnabled = ttsEnabled;

    // Fungsi untuk menangani event hover dan focus pada elemen
    const handleHoverAndFocus = (event) => {
      if (isTTSEnabled) {
        let text =
          event.target.getAttribute("aria-label") ||
          event.target.innerText ||
          event.target.textContent;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "id-ID"; // Mengatur bahasa ke Bahasa Indonesia

        // Jika ada ucapan sedang berlangsung, hentikan
        if (currentUtterance) {
          window.speechSynthesis.cancel();
        }

        // Simpan instance SpeechSynthesisUtterance terbaru
        currentUtterance = utterance;

        window.speechSynthesis.speak(utterance);
      }
    };

    // Tambahkan event listener untuk setiap elemen
    elements.forEach((element) => {
      element.addEventListener("mouseover", handleHoverAndFocus);
      element.addEventListener("focus", handleHoverAndFocus);
    });

    // Tambahkan event listener untuk event keyboard
    const handleKeydown = (event) => {
      if (isTTSEnabled && event.key === "Enter") {
        const activeElement = document.activeElement;
        if (activeElement && elements.includes(activeElement)) {
          handleHoverAndFocus({ target: activeElement });
        }
      }
    };
    document.addEventListener("keydown", handleKeydown);

    // Tambahkan event listener untuk switch TTS
    ttsSwitch.addEventListener("change", () => {
      isTTSEnabled = ttsSwitch.checked;
      localStorage.setItem("ttsEnabled", isTTSEnabled);

      if (isTTSEnabled) {
        speakText("Text-to-Speech diaktifkan");
      } else {
        speakText("Text-to-Speech dinonaktifkan");
      }
    });
  } else {
    console.error("Web Speech API tidak didukung pada browser ini.");
  }
}

// Fungsi untuk mengucapkan teks
function speakText(text) {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID";
    window.speechSynthesis.speak(utterance);
  }
}

// Panggil fungsi initTTS() saat halaman selesai dimuat
document.addEventListener("DOMContentLoaded", initTTS);
