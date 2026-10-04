/**
 * Spell & Read - iPad Mini (iOS 9.3.5) Legacy Engine
 * Written in strict ES5 JavaScript (no ES6+ syntax) for Mobile Safari 9.
 */
(function () {
  'use strict';

  // 1. Phonics sound mapping (matches modern React app)
  var PHONICS_SOUNDS = {
    A: 'ah',
    B: 'buh',
    C: 'kuh',
    D: 'duh',
    E: 'eh',
    F: 'fuh',
    G: 'guh',
    H: 'huh',
    I: 'ih',
    J: 'juh',
    K: 'kuh',
    L: 'luh',
    M: 'muh',
    N: 'nuh',
    O: 'aw',
    P: 'puh',
    Q: 'kwuh',
    R: 'ruh',
    S: 'suh',
    T: 'tuh',
    U: 'uh',
    V: 'vuh',
    W: 'wuh',
    X: 'ks',
    Y: 'yuh',
    Z: 'zuh'
  };

  var STORAGE_KEY = 'kidsgames_word_reader_settings';

  var DEFAULT_SETTINGS = {
    voiceURI: '',
    normalRate: 0.85,
    slowRate: 0.50,
    pitch: 1.1,
    phonicsMode: false
  };

  // State
  var word = '';
  var settings = loadSettings();
  var voicesList = [];
  var activeUtterance = null;
  var lastSpokenChar = '';
  var lastSpokenTime = 0;

  // DOM Elements
  var wordStage = document.getElementById('wordStage');
  var wordInput = document.getElementById('wordInput');
  var emptyPlaceholder = document.getElementById('emptyPlaceholder');
  var tilesRow = document.getElementById('tilesRow');
  var btnBackspace = document.getElementById('btnBackspace');
  var btnClear = document.getElementById('btnClear');
  var btnSayWord = document.getElementById('btnSayWord');
  var btnSlow = document.getElementById('btnSlow');
  var btnNormal = document.getElementById('btnNormal');
  var phonicsToggle = document.getElementById('phonicsToggle');
  var phonicsLabelText = document.getElementById('phonicsLabelText');
  var btnOpenSettings = document.getElementById('btnOpenSettings');
  var settingsModal = document.getElementById('settingsModal');
  var btnCloseSettings = document.getElementById('btnCloseSettings');
  var btnCloseSettingsX = document.getElementById('btnCloseSettingsX');
  var voiceSelect = document.getElementById('voiceSelect');
  var btnTestVoice = document.getElementById('btnTestVoice');
  var normalSpeedRange = document.getElementById('normalSpeedRange');
  var normalSpeedBadge = document.getElementById('normalSpeedBadge');
  var slowSpeedRange = document.getElementById('slowSpeedRange');
  var slowSpeedBadge = document.getElementById('slowSpeedBadge');
  var pitchRange = document.getElementById('pitchRange');
  var pitchBadge = document.getElementById('pitchBadge');
  var btnResetSettings = document.getElementById('btnResetSettings');

  // Persistence helpers (safe on iOS 9 Private Browsing)
  function loadSettings() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var parsed = JSON.parse(raw);
        return {
          voiceURI: parsed.voiceURI || DEFAULT_SETTINGS.voiceURI,
          normalRate: parsed.normalRate !== undefined ? parsed.normalRate : DEFAULT_SETTINGS.normalRate,
          slowRate: parsed.slowRate !== undefined ? parsed.slowRate : DEFAULT_SETTINGS.slowRate,
          pitch: parsed.pitch !== undefined ? parsed.pitch : DEFAULT_SETTINGS.pitch,
          phonicsMode: !!parsed.phonicsMode
        };
      }
    } catch (e) {
      // In iOS Safari private mode, localStorage can throw QUOTA_EXCEEDED_ERR
    }
    return {
      voiceURI: DEFAULT_SETTINGS.voiceURI,
      normalRate: DEFAULT_SETTINGS.normalRate,
      slowRate: DEFAULT_SETTINGS.slowRate,
      pitch: DEFAULT_SETTINGS.pitch,
      phonicsMode: DEFAULT_SETTINGS.phonicsMode
    };
  }

  function saveSettings() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {}
  }

  // Speech Synthesis helper
  function speakUtterance(text, rate, pitch) {
    if (!('speechSynthesis' in window)) {
      return;
    }

    try {
      window.speechSynthesis.cancel();
      var utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = rate || settings.normalRate;
      utterance.pitch = pitch || settings.pitch;
      utterance.lang = 'en-US';

      if (settings.voiceURI && voicesList.length > 0) {
        for (var i = 0; i < voicesList.length; i++) {
          if (voicesList[i].voiceURI === settings.voiceURI || voicesList[i].name === settings.voiceURI) {
            utterance.voice = voicesList[i];
            break;
          }
        }
      }

      // Retain reference to prevent Mobile Safari WebKit premature garbage collection
      activeUtterance = utterance;
      utterance.onend = function () {
        activeUtterance = null;
      };
      utterance.onerror = function () {
        activeUtterance = null;
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech error:', err);
    }
  }

  function speakLetter(char) {
    var now = new Date().getTime();
    var upper = char.toUpperCase();

    // Prevent duplicate speech fires within 150ms for the same character
    if (upper === lastSpokenChar && (now - lastSpokenTime) < 150) {
      return;
    }
    lastSpokenChar = upper;
    lastSpokenTime = now;

    var textToSpeak = settings.phonicsMode
      ? (PHONICS_SOUNDS[upper] || upper)
      : upper;

    speakUtterance(textToSpeak, settings.normalRate, settings.pitch);
  }

  function speakWord(speed) {
    var cleanWord = word.replace(/^\s+|\s+$/g, '');
    if (!cleanWord) return;

    var rate = speed === 'slow' ? settings.slowRate : settings.normalRate;

    // Visual pulse
    if (wordStage) {
      wordStage.className = 'word-card speaking';
      setTimeout(function () {
        wordStage.className = 'word-card';
      }, 900);
    }

    speakUtterance(cleanWord, rate, settings.pitch);
  }

  // Render letter tiles
  function renderTiles() {
    var cleanWord = word.replace(/^\s+|\s+$/g, '');

    if (cleanWord.length === 0) {
      emptyPlaceholder.style.display = 'block';
      tilesRow.style.display = 'none';
      tilesRow.innerHTML = '';
      btnBackspace.style.display = 'none';
      btnClear.style.display = 'none';
      btnSayWord.disabled = true;
      btnSlow.disabled = true;
      btnNormal.disabled = true;
    } else {
      emptyPlaceholder.style.display = 'none';
      tilesRow.style.display = 'block';
      btnBackspace.style.display = 'inline-block';
      btnClear.style.display = 'inline-block';
      btnSayWord.disabled = false;
      btnSlow.disabled = false;
      btnNormal.disabled = false;

      // Build tiles HTML
      var html = '';
      var letters = cleanWord.split('');
      for (var i = 0; i < letters.length; i++) {
        var char = letters[i];
        if (char === ' ') {
          html += '<span class="tile-space"></span>';
        } else {
          var colorClass = 'tile-color-' + (i % 8);
          html += '<div class="tile ' + colorClass + '">' + char.toUpperCase() + '</div>';
        }
      }
      tilesRow.innerHTML = html;
    }
  }

  // Load iOS Safari Voices
  function loadVoices() {
    if (!('speechSynthesis' in window)) return;

    var allVoices = window.speechSynthesis.getVoices();
    if (!allVoices || allVoices.length === 0) return;

    voicesList = allVoices;

    var html = '<option value="">Default System Voice (Auto)</option>';
    for (var i = 0; i < voicesList.length; i++) {
      var v = voicesList[i];
      var isSelected = (v.voiceURI === settings.voiceURI || v.name === settings.voiceURI) ? ' selected' : '';
      html += '<option value="' + (v.voiceURI || v.name) + '"' + isSelected + '>' + v.name + ' (' + v.lang + ')</option>';
    }
    voiceSelect.innerHTML = html;
  }

  // Update settings UI
  function updateSettingsUI() {
    phonicsToggle.checked = settings.phonicsMode;
    phonicsLabelText.textContent = settings.phonicsMode ? '🗣️ Phonics Sounds' : '🔤 Letter Names';
    normalSpeedRange.value = settings.normalRate;
    normalSpeedBadge.textContent = settings.normalRate.toFixed(2) + 'x';
    slowSpeedRange.value = settings.slowRate;
    slowSpeedBadge.textContent = settings.slowRate.toFixed(2) + 'x';
    pitchRange.value = settings.pitch;
    pitchBadge.textContent = settings.pitch.toFixed(1) + 'x';
  }

  // Setup Event Handlers
  function initEvents() {
    // Stage focus
    wordStage.addEventListener('click', function () {
      wordInput.focus();
    });

    // Input changes
    wordInput.addEventListener('input', function () {
      var val = wordInput.value;
      var cleanVal = val.replace(/[^a-zA-Z\s'-]/g, '');

      if (cleanVal.length > word.length) {
        var addedChar = cleanVal.charAt(cleanVal.length - 1);
        if (/[a-zA-Z]/.test(addedChar)) {
          speakLetter(addedChar);
        }
      }

      word = cleanVal;
      // Only mutate DOM input value if characters were actually stripped to avoid WebKit caret/buffer reset
      if (wordInput.value !== cleanVal) {
        wordInput.value = cleanVal;
      }
      renderTiles();
    });

    // Enter key press
    wordInput.addEventListener('keydown', function (e) {
      var code = e.keyCode || e.which;
      if (code === 13 || e.key === 'Enter') {
        e.preventDefault();
        speakWord('normal');
      }
    });

    // Form button handlers
    btnBackspace.addEventListener('click', function (e) {
      e.stopPropagation();
      if (word.length > 0) {
        word = word.slice(0, -1);
        wordInput.value = word;
        renderTiles();
        wordInput.focus();
      }
    });

    btnClear.addEventListener('click', function (e) {
      e.stopPropagation();
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      word = '';
      wordInput.value = '';
      renderTiles();
      wordInput.focus();
    });

    btnSayWord.addEventListener('click', function () {
      speakWord('normal');
    });

    btnSlow.addEventListener('click', function () {
      speakWord('slow');
    });

    btnNormal.addEventListener('click', function () {
      speakWord('normal');
    });

    // Phonics switch
    phonicsToggle.addEventListener('change', function () {
      settings.phonicsMode = phonicsToggle.checked;
      phonicsLabelText.textContent = settings.phonicsMode ? '🗣️ Phonics Sounds' : '🔤 Letter Names';
      saveSettings();
    });

    // Settings Modal
    btnOpenSettings.addEventListener('click', function () {
      settingsModal.style.display = 'block';
    });

    function closeModal() {
      settingsModal.style.display = 'none';
      setTimeout(function () {
        wordInput.focus();
      }, 100);
    }

    btnCloseSettings.addEventListener('click', closeModal);
    btnCloseSettingsX.addEventListener('click', closeModal);
    settingsModal.addEventListener('click', function (e) {
      if (e.target === settingsModal) {
        closeModal();
      }
    });

    voiceSelect.addEventListener('change', function () {
      settings.voiceURI = voiceSelect.value;
      saveSettings();
    });

    btnTestVoice.addEventListener('click', function () {
      speakUtterance("Hello! Let's read a book together!", settings.normalRate, settings.pitch);
    });

    normalSpeedRange.addEventListener('input', function () {
      settings.normalRate = parseFloat(normalSpeedRange.value);
      normalSpeedBadge.textContent = settings.normalRate.toFixed(2) + 'x';
      saveSettings();
    });

    slowSpeedRange.addEventListener('input', function () {
      settings.slowRate = parseFloat(slowSpeedRange.value);
      slowSpeedBadge.textContent = settings.slowRate.toFixed(2) + 'x';
      saveSettings();
    });

    pitchRange.addEventListener('input', function () {
      settings.pitch = parseFloat(pitchRange.value);
      pitchBadge.textContent = settings.pitch.toFixed(1) + 'x';
      saveSettings();
    });

    btnResetSettings.addEventListener('click', function () {
      settings = {
        voiceURI: DEFAULT_SETTINGS.voiceURI,
        normalRate: DEFAULT_SETTINGS.normalRate,
        slowRate: DEFAULT_SETTINGS.slowRate,
        pitch: DEFAULT_SETTINGS.pitch,
        phonicsMode: DEFAULT_SETTINGS.phonicsMode
      };
      saveSettings();
      updateSettingsUI();
      loadVoices();
    });

    // Voices loading
    if ('speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
      loadVoices();
    }
  }

  // Initialization
  document.addEventListener('DOMContentLoaded', function () {
    updateSettingsUI();
    renderTiles();
    initEvents();

    // Autofocus input
    setTimeout(function () {
      wordInput.focus();
    }, 200);
  });
})();
