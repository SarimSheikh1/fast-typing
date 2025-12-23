// ===============================================
// TypeBlitz - Main Application Logic
// ===============================================

// State Management
const state = {
    user: {
        selectedStore: null,
        coins: 0,
        totalMinutes: 0,
        currentSessionMinutes: 0,
        currentSessionSeconds: 0,
        level: 1,
        averageWpm: 0,
        averageAccuracy: 100,
        totalSessions: 0
    },
    practice: {
        isActive: false,
        isPaused: false,
        startTime: null,
        text: '',
        input: '',
        wpm: 0,
        accuracy: 100,
        streak: 0,
        errors: 0,
        correct: 0
    },
    settings: {
        soundEnabled: true
    },
    redemptions: []
};

// Sample typing texts - ENHANCED with harder content
const typingTexts = [
    "TypeBlitz rewards dedication with real discounts! Practice 60 minutes = 20% OFF at Daraz & ShopY stores.",
    "The quick brown fox jumps over the lazy dog, while 123 zebras grasp for extraordinary views beyond comprehension.",
    "Mastering touch-typing requires consistent practice: focus on accuracy first (>95%), then gradually increase speed to 80+ WPM.",
    "Technology's exponential growth demands adaptability—professionals must continuously update their skill-sets to remain competitive in today's dynamic marketplace.",
    "Artificial Intelligence, Machine Learning, and Quantum Computing are revolutionizing industries: healthcare, finance, transportation, and education.",
    "\"Practice makes perfect,\" she whispered; however, deliberate practice with immediate feedback yields exponentially better results than mindless repetition.",
    "The developer's mantra: DRY (Don't Repeat Yourself), KISS (Keep It Simple, Stupid), and YAGNI (You Aren't Gonna Need It).",
    "Blockchain technology enables decentralized, transparent, and immutable record-keeping—disrupting traditional financial institutions worldwide since 2009.",
    "Cognitive neuroscience reveals that muscle memory formation requires approximately 10,000+ hours of focused, intentional practice.",
    "Shakespeare's timeless question: \"To be, or not to be?\" epitomizes existential philosophy's profound exploration of human consciousness.",
    "E-commerce platforms leverage sophisticated algorithms: recommendation engines analyze user behavior patterns to maximize conversion rates & revenue.",
    "Climate change poses unprecedented challenges; sustainable development goals (SDGs) require immediate, coordinated global action from 195+ nations.",
    "Python's versatility spans web development (Django/Flask), data science (NumPy/Pandas), AI/ML (TensorFlow/PyTorch), and automation scripting.",
    "Cybersecurity threats evolve rapidly: phishing attacks, ransomware, SQL injection, cross-site scripting (XSS), and zero-day vulnerabilities.",
    "The mathematician declared, \"π ≈ 3.14159265359,\" while calculating circles' circumference using C = 2πr with remarkable precision.",
    "Entrepreneurship demands grit, resilience, creativity, and adaptability—90% of startups fail within their first 3 years of operation.",
    "Neuroscientists discovered that multitasking reduces productivity by 40%; focused deep work yields superior outcomes in less time.",
    "\"Success is not final, failure is not fatal: it's the courage to continue that counts,\" proclaimed Winston Churchill eloquently.",
    "Cryptocurrency enthusiasts debate Bitcoin vs. Ethereum vs. Cardano—each blockchain offers unique consensus mechanisms & smart contract capabilities.",
    "Professional writers understand: conciseness trumps verbosity; clarity surpasses complexity; editing is where good writing becomes great.",
    "The scientific method follows systematic steps: observation → hypothesis → experimentation → analysis → conclusion → peer review.",
    "TypeBlitz transforms tedious typing practice into engaging gamification: earn coins, unlock achievements, compete globally, redeem real rewards!",
    "Advanced developers master Git workflow: branching strategies (GitFlow/GitHub Flow), merge vs. rebase, cherry-picking commits, resolving conflicts.",
    "Economics 101: Supply & Demand curves determine market equilibrium; elasticity measures responsiveness to price changes at 5-10% intervals.",
    "Hemingway advised writers: \"Write drunk, edit sober\"—emphasizing creativity's free flow followed by ruthless, objective revision.",
    "Mobile-first responsive design ensures seamless UX across devices: smartphones (320px-480px), tablets (768px-1024px), desktops (1200px+).",
    "Quantum mechanics' superposition principle: particles exist simultaneously in multiple states until observation collapses the wave function paradoxically.",
    "Effective communication requires active listening, empathy, clarity, brevity, and understanding your audience's perspective & knowledge level.",
    "The Renaissance (14th-17th centuries) witnessed unprecedented artistic, scientific, and intellectual achievements: Da Vinci, Michelangelo, Galileo.",
    "Database normalization (1NF, 2NF, 3NF, BCNF) eliminates redundancy & anomalies; denormalization sometimes improves query performance strategically.",
    "\"We choose to go to the Moon...and do the other things, not because they are easy, but because they are hard,\" JFK proclaimed.",
    "Modern browsers support CSS Grid, Flexbox, animations (@keyframes), variables (--custom-property), and responsive media queries effortlessly.",
    "Psychological research confirms: spaced repetition (reviewing material at increasing intervals) dramatically improves long-term retention rates.",
    "Financial literacy encompasses budgeting, saving (20% of income), investing (stocks/bonds/ETFs), compound interest, and retirement planning (401k/IRA).",
    "The philosopher pondered: \"I think, therefore I am\" (Cogito, ergo sum)—Descartes' foundation for epistemological certaint y & existence.",
    "RESTful API design principles: statelessness, resource-based URLs (/users/123), HTTP methods (GET/POST/PUT/DELETE), JSON responses.",
    "Typography matters: font pairing (serif + sans-serif), hierarchy (sizes: 48px/32px/18px/16px), kerning, leading, and readability at 14-16px.",
    "Neuroplasticity demonstrates that brains constantly rewire themselves; learning new skills creates neural pathways regardless of age (18-80+).",
    "The paradox of choice: excessive options (30+) lead to decision paralysis & dissatisfaction; constraints foster creativity & contentment.",
    "Agile methodology emphasizes iterative development, daily standups, sprint planning, retrospectives, and continuous delivery of working software.",
    "\"Not all those who wander are lost\"—Tolkien's reminder that unconventional paths often lead to extraordinary destinations & self-discovery.",
    "Behavioral economics reveals cognitive biases: anchoring effect, confirmation bias, loss aversion, sunk cost fallacy, and hyperbolic discounting.",
    "Cloud computing architects leverage AWS/Azure/GCP: EC2/VMs, S3/Blob Storage, Lambda/Functions, RDS/Databases, and CDN distribution.",
    "The Renaissance man embodies polymathic expertise: mastering arts, sciences, mathematics, philosophy, literature, and athletics simultaneously.",
    "UX designers prioritize usability testing, A/B experiments, user personas, journey mapping, wireframing, and accessibility (WCAG 2.1 AA standards)."
];

// Store offers data
const storeOffers = {
    daraz: [
        {
            id: 'd1',
            title: '20% OFF Electronics',
            description: 'Get 20% discount on laptops, phones, and accessories',
            cost: 1,
            category: 'Electronics'
        },
        {
            id: 'd2',
            title: '20% OFF Fashion',
            description: 'Exclusive discount on clothing, shoes, and accessories',
            cost: 1,
            category: 'Fashion'
        },
        {
            id: 'd3',
            title: '20% OFF Home & Living',
            description: 'Save on furniture, decor, and home essentials',
            cost: 1,
            category: 'Home'
        }
    ],
    shopy: [
        {
            id: 's1',
            title: '20% OFF Local Stores',
            description: 'Use at participating ShopY local stores near you',
            cost: 1,
            category: 'Local'
        },
        {
            id: 's2',
            title: '20% OFF Groceries',
            description: 'Save on your weekly grocery shopping',
            cost: 1,
            category: 'Groceries'
        },
        {
            id: 's3',
            title: '20% OFF Services',
            description: 'Discount on beauty, wellness, and repair services',
            cost: 1,
            category: 'Services'
        }
    ]
};

// ===============================================
// Initialization
// ===============================================

document.addEventListener('DOMContentLoaded', () => {
    loadState();
    initStoreSelection();
    initNavigation();
    initDashboard();
    initPractice();
    initChallenges();
    initRewards();
    initSettings();

    // Start session timer
    startSessionTimer();
});

// Load saved state from localStorage
function loadState() {
    const saved = localStorage.getItem('typeblitz_state');
    if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(state.user, parsed.user);
        state.redemptions = parsed.redemptions || [];
    }
}

// Save state to localStorage
function saveState() {
    localStorage.setItem('typeblitz_state', JSON.stringify({
        user: state.user,
        redemptions: state.redemptions
    }));
}

// ===============================================
// Store Selection
// ===============================================

function initStoreSelection() {
    const storeCards = document.querySelectorAll('.store-card');
    const modal = document.getElementById('storeModal');
    const app = document.getElementById('app');

    storeCards.forEach(card => {
        card.addEventListener('click', () => {
            const store = card.dataset.store;
            selectStore(store);

            // Hide modal and show app
            modal.classList.remove('active');
            app.classList.add('active');

            // Apply theme
            document.body.className = `theme-${store}`;

            // Update store badge
            const badge = document.getElementById('storeBadge');
            badge.textContent = store === 'daraz' ? 'Daraz' : 'ShopY';
            badge.className = `store-badge ${store}`;

            playSound('select');
            showCelebration('Welcome to TypeBlitz! 🎉');
        });
    });
}

function selectStore(store) {
    state.user.selectedStore = store;
    saveState();
}

// ===============================================
// Navigation
// ===============================================

function initNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const views = document.querySelectorAll('.view');
    const actionBtns = document.querySelectorAll('[data-action]');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const viewName = btn.dataset.view;
            switchView(viewName);

            // Update active nav button
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    actionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const action = btn.dataset.action;
            const targetNav = document.querySelector(`[data-view="${action}"]`);
            if (targetNav) targetNav.click();
        });
    });
}

function switchView(viewName) {
    const views = document.querySelectorAll('.view');
    views.forEach(view => {
        view.classList.remove('active');
        if (view.id === viewName) {
            view.classList.add('active');
        }
    });

    // Update specific views
    if (viewName === 'dashboard') {
        updateDashboard();
    } else if (viewName === 'rewards') {
        updateRewards();
    }

    playSound('click');
}

// ===============================================
// Dashboard
// ===============================================

function initDashboard() {
    updateDashboard();
}

function updateDashboard() {
    // Update coins
    document.getElementById('coinCount').textContent = state.user.coins;

    // Update progress
    const minutes = state.user.currentSessionMinutes;
    document.getElementById('progressMinutes').textContent = minutes;

    const timeLeft = 60 - minutes;
    const timeLeftMins = Math.floor(timeLeft);
    const timeLeftSecs = Math.floor((timeLeft % 1) * 60);
    document.getElementById('timeRemaining').textContent =
        `${timeLeftMins}:${timeLeftSecs.toString().padStart(2, '0')}`;

    // Update progress circle
    const progress = (minutes / 60) * 100;
    const circle = document.getElementById('progressCircle');
    const circumference = 2 * Math.PI * 90;
    const offset = circumference - (progress / 100) * circumference;
    circle.style.strokeDashoffset = offset;

    // Update stats
    document.getElementById('avgWpm').textContent = Math.round(state.user.averageWpm);
    document.getElementById('avgAccuracy').textContent = Math.round(state.user.averageAccuracy) + '%';

    const hours = Math.floor(state.user.totalMinutes / 60);
    const mins = Math.floor(state.user.totalMinutes % 60);
    document.getElementById('totalTime').textContent = `${hours}h ${mins}m`;
    document.getElementById('userLevel').textContent = state.user.level;

    // Update motivational message
    updateMotivator();
}

function updateMotivator() {
    const motivators = [
        "You're doing great! Keep up the momentum! 🚀",
        "Every keystroke counts towards your next reward! 💪",
        `${60 - state.user.currentSessionMinutes} minutes until your next coin! 🪙`,
        "Practice makes perfect! You've got this! ✨",
        "Your typing skills are improving every day! 🎯"
    ];

    const motivator = document.getElementById('motivator');
    if (motivator) {
        motivator.textContent = motivators[Math.floor(Math.random() * motivators.length)];
    }
}

// ===============================================
// Session Timer
// ===============================================

function startSessionTimer() {
    setInterval(() => {
        if (state.practice.isActive && !state.practice.isPaused) {
            state.user.currentSessionSeconds++;

            if (state.user.currentSessionSeconds >= 60) {
                state.user.currentSessionSeconds = 0;
                state.user.currentSessionMinutes++;
                state.user.totalMinutes++;

                // Check if hour completed
                if (state.user.currentSessionMinutes >= 60) {
                    earnCoin();
                    state.user.currentSessionMinutes = 0;
                }

                saveState();
                updateDashboard();
            }
        }
    }, 1000);
}

function earnCoin() {
    state.user.coins++;
    saveState();

    playSound('coin');
    showCelebration('🎉 You earned a Store Coin! 🪙');
    createCoinAnimation();

    // Show notification
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('TypeBlitz', {
            body: '🎉 You earned a Store Coin! Unlock your 20% discount now!',
            icon: '🪙'
        });
    }
}

function createCoinAnimation() {
    const container = document.getElementById('coinSparkles');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.cssText = `
            position: absolute;
            width: 10px;
            height: 10px;
            background: var(--theme-primary);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: sparkle-fade 1s forwards;
        `;
        container.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 1000);
    }
}

// ===============================================
// Practice Mode
// ===============================================

function initPractice() {
    const input = document.getElementById('typingInput');
    const pauseBtn = document.getElementById('pauseBtn');
    const resetBtn = document.getElementById('resetBtn');

    input.addEventListener('input', handleTyping);
    input.addEventListener('focus', startPractice);

    pauseBtn.addEventListener('click', togglePause);
    resetBtn.addEventListener('click', resetPractice);

    // Load initial text
    loadNewText();
}

function loadNewText() {
    state.practice.text = typingTexts[Math.floor(Math.random() * typingTexts.length)];
    displayText();
}

function displayText() {
    const display = document.getElementById('textDisplay');
    const text = state.practice.text;
    const input = state.practice.input;

    let html = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        let className = 'char';

        if (i < input.length) {
            if (input[i] === char) {
                className += ' correct';
            } else {
                className += ' incorrect';
            }
        } else if (i === input.length) {
            className += ' current';
        }

        html += `<span class="${className}">${char === ' ' ? '&nbsp;' : char}</span>`;
    }

    display.innerHTML = html;
}

function handleTyping(e) {
    const input = e.target.value;
    state.practice.input = input;

    // Calculate stats
    calculateStats();
    updatePracticeStats();
    displayText();

    // Check if completed
    if (input === state.practice.text) {
        completePracticeRound();
    }

    playSound('type');
}

function calculateStats() {
    const input = state.practice.input;
    const text = state.practice.text;

    // Calculate accuracy
    let correct = 0;
    let errors = 0;

    for (let i = 0; i < input.length; i++) {
        if (input[i] === text[i]) {
            correct++;
        } else {
            errors++;
        }
    }

    state.practice.correct = correct;
    state.practice.errors = errors;
    state.practice.accuracy = input.length > 0 ? (correct / input.length) * 100 : 100;

    // Calculate WPM
    if (state.practice.isActive && state.practice.startTime) {
        const timeElapsed = (Date.now() - state.practice.startTime) / 1000 / 60; // minutes
        const wordsTyped = correct / 5; // standard: 5 chars = 1 word
        state.practice.wpm = timeElapsed > 0 ? Math.round(wordsTyped / timeElapsed) : 0;
    }

    // Update streak
    if (errors === 0 && input.length > 10) {
        state.practice.streak = Math.floor(input.length / 10);
    } else if (errors > state.practice.errors) {
        state.practice.streak = 0;
    }
}

function updatePracticeStats() {
    document.getElementById('liveWpm').textContent = state.practice.wpm;
    document.getElementById('liveAccuracy').textContent = Math.round(state.practice.accuracy) + '%';
    document.getElementById('streak').textContent = state.practice.streak + ' 🔥';

    if (state.practice.startTime) {
        const elapsed = Math.floor((Date.now() - state.practice.startTime) / 1000);
        const mins = Math.floor(elapsed / 60);
        const secs = elapsed % 60;
        document.getElementById('practiceTime').textContent =
            `${mins}:${secs.toString().padStart(2, '0')}`;
    }
}

function startPractice() {
    if (!state.practice.isActive) {
        state.practice.isActive = true;
        state.practice.startTime = Date.now();
        playSound('start');
    }
}

function togglePause() {
    state.practice.isPaused = !state.practice.isPaused;
    const btn = document.getElementById('pauseBtn');
    btn.textContent = state.practice.isPaused ? '▶️ Resume' : '⏸️ Pause';
    playSound('click');
}

function resetPractice() {
    state.practice = {
        isActive: false,
        isPaused: false,
        startTime: null,
        text: '',
        input: '',
        wpm: 0,
        accuracy: 100,
        streak: 0,
        errors: 0,
        correct: 0
    };

    document.getElementById('typingInput').value = '';
    loadNewText();
    updatePracticeStats();
    playSound('click');
}

function completePracticeRound() {
    // Update user stats
    state.user.totalSessions++;
    state.user.averageWpm = Math.round(
        (state.user.averageWpm * (state.user.totalSessions - 1) + state.practice.wpm) / state.user.totalSessions
    );
    state.user.averageAccuracy = Math.round(
        (state.user.averageAccuracy * (state.user.totalSessions - 1) + state.practice.accuracy) / state.user.totalSessions
    );

    saveState();
    playSound('complete');
    showCelebration('Round Complete! 🎉 Next text loading...');

    // Auto-advance to new text after brief celebration
    setTimeout(() => {
        const input = document.getElementById('typingInput');
        input.value = '';
        state.practice.input = '';
        state.practice.startTime = Date.now(); // Keep session active
        loadNewText();
    }, 1000); // 1 second delay for celebration
}

// ===============================================
// Challenges
// ===============================================

function initChallenges() {
    const challengeBtns = document.querySelectorAll('.challenge-btn');

    challengeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const challenge = btn.dataset.challenge;
            startChallenge(challenge);
        });
    });

    // Update store challenge
    updateStoreChallenge();
}

function updateStoreChallenge() {
    const title = document.getElementById('storeChallengeTitle');
    const desc = document.getElementById('storeChallengeDesc');
    const card = document.getElementById('storeChallenge');

    if (state.user.selectedStore === 'daraz') {
        title.textContent = 'Daraz Flash Sale Sprint';
        desc.textContent = 'Type as fast as you can during flash sale!';
        card.style.setProperty('--challenge-color', 'var(--daraz-primary)');
    } else {
        title.textContent = 'ShopY Weekend Speed Run';
        desc.textContent = 'Complete the weekend typing challenge!';
        card.style.setProperty('--challenge-color', 'var(--shopy-primary)');
    }
}

function startChallenge(type) {
    playSound('start');

    if (type === 'timeAttack') {
        showCelebration('Time Attack Started! ⏱️');
        // Bonus time added
        state.user.currentSessionMinutes += 15;
        saveState();
        updateDashboard();
    } else if (type === 'race') {
        showCelebration('Race Mode Started! 🏁');
        state.user.currentSessionMinutes += 20;
        saveState();
        updateDashboard();
    } else if (type === 'store') {
        showCelebration('Store Challenge Started! 🛍️');
        state.user.coins += 0.5;
        saveState();
        updateDashboard();
    }

    // Switch to practice view
    document.querySelector('[data-view="practice"]').click();
}

// ===============================================
// Rewards
// ===============================================

function initRewards() {
    updateRewards();
}

function updateRewards() {
    const carousel = document.getElementById('offersCarousel');
    const offers = state.user.selectedStore ? storeOffers[state.user.selectedStore] : [];

    carousel.innerHTML = '';

    offers.forEach(offer => {
        const card = createOfferCard(offer);
        carousel.appendChild(card);
    });

    // Update coin balance
    document.getElementById('rewardCoins').textContent = `${state.user.coins} Coin${state.user.coins !== 1 ? 's' : ''}`;

    // Update history
    updateRedemptionHistory();
}

function createOfferCard(offer) {
    const card = document.createElement('div');
    card.className = 'offer-card';

    const storeName = state.user.selectedStore === 'daraz' ? 'D' : 'S';

    card.innerHTML = `
        <div class="offer-header">
            <div class="offer-logo">${storeName}</div>
            <div class="offer-info">
                <h3>${offer.title}</h3>
                <span class="offer-category">${offer.category}</span>
            </div>
        </div>
        <p class="offer-details">${offer.description}</p>
        <div class="offer-cost">
            <span class="coin-icon">🪙</span>
            <span>${offer.cost} Coin</span>
        </div>
        <button class="redeem-btn" ${state.user.coins < offer.cost ? 'disabled' : ''}>
            ${state.user.coins < offer.cost ? '🔒 Not Enough Coins' : '🎁 Redeem Now'}
        </button>
    `;

    const btn = card.querySelector('.redeem-btn');
    btn.addEventListener('click', () => redeemOffer(offer));

    return card;
}

function redeemOffer(offer) {
    if (state.user.coins < offer.cost) return;

    // Deduct coins
    state.user.coins -= offer.cost;

    // Generate discount code
    const code = generateDiscountCode();

    // Add to redemption history
    state.redemptions.push({
        date: new Date().toISOString(),
        offer: offer.title,
        code: code,
        store: state.user.selectedStore
    });

    saveState();

    // Show redemption modal
    showRedemptionModal(code);

    playSound('redeem');
    createConfetti();
}

function generateDiscountCode() {
    const store = state.user.selectedStore.toUpperCase();
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const random = Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const date = new Date().toLocaleDateString('en-GB').split('/').reverse().join('').slice(2);

    return `TB-${store.slice(0, 5)}-${random}-${date}`;
}

function showRedemptionModal(code) {
    const modal = document.getElementById('redemptionModal');
    const codeDisplay = document.getElementById('discountCode');
    const copyBtn = document.getElementById('copyCodeBtn');
    const openStoreBtn = document.getElementById('openStoreBtn');

    codeDisplay.textContent = code;
    modal.classList.add('active');

    // Copy button
    copyBtn.onclick = () => {
        navigator.clipboard.writeText(code);
        copyBtn.textContent = '✅ Copied!';
        setTimeout(() => {
            copyBtn.textContent = '📋 Copy';
        }, 2000);
        playSound('click');
    };

    // Open store button
    openStoreBtn.onclick = () => {
        const urls = {
            daraz: 'https://www.daraz.pk',
            shopy: 'https://www.shopy.pk'
        };
        window.open(urls[state.user.selectedStore], '_blank');
        playSound('click');
    };

    // Close modal
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.onclick = () => {
        modal.classList.remove('active');
        updateRewards();
    };
}

function updateRedemptionHistory() {
    const historyList = document.getElementById('historyList');

    if (state.redemptions.length === 0) {
        historyList.innerHTML = '<p class="empty-state">No redemptions yet. Keep typing to earn coins!</p>';
        return;
    }

    historyList.innerHTML = '';

    state.redemptions.slice().reverse().forEach(redemption => {
        const item = document.createElement('div');
        item.className = 'history-item';

        const date = new Date(redemption.date);
        const dateStr = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });

        item.innerHTML = `
            <div>
                <strong>${redemption.offer}</strong>
                <br>
                <small style="color: var(--text-muted);">Code: ${redemption.code}</small>
            </div>
            <div style="text-align: right;">
                <div>${dateStr}</div>
                <small style="color: var(--text-muted); text-transform: uppercase;">${redemption.store}</small>
            </div>
        `;

        historyList.appendChild(item);
    });
}

// ===============================================
// Settings
// ===============================================

function initSettings() {
    const soundToggle = document.getElementById('soundToggle');
    const themeSwitch = document.getElementById('themeSwitch');

    soundToggle.addEventListener('click', () => {
        state.settings.soundEnabled = !state.settings.soundEnabled;
        soundToggle.classList.toggle('muted');
        playSound('click');
    });

    themeSwitch.addEventListener('click', () => {
        // Switch between Daraz and ShopY
        const newStore = state.user.selectedStore === 'daraz' ? 'shopy' : 'daraz';
        selectStore(newStore);
        document.body.className = `theme-${newStore}`;

        const badge = document.getElementById('storeBadge');
        badge.textContent = newStore === 'daraz' ? 'Daraz' : 'ShopY';
        badge.className = `store-badge ${newStore}`;

        updateRewards();
        updateStoreChallenge();
        playSound('click');
    });
}

// ===============================================
// Effects & Animations
// ===============================================

function showCelebration(message) {
    const overlay = document.getElementById('celebrationOverlay');
    const messageEl = document.getElementById('celebrationMessage');

    messageEl.textContent = message;
    overlay.classList.add('active');

    setTimeout(() => {
        overlay.classList.remove('active');
    }, 3000);
}

function createConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['var(--theme-primary)', 'var(--theme-secondary)', 'var(--theme-accent)', '#FFD700'];

    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 0.5 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';

        container.appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
    }
}

function playSound(type) {
    if (!state.settings.soundEnabled) return;

    // Simple sound feedback using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    const sounds = {
        type: { freq: 800, duration: 0.05 },
        click: { freq: 600, duration: 0.1 },
        select: { freq: 1000, duration: 0.2 },
        coin: { freq: 1200, duration: 0.3 },
        complete: { freq: 1500, duration: 0.4 },
        redeem: { freq: 2000, duration: 0.5 },
        start: { freq: 900, duration: 0.2 }
    };

    const sound = sounds[type] || sounds.click;

    oscillator.frequency.value = sound.freq;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + sound.duration);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + sound.duration);
}

// ===============================================
// Utility Functions
// ===============================================

// Request notification permission on load
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

// Add CSS animation for sparkle fade
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkle-fade {
        0% {
            transform: scale(0) translateY(0);
            opacity: 1;
        }
        100% {
            transform: scale(1) translateY(-50px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Add gradient definition to SVG
window.addEventListener('DOMContentLoaded', () => {
    const svg = document.querySelector('.progress-wheel svg');
    if (svg) {
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        gradient.setAttribute('id', 'progressGradient');
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%');
        gradient.setAttribute('y2', '100%');

        const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('style', 'stop-color:var(--theme-primary);stop-opacity:1');

        const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('style', 'stop-color:var(--theme-secondary);stop-opacity:1');

        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svg.insertBefore(defs, svg.firstChild);
    }
});
