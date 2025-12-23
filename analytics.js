// ===============================================
// Analytics Engine - TypeBlitz
// Track, analyze, and visualize typing performance
// ===============================================

class AnalyticsEngine {
    constructor() {
        this.data = {
            sessions: [],
            keyStats: {},
            dailyPractice: {},
            wpmHistory: [],
            accuracyHistory: [],
            achievements: []
        };
        this.loadData();
    }

    // Load analytics data from localStorage
    loadData() {
        const saved = localStorage.getItem('typeblitz_analytics');
        if (saved) {
            Object.assign(this.data, JSON.parse(saved));
        }
    }

    // Save analytics data
    saveData() {
        localStorage.setItem('typeblitz_analytics', JSON.stringify(this.data));
    }

    // Record a typing session
    recordSession(sessionData) {
        const session = {
            timestamp: Date.now(),
            date: new Date().toISOString().split('T')[0],
            wpm: sessionData.wpm,
            accuracy: sessionData.accuracy,
            duration: sessionData.duration,
            errors: sessionData.errors,
            mode: sessionData.mode || 'practice',
            textLength: sessionData.textLength
        };

        this.data.sessions.push(session);

        // Update daily practice
        const date = session.date;
        this.data.dailyPractice[date] = (this.data.dailyPractice[date] || 0) + session.duration;

        // Update WPM history
        this.data.wpmHistory.push({ timestamp: session.timestamp, value: session.wpm });

        // Update accuracy history
        this.data.accuracyHistory.push({ timestamp: session.timestamp, value: session.accuracy });

        // Keep only last 1000 sessions
        if (this.data.sessions.length > 1000) {
            this.data.sessions = this.data.sessions.slice(-1000);
        }

        this.saveData();
    }

    // Record individual keystroke data
    recordKeystroke(key, time, isCorrect) {
        if (!this.data.keyStats[key]) {
            this.data.keyStats[key] = {
                count: 0,
                errors: 0,
                totalTime: 0,
                avgTime: 0
            };
        }

        const stats = this.data.keyStats[key];
        stats.count++;
        stats.totalTime += time;
        stats.avgTime = stats.totalTime / stats.count;

        if (!isCorrect) {
            stats.errors++;
        }

        this.saveData();
    }

    // Get performance summary for a time period
    getSummary(days = 7) {
        const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
        const recentSessions = this.data.sessions.filter(s => s.timestamp >= cutoff);

        if (recentSessions.length === 0) {
            return {
                avgWpm: 0,
                avgAccuracy: 0,
                totalMinutes: 0,
                sessionCount: 0,
                improvement: 0
            };
        }

        const avgWpm = recentSessions.reduce((sum, s) => sum + s.wpm, 0) / recentSessions.length;
        const avgAccuracy = recentSessions.reduce((sum, s) => sum + s.accuracy, 0) / recentSessions.length;
        const totalMinutes = recentSessions.reduce((sum, s) => sum + s.duration, 0);

        // Calculate improvement
        const firstHalf = recentSessions.slice(0, Math.floor(recentSessions.length / 2));
        const secondHalf = recentSessions.slice(Math.floor(recentSessions.length / 2));

        const firstAvg = firstHalf.reduce((sum, s) => sum + s.wpm, 0) / firstHalf.length || 0;
        const secondAvg = secondHalf.reduce((sum, s) => sum + s.wpm, 0) / secondHalf.length || 0;
        const improvement = secondAvg - firstAvg;

        return {
            avgWpm: Math.round(avgWpm),
            avgAccuracy: Math.round(avgAccuracy),
            totalMinutes: Math.round(totalMinutes),
            sessionCount: recentSessions.length,
            improvement: Math.round(improvement)
        };
    }

    // Get keyboard heat map data
    getHeatMapData() {
        const heatMap = {};
        const maxTime = Math.max(...Object.values(this.data.keyStats).map(s => s.avgTime));

        for (const [key, stats] of Object.entries(this.data.keyStats)) {
            heatMap[key] = {
                intensity: stats.avgTime / maxTime, // 0-1 scale
                accuracy: ((stats.count - stats.errors) / stats.count) * 100,
                avgTime: stats.avgTime,
                errorRate: (stats.errors / stats.count) * 100
            };
        }

        return heatMap;
    }

    // Get slowest keys
    getSlowestKeys(count = 5) {
        const sorted = Object.entries(this.data.keyStats)
            .sort((a, b) => b[1].avgTime - a[1].avgTime)
            .slice(0, count);

        return sorted.map(([key, stats]) => ({
            key,
            avgTime: Math.round(stats.avgTime),
            errorRate: Math.round((stats.errors / stats.count) * 100)
        }));
    }

    // Get most error-prone keys
    getErrorProneKeys(count = 5) {
        const sorted = Object.entries(this.data.keyStats)
            .filter(([_, stats]) => stats.count > 10) // Minimum sample size
            .sort((a, b) => (b[1].errors / b[1].count) - (a[1].errors / a[1].count))
            .slice(0, count);

        return sorted.map(([key, stats]) => ({
            key,
            errorRate: Math.round((stats.errors / stats.count) * 100),
            totalErrors: stats.errors
        }));
    }

    // Get practice streak
    getPracticeStreak() {
        const today = new Date().toISOString().split('T')[0];
        let streak = 0;
        let currentDate = new Date();

        while (true) {
            const dateStr = currentDate.toISOString().split('T')[0];
            if (this.data.dailyPractice[dateStr]) {
                streak++;
                currentDate.setDate(currentDate.getDate() - 1);
            } else if (dateStr === today) {
                // Haven't practiced today yet, but count yesterday
                currentDate.setDate(currentDate.getDate() - 1);
            } else {
                break;
            }
        }

        return streak;
    }

    // Get WPM chart data for specified period
    getWpmChartData(days = 30) {
        const cutoff = Date.now() - (days * 24 * 60 * 60 * 1000);
        const data = this.data.wpmHistory.filter(d => d.timestamp >= cutoff);

        // Group by day and average
        const grouped = {};
        data.forEach(point => {
            const date = new Date(point.timestamp).toISOString().split('T')[0];
            if (!grouped[date]) {
                grouped[date] = [];
            }
            grouped[date].push(point.value);
        });

        return Object.entries(grouped).map(([date, values]) => ({
            date,
            avgWpm: Math.round(values.reduce((a, b) => a + b, 0) / values.length),
            maxWpm: Math.max(...values),
            minWpm: Math.min(...values)
        })).sort((a, b) => a.date.localeCompare(b.date));
    }

    // Get practice calendar data (GitHub-style)
    getCalendarData(days = 365) {
        const calendar = {};
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        for (let i = 0; i < days; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            const dateStr = date.toISOString().split('T')[0];
            calendar[dateStr] = this.data.dailyPractice[dateStr] || 0;
        }

        return calendar;
    }

    // Check and unlock achievements
    checkAchievements(userStats) {
        const unlocked = [];

        achievements.forEach(achievement => {
            // Skip if already unlocked
            if (this.data.achievements.includes(achievement.id)) {
                return;
            }

            let shouldUnlock = false;

            switch (achievement.type) {
                case 'sessions':
                    shouldUnlock = this.data.sessions.length >= achievement.requirement;
                    break;
                case 'wpm':
                    shouldUnlock = userStats.maxWpm >= achievement.requirement;
                    break;
                case 'accuracy':
                    shouldUnlock = userStats.maxAccuracy >= achievement.requirement;
                    break;
                case 'coins':
                    shouldUnlock = userStats.coins >= achievement.requirement;
                    break;
                case 'minutes':
                    shouldUnlock = userStats.totalMinutes >= achievement.requirement;
                    break;
                case 'streak':
                    shouldUnlock = this.getPracticeStreak() >= achievement.requirement;
                    break;
                case 'perfect':
                    shouldUnlock = this.data.sessions.some(s => s.accuracy === 100);
                    break;
            }

            if (shouldUnlock) {
                this.data.achievements.push(achievement.id);
                unlocked.push(achievement);
            }
        });

        if (unlocked.length > 0) {
            this.saveData();
        }

        return unlocked;
    }

    // Get all unlocked achievements
    getUnlockedAchievements() {
        return achievements.filter(a => this.data.achievements.includes(a.id));
    }

    // Generate weekly report
    generateWeeklyReport() {
        const summary = this.getSummary(7);
        const slowKeys = this.getSlowestKeys(3);
        const errorKeys = this.getErrorProneKeys(3);
        const streak = this.getPracticeStreak();

        return {
            summary,
            slowKeys,
            errorKeys,
            streak,
            message: this.generateReportMessage(summary, streak)
        };
    }

    generateReportMessage(summary, streak) {
        let message = `Great week! `;

        if (summary.improvement > 5) {
            message += `Your speed improved by ${summary.improvement} WPM! 🚀 `;
        } else if (summary.improvement > 0) {
            message += `You're making steady progress. Keep it up! 💪 `;
        }

        if (summary.avgAccuracy >= 95) {
            message += `Your accuracy is excellent at ${summary.avgAccuracy}%! 🎯 `;
        }

        if (streak >= 7) {
            message += `Amazing ${streak}-day streak! 🔥`;
        }

        return message;
    }

    // Clear all analytics data
    clearData() {
        this.data = {
            sessions: [],
            keyStats: {},
            dailyPractice: {},
            wpmHistory: [],
            accuracyHistory: [],
            achievements: []
        };
        this.saveData();
    }
}

// Create global analytics instance
const analytics = new AnalyticsEngine();
