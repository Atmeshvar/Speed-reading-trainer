// Локалізація
const translations = {
    uk: {
        title: 'Тренажер для скорочитання',
        uploadLabel: 'Завантажте файл (.txt, .pdf, .doc, .docx, .epub, .djvu):',
        pasteLabel: 'Або вставте текст сюди:',
        pastePlaceholder: 'Вставте текст або натисніть кнопку для вставки з буфера обміну...',
        pasteBtn: 'Вставити з буфера',
        loadPasteBtn: 'Завантажити текст',
        wordsPerLine: 'Слів у рядку:',
        speedLabel: 'Пауза між рядками (мс):',
        speedHint: 'Чим менше — тим швидше зʼявляється наступний рядок',
        holdTimeLabel: 'Час на максимальному розмірі (мс):',
        holdTimeHint: 'Рядок затримується перед тим, як зникнути',
        fontSizeLabel: 'Максимальний розмір шрифту (px):',
        fontSizeHint: 'Встановіть максимальний розмір тексту на паузі',
        offsetLabel: 'Позиція WPM (px):',
        startBtn: 'Почати',
        pauseBtn: 'Пауза',
        stopBtn: 'Зупинити',
        loadLastBtn: 'Завантажити останню книгу',
        defaultStatus: 'Завантажте текст для початку',
        installBtn: 'Встановити додаток',
        emptyText: 'Текст порожній. Будь ласка, додайте текст.',
        noFiles: 'Завантажте текст або вставте його з буфера обміну!',
        noLastBook: 'Немає збереженої останньої книги.',
        unsupportedFormat: 'Підтримуються лише формати .txt, .pdf, .doc, .docx, .epub, .djvu',
        clipboardError: 'Не вдалося прочитати буфер обміну. Спробуйте вставити текст вручну.',
        djvuError: 'Не вдалося прочитати файл DJVU. Можливо, файл не підтримується або не містить текстовий шар.',
        djvuPageError: 'Не вдалося визначити кількість сторінок у документі DJVU.',
        resumeText: (line, total) => `Відновлено з останнього місця: рядок ${line}`,
        readyText: (count) => `Готово! ${count} рядків для читання`,
        progressText: (current, total, percent) => `${current} / ${total} (${percent}%)`,
        completedText: 'Готово! Вітаємо! 🎉',
        pausedText: 'Зупинено. Натисніть "Почати" для продовження.',
        resumeFromLastBook: (line) => `Завантажено останню книгу. Рядок ${line}`,
        offsetText: (offset) => `Відступ зверху ${offset}px`,
        paused: 'Пауза',
        resumed: 'Продовжено',
        online: 'Онлайн',
        offline: 'Офлайн'
    },
    en: {
        title: 'Speed Reading Trainer',
        uploadLabel: 'Upload file (.txt, .pdf, .doc, .docx, .epub, .djvu):',
        pasteLabel: 'Or paste text here:',
        pastePlaceholder: 'Paste text or click the button to paste from clipboard...',
        pasteBtn: 'Paste from clipboard',
        loadPasteBtn: 'Load text',
        wordsPerLine: 'Words per line:',
        speedLabel: 'Pause between lines (ms):',
        speedHint: 'The lower the value, the faster the next line appears',
        holdTimeLabel: 'Time at maximum size (ms):',
        holdTimeHint: 'The line stays visible before disappearing',
        fontSizeLabel: 'Maximum font size (px):',
        fontSizeHint: 'Set the maximum text size on pause',
        offsetLabel: 'WPM position (px):',
        startBtn: 'Start',
        pauseBtn: 'Pause',
        stopBtn: 'Stop',
        loadLastBtn: 'Load last book',
        defaultStatus: 'Load text to begin',
        installBtn: 'Install app',
        emptyText: 'Text is empty. Please add text.',
        noFiles: 'Load text or paste it from clipboard!',
        noLastBook: 'No saved book history.',
        unsupportedFormat: 'Only .txt, .pdf, .doc, .docx, .epub, .djvu formats are supported',
        clipboardError: 'Could not read clipboard. Try pasting text manually.',
        djvuError: 'Could not read DJVU file. The file may not be supported or may not contain a text layer.',
        djvuPageError: 'Could not determine the number of pages in the DJVU document.',
        resumeText: (line, total) => `Resumed from last position: line ${line}`,
        readyText: (count) => `Ready! ${count} lines to read`,
        progressText: (current, total, percent) => `${current} / ${total} (${percent}%)`,
        completedText: 'Complete! Congratulations! 🎉',
        pausedText: 'Stopped. Click "Start" to continue.',
        resumeFromLastBook: (line) => `Last book loaded. Line ${line}`,
        offsetText: (offset) => `Top offset ${offset}px`,
        paused: 'Pause',
        resumed: 'Resumed',
        online: 'Online',
        offline: 'Offline'
    }
};

let currentLanguage = localStorage.getItem('appLanguage') || 'uk';

function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLanguage = lang;
    localStorage.setItem('appLanguage', lang);
    updatePageLanguage();
}

function updatePageLanguage() {
    console.log('[updatePageLanguage] Starting, currentLanguage =', window.currentLanguage);
    
    // Update elements with data-i18n attribute
    const i18nElements = document.querySelectorAll('[data-i18n]');
    console.log('[updatePageLanguage] Found', i18nElements.length, 'data-i18n elements');
    i18nElements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLanguage][key]) {
            el.textContent = translations[currentLanguage][key];
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[currentLanguage][key]) {
            el.placeholder = translations[currentLanguage][key];
        }
    });

    // Update dynamic text values
    console.log('[updatePageLanguage] Updating dynamic elements');
    const offsetValueEl = document.getElementById('statusOffsetValue');
    const offsetInputEl = document.getElementById('statusOffset');
    console.log('[updatePageLanguage] offsetValueEl =', !!offsetValueEl, 'offsetInputEl =', !!offsetInputEl);
    
    if (offsetValueEl && offsetInputEl) {
        const offset = parseInt(offsetInputEl.value) || 40;
        const newText = t('offsetText', offset);
        console.log('[updatePageLanguage] Setting offsetValue to:', newText);
        offsetValueEl.textContent = newText;
        console.log('[updatePageLanguage] offsetValue after update:', offsetValueEl.textContent);
    }

    const connStatusEl = document.getElementById('connectionStatus');
    console.log('[updatePageLanguage] connStatusEl =', !!connStatusEl);
    if (connStatusEl) {
        const online = navigator.onLine;
        const newConnText = online ? t('online') : t('offline');
        console.log('[updatePageLanguage] Setting connectionStatus to:', newConnText);
        connStatusEl.textContent = newConnText;
        connStatusEl.classList.toggle('offline', !online);
        console.log('[updatePageLanguage] connectionStatus after update:', connStatusEl.textContent);
    }

    // Update lang button
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.textContent = currentLanguage === 'uk' ? '🌐 UK/EN' : '🌐 EN/UK';
    }
    
    console.log('[updatePageLanguage] Complete');
}

function t(key, ...args) {
    const text = translations[currentLanguage][key];
    if (typeof text === 'function') {
        return text(...args);
    }
    return text || translations.uk[key];
}

// Setup language button
const langBtn = document.getElementById('langBtn');
if (langBtn) {
    langBtn.addEventListener('click', () => {
        setLanguage(currentLanguage === 'uk' ? 'en' : 'uk');
    });
}

const textInput = document.getElementById('textInput');
const textPaste = document.getElementById('textPaste');
const pasteBtn = document.getElementById('pasteBtn');
const loadPasteBtn = document.getElementById('loadPasteBtn');
const wordsPerLineInput = document.getElementById('wordsPerLine');
const speedInput = document.getElementById('speed');
const holdTimeInput = document.getElementById('holdTime');
const maxFontSizeInput = document.getElementById('maxFontSize');
const statusOffsetInput = document.getElementById('statusOffset');
const statusOffsetValue = document.getElementById('statusOffsetValue');
const pauseBtn = document.getElementById('pauseBtn');
const loadLastBtn = document.getElementById('loadLastBtn');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const textDisplay = document.getElementById('textDisplay');
const statusText = document.getElementById('statusText');
const wpmText = document.getElementById('wpmText');
const connectionStatus = document.getElementById('connectionStatus');
const installBtn = document.getElementById('installBtn');
const statusBlock = document.querySelector('.status');
const STORAGE_KEY = 'speedReadingState';

let isPaused = false;

// Змінні стану
let allLines = [];
let currentLineIndex = 0;
let isPlaying = false;
let animationTimeout;
let lineHoldTimeout;
let fullText = '';
let deferredInstallPrompt = null;
let djvuModulePromise = null;
const DJVU_MODULE_URL = 'https://cdn.jsdelivr.net/gh/RussCoder/djvujs@0.5.4/library/src/index.js';

// Initialize language on page load
window.addEventListener('load', () => {
    updatePageLanguage();
});

async function loadDjvuModule() {
    if (!djvuModulePromise) {
        djvuModulePromise = import(DJVU_MODULE_URL);
    }
    return djvuModulePromise;
}

// Завантаження текст файлу
textInput.addEventListener('change', handleFileUpload);

function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const extension = file.name.split('.').pop().toLowerCase();

    if (extension === 'txt') {
        const reader = new FileReader();
        reader.onload = function(event) {
            const text = event.target.result;
            loadText(text);
        };
        reader.readAsText(file);
    } else if (extension === 'pdf') {
        readPdfFile(file);
    } else if (extension === 'doc' || extension === 'docx') {
        readDocxFile(file);
    } else if (extension === 'epub') {
        readEpubFile(file);
    } else if (extension === 'djvu') {
        readDjvuFile(file);
    } else {
        alert(t('unsupportedFormat'));
    }
}

async function readPdfFile(file) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = '';

    for (let pageIndex = 1; pageIndex <= pdf.numPages; pageIndex++) {
        const page = await pdf.getPage(pageIndex);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(' ');
        text += pageText + '\n\n';
    }

    loadText(text);
}

async function readDocxFile(file) {
    const arrayBuffer = await file.arrayBuffer();
    let result;

    if (typeof mammoth.extractRawText === 'function') {
        result = await mammoth.extractRawText({ arrayBuffer });
        const plainText = result.value.replace(/\s+/g, ' ').trim();
        loadText(plainText);
        return;
    }

    result = await mammoth.convertToHtml({ arrayBuffer });
    const plainText = result.value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    loadText(plainText);
}

async function readEpubFile(file) {
    const arrayBuffer = await file.arrayBuffer();
    const text = await extractTextFromEpub(arrayBuffer);
    loadText(text);
}

async function readDjvuFile(file) {
    try {
        const arrayBuffer = await file.arrayBuffer();
        const djvuModule = await loadDjvuModule();
        const DjVu = djvuModule.default;
        const doc = new DjVu.Document(arrayBuffer, { baseUrl: null });

        let pageCount = 0;
        if (doc.dirm && typeof doc.dirm.getPagesQuantity === 'function') {
            pageCount = doc.dirm.getPagesQuantity();
        } else if (Array.isArray(doc.pages)) {
            pageCount = doc.pages.length;
        }

        if (!pageCount) {
            throw new Error(t('djvuPageError'));
        }

        let text = '';
        for (let pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
            const page = await doc.getPage(pageNumber);
            if (!page) continue;

            let pageText = '';
            if (typeof page.getText === 'function') {
                pageText = page.getText();
            }
            if (!pageText && typeof page.toString === 'function') {
                pageText = page.toString();
            }
            if (pageText) {
                text += pageText.replace(/\s+/g, ' ').trim() + '\n\n';
            }
        }

        loadText(text.trim());
    } catch (error) {
        console.error(error);
        alert(t('djvuError'));
    }
}

// Просте читання epub тексту через JSZip
async function extractTextFromEpub(arrayBuffer) {
    const zip = await JSZip.loadAsync(arrayBuffer);
    let fullText = '';

    const files = Object.keys(zip.files).filter(name => name.endsWith('.xhtml') || name.endsWith('.html'));
    for (const fileName of files) {
        const fileData = await zip.files[fileName].async('string');
        const plainText = fileData.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        fullText += plainText + '\n\n';
    }

    return fullText;
}

async function pasteFromClipboard() {
    try {
        const clipboardText = await navigator.clipboard.readText();
        textPaste.value = clipboardText;
    } catch (error) {
        alert(t('clipboardError'));
    }
}

pasteBtn.addEventListener('click', pasteFromClipboard);
loadPasteBtn.addEventListener('click', () => loadText(textPaste.value));
loadLastBtn.addEventListener('click', loadLastBook);
installBtn.addEventListener('click', async () => {
    if (!deferredInstallPrompt) return;
    deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    if (choice.outcome === 'accepted') {
        installBtn.hidden = true;
    }
    deferredInstallPrompt = null;
});

window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredInstallPrompt = event;
    installBtn.hidden = false;
});

function updateConnectionStatus() {
    const online = navigator.onLine;
    const connStatusEl = document.getElementById('connectionStatus');
    if (connStatusEl) {
        connStatusEl.textContent = online ? t('online') : t('offline');
        connStatusEl.classList.toggle('offline', !online);
    }
}

window.addEventListener('online', updateConnectionStatus);
window.addEventListener('offline', updateConnectionStatus);

function setInitialPwaState() {
    updateConnectionStatus();
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(() => {
            console.log('Service Worker is active');
        }).catch(() => {
            console.warn('Service Worker not available yet');
        });
    }
}

function getTextHash(text) {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
        hash = ((hash << 5) - hash) + text.charCodeAt(i);
        hash |= 0;
    }
    return hash.toString();
}

function saveReadingState() {
    if (!fullText) return;
    const savedState = {
        fullText,
        textHash: getTextHash(fullText),
        position: currentLineIndex,
        wordsPerLine: parseInt(wordsPerLineInput.value),
        speed: parseInt(speedInput.value),
        holdTime: parseInt(holdTimeInput.value),
        maxFontSize: parseInt(maxFontSizeInput.value),
        statusOffset: parseInt(statusOffsetInput.value),
        timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedState));
}

function loadSavedState() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
        return JSON.parse(raw);
    } catch (error) {
        return null;
    }
}

function loadText(text) {
    if (!text || text.trim().length === 0) {
        alert(t('emptyText'));
        return;
    }

    fullText = text;
    const savedState = loadSavedState();

    if (savedState && savedState.textHash === getTextHash(fullText)) {
        if (typeof savedState.wordsPerLine === 'number') {
            wordsPerLineInput.value = savedState.wordsPerLine;
        }
        if (typeof savedState.position === 'number') {
            currentLineIndex = savedState.position;
            statusText.textContent = t('resumeText', currentLineIndex + 1);
        } else {
            currentLineIndex = 0;
        }
    } else {
        currentLineIndex = 0;
    }

    processText(text);
}

function processText(text) {
    const words = text
        .split(/\s+/)
        .filter(word => word.length > 0);
    
    const wordsPerLine = parseInt(wordsPerLineInput.value);
    allLines = [];

    for (let i = 0; i < words.length; i += wordsPerLine) {
        const line = words.slice(i, i + wordsPerLine).join(' ');
        allLines.push(line);
    }

    startBtn.disabled = false;
    statusText.textContent = t('readyText', allLines.length);
}

// Оновлення рядків при зміні налаштувань
wordsPerLineInput.addEventListener('change', () => {
    if (!fullText) return;
    processText(fullText);
});

speedInput.addEventListener('change', () => {
    if (speedInput.value < 0) speedInput.value = 0;
});

holdTimeInput.addEventListener('change', () => {
    if (holdTimeInput.value < 0) holdTimeInput.value = 0;
});

statusOffsetInput.addEventListener('input', () => {
    const offset = parseInt(statusOffsetInput.value);
    statusBlock.style.marginTop = offset + 'px';
    statusOffsetValue.textContent = t('offsetText', offset);
});

// Запуск
startBtn.addEventListener('click', startReading);

function startReading() {
    if (allLines.length === 0) {
        alert(t('noFiles'));
        return;
    }

    isPlaying = true;
    isPaused = false;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    pauseBtn.textContent = t('pauseBtn');
    stopBtn.disabled = false;
    textInput.disabled = true;
    textPaste.disabled = true;
    pasteBtn.disabled = true;
    loadPasteBtn.disabled = true;
    wordsPerLineInput.disabled = true;
    speedInput.disabled = true;
    holdTimeInput.disabled = true;
    maxFontSizeInput.disabled = true;

    saveReadingState();
    showNextLine();
}

function showNextLine() {
    if (!isPlaying || isPaused || currentLineIndex >= allLines.length) {
        if (currentLineIndex >= allLines.length) {
            stopReading();
            statusText.textContent = t('completedText');
        }
        return;
    }

    const line = allLines[currentLineIndex];
    const speed = parseInt(speedInput.value);
    const holdTime = parseInt(holdTimeInput.value);
    const maxFontSize = parseInt(maxFontSizeInput.value);

    textDisplay.textContent = line;
    textDisplay.style.fontSize = `${Math.max(20, maxFontSize)}px`;
    textDisplay.className = 'text-display showing';

    clearTimeout(animationTimeout);
    clearTimeout(lineHoldTimeout);

    lineHoldTimeout = setTimeout(() => {
        textDisplay.className = 'text-display hide';

        animationTimeout = setTimeout(() => {
            currentLineIndex++;
            saveReadingState();
            showNextLine();
        }, speed);
    }, 300 + holdTime);

    const progress = Math.round(((currentLineIndex + 1) / allLines.length) * 100);
    const lineWords = line.split(/\s+/).filter(Boolean).length;
    const totalTimeSeconds = (300 + holdTime + speed) / 1000;
    const wpm = Math.round((lineWords / totalTimeSeconds) * 60);

    statusText.textContent = t('progressText', currentLineIndex + 1, allLines.length, progress);
    wpmText.textContent = `WPM: ${wpm}`;
}

// Зупинка
pauseBtn.addEventListener('click', togglePause);
stopBtn.addEventListener('click', stopReading);

function togglePause() {
    if (!isPlaying) return;

    if (isPaused) {
        isPaused = false;
        pauseBtn.textContent = t('pauseBtn');
        statusText.textContent = t('resumed');
        showNextLine();
    } else {
        isPaused = true;
        pauseBtn.textContent = t('startBtn');
        statusText.textContent = t('paused');
        clearTimeout(animationTimeout);
        clearTimeout(lineHoldTimeout);
    }
}

function loadLastBook() {
    const savedState = loadSavedState();
    if (!savedState || !savedState.fullText) {
        alert(t('noLastBook'));
        return;
    }

    fullText = savedState.fullText;
    if (typeof savedState.wordsPerLine === 'number') {
        wordsPerLineInput.value = savedState.wordsPerLine;
    }
    if (typeof savedState.speed === 'number') {
        speedInput.value = savedState.speed;
    }
    if (typeof savedState.holdTime === 'number') {
        holdTimeInput.value = savedState.holdTime;
    }
    if (typeof savedState.maxFontSize === 'number') {
        maxFontSizeInput.value = savedState.maxFontSize;
    }
    if (typeof savedState.statusOffset === 'number') {
        statusOffsetInput.value = savedState.statusOffset;
        statusBlock.style.marginTop = savedState.statusOffset + 'px';
        statusOffsetValue.textContent = t('offsetText', savedState.statusOffset);
    }
    currentLineIndex = typeof savedState.position === 'number' ? savedState.position : 0;
    processText(fullText);
    statusText.textContent = t('resumeFromLastBook', currentLineIndex + 1);
}

function stopReading() {
    isPlaying = false;
    isPaused = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = 'Пауза';
    stopBtn.disabled = true;
    textInput.disabled = false;
    textPaste.disabled = false;
    pasteBtn.disabled = false;
    loadPasteBtn.disabled = false;
    wordsPerLineInput.disabled = false;
    speedInput.disabled = false;
    holdTimeInput.disabled = false;
    maxFontSizeInput.disabled = false;
    statusOffsetInput.disabled = false;
    
    clearTimeout(animationTimeout);
    clearTimeout(lineHoldTimeout);
    textDisplay.textContent = '';
    textDisplay.className = 'text-display';
    textDisplay.style.fontSize = '';
    
    if (currentLineIndex < allLines.length) {
        statusText.textContent = t('pausedText');
    }
    wpmText.textContent = 'WPM: 0';
    saveReadingState();
}

// Оновлення UI при завантаженні
window.addEventListener('load', () => {
    stopBtn.disabled = true;
    startBtn.disabled = true;
    pauseBtn.disabled = true;
    wpmText.textContent = 'WPM: 0';
    
    statusOffsetValue.textContent = t('offsetText', parseInt(statusOffsetInput.value));
    setInitialPwaState();

    const savedState = loadSavedState();
    if (savedState && savedState.fullText) {
        fullText = savedState.fullText;
        if (typeof savedState.wordsPerLine === 'number') {
            wordsPerLineInput.value = savedState.wordsPerLine;
        }
        if (typeof savedState.speed === 'number') {
            speedInput.value = savedState.speed;
        }
        if (typeof savedState.holdTime === 'number') {
            holdTimeInput.value = savedState.holdTime;
        }
        if (typeof savedState.maxFontSize === 'number') {
            maxFontSizeInput.value = savedState.maxFontSize;
        }
        if (typeof savedState.statusOffset === 'number') {
            statusOffsetInput.value = savedState.statusOffset;
            statusBlock.style.marginTop = savedState.statusOffset + 'px';
            statusOffsetValue.textContent = t('offsetText', savedState.statusOffset);
        }
        currentLineIndex = typeof savedState.position === 'number' ? savedState.position : 0;
        processText(fullText);
        statusText.textContent = t('resumeFromLastBook', currentLineIndex + 1);
    }
});
