// ===============================================
// Advanced Features - TypeBlitz Extension
// Add this to the main initialization in DOMContentLoaded
// ===============================================

// Advanced state additions
state.practiceMode = 'regular'; // regular, code, quotes, news, custom
state.selectedLanguage = 'javascript';
state.customText = '';

// Initialize advanced features
document.addEventListener('DOMContentLoaded', () => {
    // Call these after basic initialization
    setTimeout(() => {
        initTypingModes();
        initLeaderboard();
        initAnalytics();
        initAchievements();
    }, 100);
});

// ===============================================
// Advanced Typing Modes
// ===============================================

function initTypingModes() {
    const modeBtns = document.querySelectorAll('.mode-btn');
    const languageSelector = document.getElementById('languageSelector');
    const customTextInput = document.getElementById('customTextInput');
    const codeLanguageSelect = document.getElementById('codeLanguage');
    const importCustomBtn = document.getElementById('importCustomBtn');

    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.dataset.mode;
            selectMode(mode);

            // Update active state
            modeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show/hide language selector for code mode
            if (mode === 'code') {
                languageSelector.style.display = 'block';
                customTextInput.style.display = 'none';
            } else if (mode === 'custom') {
                customTextInput.style.display = 'block';
                languageSelector.style.display = 'none';
            } else {
                languageSelector.style.display = 'none';
                customTextInput.style.display = 'none';
            }
        });
    });

    codeLanguageSelect.addEventListener('change', (e) => {
        state.selectedLanguage = e.target.value;
        if (state.practiceMode === 'code') {
            loadNewText();
        }
    });

    importCustomBtn.addEventListener('click', () => {
        const customTextArea = document.getElementById('customTextArea');
        if (customTextArea.value.trim()) {
            state.customText = customTextArea.value.trim();
            state.practiceMode = 'custom';
            loadNewText();
            playSound('click');
        }
    });
}

function selectMode(mode) {
    state.practiceMode = mode;
    loadNewText();
    playSound('click');
}

// Override loadNewText function to support all modes
const originalLoadNewText = loadNewText;
loadNewText = function () {
    let text = '';

    switch (state.practiceMode) {
        case 'code':
            const snippet = getCodeSnippet(state.selectedLanguage);
            text = snippet.code;
            break;

        case 'quotes':
            const quote = getRandomQuote();
            text = `"${quote.text}" - ${quote.author}`;
            break;

        case 'news':
            const article = getNewsArticle();
            text = `${article.title}: ${article.content}`;
            break;

        case 'custom':
            text = state.customText || generateRandomText();
            break;

        default:
            text = generateRandomText();
    }

    state.practice.text = text;
    displayText();
};

// ===============================================
// Leaderboard System
// ===============================================

function initLeaderboard() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            updateLeaderboard(filter);

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    updateLeaderboard('global');
}

function updateLeaderboard(filter = 'global') {
    const leaderboardList = document.getElementById('leaderboardList');
    if (!leaderboardList) return;

    // Generate simulated leaderboard data
    const leaders = generateLeaderboardData(filter);

    leaderboardList.innerHTML = '';

    leaders.forEach((leader, index) => {
        const item = document.createElement('div');
        item.className = 'leaderboard-item';

        const rankClass = index < 3 ? `rank-${index + 1}` : '';
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';

        item.innerHTML = `
            <div class="rank ${rankClass}">${medal || `#${index + 1}`}</div>
            <div class="leader-info">
                <div class="leader-name">${leader.name}</div>
                <div class="leader-stats">
                    <span>⚡ ${leader.wpm} WPM</span>
                    <span>🎯 ${leader.accuracy}%</span>
                    <span>🪙 ${leader.coins} coins</span>
                </div>
            </div>
        `;

        leaderboardList.appendChild(item);
    });

    // Update your rank
    document.getElementById('yourRank').textContent = '#' + (Math.floor(Math.random() * 100) + 50);
    document.getElementById('yourRankWpm').textContent = Math.round(state.user.averageWpm);
    document.getElementById('yourRankCoins').textContent = state.user.coins;
}

function generateLeaderboardData(filter) {
    const names = ['Alex Thunder', 'Speed Master', 'Type King', 'Keyboard Warrior', 'Swift Typer',
        'Accuracy Queen', 'Fast Fingers', 'Code Ninja', 'Word Wizard', 'Type Champion'];

    return Array.from({ length: 10 }, (_, i) => ({
        name: names[i],
        wpm: Math.floor(Math.random() * 50) + 80 - (i * 5),
        accuracy: Math.floor(Math.random() * 5) + 95 - (i * 0.5),
        coins: Math.floor(Math.random() * 20) + 15 - (i * 2)
    }));
}

// ===============================================
// Analytics Dashboard
// ===============================================

function initAnalytics() {
    const rangeBtns = document.querySelectorAll('.range-btn');

    rangeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const range = parseInt(btn.dataset.range);
            updateAnalytics(range);

            rangeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Update analytics when view is opened
    updateAnalytics(7);
}

function updateAnalytics(days = 7) {
    // Update summary cards
    const summary = analytics.getSummary(days);

    document.getElementById('analyticsAvgWpm').textContent = summary.avgWpm;
    document.getElementById('analyticsAvgAccuracy').textContent = summary.avgAccuracy + '%';
    document.getElementById('analyticsStreak').textContent = analytics.getPracticeStreak();

    const improvementEl = document.getElementById('analyticsImprovement');
    improvementEl.textContent = (summary.improvement >= 0 ? '+' : '') + summary.improvement;
    improvementEl.style.color = summary.improvement >= 0 ? 'var(--success)' : 'var(--error)';

    // Render charts and visualizations
    renderWpmChart(days);
    renderKeyboardHeatmap();
    renderWeakKeys();
    renderPracticeCalendar();
}

function renderWpmChart(days) {
    const canvas = document.getElementById('wpmChart');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const data = analytics.getWpmChartData(days);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (data.length === 0) {
        ctx.fillStyle = 'var(--text-muted)';
        ctx.font = '20px Inter';
        ctx.textAlign = 'center';
        ctx.fillText('No data yet. Start practicing!', canvas.width / 2, canvas.height / 2);
        return;
    }

    // Draw simple line chart
    const padding = 40;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    const maxWpm = Math.max(...data.map(d => d.avgWpm), 100);
    const minWpm = Math.min(...data.map(d => d.avgWpm), 0);

    // Draw axes
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height + padding);
    ctx.lineTo(width + padding, height + padding);
    ctx.stroke();

    // Draw data line
    ctx.strokeStyle = 'var(--theme-primary)';
    ctx.lineWidth = 3;
    ctx.beginPath();

    data.forEach((point, i) => {
        const x = padding + (i / (data.length - 1)) * width;
        const y = padding + height - ((point.avgWpm - minWpm) / (maxWpm - minWpm)) * height;

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });

    ctx.stroke();

    // Draw points
    ctx.fillStyle = 'var(--theme-primary)';
    data.forEach((point, i) => {
        const x = padding + (i / (data.length - 1)) * width;
        const y = padding + height - ((point.avgWpm - minWpm) / (maxWpm - minWpm)) * height;

        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fill();
    });

    // Labels
    ctx.fillStyle = 'var(--text-secondary)';
    ctx.font = '12px Inter';
    ctx.textAlign = 'right';
    ctx.fillText(`${maxWpm} WPM`, padding - 5, padding);
    ctx.fillText(`${minWpm} WPM`, padding - 5, height + padding);
}

function renderKeyboardHeatmap() {
    const container = document.getElementById('keyboardHeatmap');
    if (!container) return;

    const heatmapData = analytics.getHeatMapData();
    const keyboard = [
        ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
        ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
        ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
    ];

    container.innerHTML = '';
    container.style.cssText = 'display: flex; flex-direction: column; gap: 0.5rem; align-items: center;';

    keyboard.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.style.cssText = 'display: flex; gap: 0.5rem;';

        row.forEach(key => {
            const keyDiv = document.createElement('div');
            const data = heatmapData[key.toLowerCase()] || { intensity: 0, accuracy: 100 };

            // Color based on speed (green = fast, red = slow)
            const hue = 120 - (data.intensity * 120); // 120 (green) to 0 (red)

            keyDiv.style.cssText = `
                width: 50px;
                height: 50px;
                border-radius: 8px;
                background: hsl(${hue}, 70%, 50%);
                display: flex;
                align-items: center;
                justify-content: center;
                font-weight: 700;
                font-size: 1.2rem;
                color: white;
                cursor: pointer;
                transition: transform 0.2s;
            `;
            keyDiv.textContent = key;
            keyDiv.title = `${key}: ${Math.round(data.accuracy)}% accuracy`;

            keyDiv.addEventListener('mouseenter', () => {
                keyDiv.style.transform = 'scale(1.1)';
            });
            keyDiv.addEventListener('mouseleave', () => {
                keyDiv.style.transform = 'scale(1)';
            });

            rowDiv.appendChild(keyDiv);
        });

        container.appendChild(rowDiv);
    });
}

function renderWeakKeys() {
    const slowestKeys = analytics.getSlowestKeys(5);
    const errorProneKeys = analytics.getErrorProneKeys(5);

    const slowestContainer = document.getElementById('slowestKeys');
    const errorContainer = document.getElementById('errorProneKeys');

    if (slowestContainer) {
        slowestContainer.innerHTML = slowestKeys.length === 0
            ? '<p class="empty-state">No data yet</p>'
            : slowestKeys.map(k => `
                <div class="key-item">
                    <span class="key-char">${k.key.toUpperCase()}</span>
                    <span class="key-stat">${k.avgTime}ms avg</span>
                </div>
            `).join('');
    }

    if (errorContainer) {
        errorContainer.innerHTML = errorProneKeys.length === 0
            ? '<p class="empty-state">No errors yet!</p>'
            : errorProneKeys.map(k => `
                <div class="key-item">
                    <span class="key-char">${k.key.toUpperCase()}</span>
                    <span class="key-stat error">${k.errorRate}% errors</span>
                </div>
            `).join('');
    }
}

function renderPracticeCalendar() {
    const container = document.getElementById('practiceCalendar');
    if (!container) return;

    const calendarData = analytics.getCalendarData(365);
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(startDate.getDate() - 365);

    container.innerHTML = '';
    container.style.cssText = 'display: grid; grid-template-columns: repeat(53, 1fr); gap: 3px; max-width: 800px;';

    for (let i = 0; i < 365; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const dateStr = date.toISOString().split('T')[0];
        const minutes = calendarData[dateStr] || 0;

        const cell = document.createElement('div');
        const intensity = Math.min(minutes / 60, 1); // 0-1 scale
        const opacity = intensity === 0 ? 0.1 : 0.3 + (intensity * 0.7);

        cell.style.cssText = `
            width: 12px;
            height: 12px;
            background: var(--theme-primary);
            opacity: ${opacity};
            border-radius: 2px;
            cursor: pointer;
        `;
        cell.title = `${dateStr}: ${minutes} minutes`;

        container.appendChild(cell);
    }
}

// ===============================================
// Achievements System
// ===============================================

function initAchievements() {
    updateAchievements();
}

function updateAchievements() {
    const grid = document.getElementById('achievementsGrid');
    if (!grid) return;

    const unlockedAchievements = analytics.getUnlockedAchievements();

    document.getElementById('unlockedCount').textContent = unlockedAchievements.length;
    document.getElementById('totalCount').textContent = achievements.length;

    grid.innerHTML = '';

    achievements.forEach(achievement => {
        const isUnlocked = unlockedAchievements.some(a => a.id === achievement.id);

        const card = document.createElement('div');
        card.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;

        card.innerHTML = `
            <div class="achievement-icon">${isUnlocked ? achievement.icon : '🔒'}</div>
            <div class="achievement-name">${achievement.name}</div>
            <div class="achievement-description">${achievement.description}</div>
            ${!isUnlocked ? `<div class="achievement-progress">Progress: 0/${achievement.requirement}</div>` : ''}
        `;

        grid.appendChild(card);
    });

    // Update recent achievements
    const recentContainer = document.getElementById('recentAchievements');
    if (recentContainer && unlockedAchievements.length > 0) {
        recentContainer.innerHTML = unlockedAchievements.slice(-3).reverse().map(a => `
            <div class="recent-achievement">
                <span class="achievement-icon">${a.icon}</span>
                <span class="achievement-name">${a.name}</span>
            </div>
        `).join('');
    }
}

// Check for new achievements after practice session
const originalCompletePracticeRound = completePracticeRound;
completePracticeRound = function () {
    originalCompletePracticeRound();

    // Record analytics
    analytics.recordSession({
        wpm: state.practice.wpm,
        accuracy: state.practice.accuracy,
        duration: (Date.now() - state.practice.startTime) / 1000 / 60, // minutes
        errors: state.practice.errors,
        mode: state.practiceMode,
        textLength: state.practice.text.length
    });

    // Check for achievements
    const newAchievements = analytics.checkAchievements({
        maxWpm: Math.max(state.user.averageWpm, state.practice.wpm),
        maxAccuracy: Math.max(state.user.averageAccuracy, state.practice.accuracy),
        coins: state.user.coins,
        totalMinutes: state.user.totalMinutes
    });

    // Show achievement notifications
    newAchievements.forEach(achievement => {
        setTimeout(() => {
            showCelebration(`🏅 Achievement Unlocked: ${achievement.name}!`);
            playSound('complete');
        }, 500);
    });

    updateAchievements();
};

console.log('✅ Advanced features loaded successfully!');
