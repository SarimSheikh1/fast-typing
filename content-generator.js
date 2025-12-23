// ===============================================
// Content Generator - TypeBlitz
// Provides various typing content sources
// ===============================================

// Code Snippets Database
// ENHANCED Code Snippets with Advanced Content
const codeSnippets = {
    python: [
        { title: "Async Python API", code: `async def fetch_user_data(user_id: int) -> dict:\n    async with aiohttp.ClientSession() as session:\n        response = await session.get(f'/api/users/{user_id}')\n        return await response.json()` },
        { title: "Python Decorator Pattern", code: `def timing_decorator(func):\n    @functools.wraps(func)\n    def wrapper(*args, **kwargs):\n        start = time.perf_counter()\n        result = func(*args, **kwargs)\n        print(f'{func.__name__} took {time.perf_counter() - start:.4f}s')\n        return result\n    return wrapper` },
        { title: "List Comprehension Advanced", code: `matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nflattened = [num for row in matrix for num in row if num % 2 == 0]\nprint(flattened)  # [2, 4, 6, 8]` },
        { title: "Python Context Manager", code: `class DatabaseConnection:\n    def __enter__(self):\n        self.conn = psycopg2.connect('postgresql://localhost/db')\n        return self.conn\n    \n    def __exit__(self, exc_type, exc_val, exc_tb):\n        self.conn.close()` },
        { title: "Lambda & Map", code: `prices = [100, 250, 75, 320]\ndiscounted = list(map(lambda x: x * 0.8, prices))\nprint(discounted)  # 20% discount applied` },
        { title: "Regex Pattern Matching", code: `import re\npattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'\nemail = 'user@example.com'\nif re.match(pattern, email): print('Valid!')` }
    ],
    javascript: [
        { title: "Async/Await Pattern", code: `const getData = async () => {\n    try {\n        const response = await fetch('/api/data');\n        const json = await response.json();\n        return json.results.map(({ id, name }) => ({ id, name }));\n    } catch (error) {\n        console.error('Fetch failed:', error);\n    }\n};` },
        { title: "Advanced Array Reduce", code: `const transactions = [{amount: 100}, {amount: -50}, {amount: 200}];\nconst balance = transactions.reduce((acc, {amount}) => acc + amount, 0);\nconsole.log(\`Balance: \$\${balance}\`);` },
        { title: "Debounce Function", code: `const debounce = (fn, delay = 300) => {\n    let timeoutId;\n    return (...args) => {\n        clearTimeout(timeoutId);\n        timeoutId = setTimeout(() => fn.apply(this, args), delay);\n    };\n};` },
        { title: "Object Deep Clone", code: `const deepClone = (obj) => {\n    if (obj === null || typeof obj !== 'object') return obj;\n    const clone = Array.isArray(obj) ? [] : {};\n    for (let key in obj) {\n        clone[key] = deepClone(obj[key]);\n    }\n    return clone;\n};` },
        { title: "Promise.all Pattern", code: `const fetchMultiple = async (urls) => {\n    const promises = urls.map(url => fetch(url).then(r => r.json()));\n    const results = await Promise.all(promises);\n    return results;\n};` },
        { title: "Closure Example", code: `function createCounter(initial = 0) {\n    let count = initial;\n    return {\n        incre ment: () => ++count,\n        decrement: () => --count,\n        getValue: () => count\n    };\n}` }
    ],
    html: [
        { title: "HTML5 Semantic", code: `<article>\n    <header>\n        <h1>TypeBlitz Tutorial</h1>\n        <time datetime="2024-12-22">December 22, 2024</time>\n    </header>\n    <section>\n        <p>Learn typing with gamification...</p>\n    </section>\n    <footer>&copy; 2024 TypeBlitz</footer>\n</article>` },
        { title: "Form Validation HTML", code: `<form novalidate>\n    <input type="email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" required>\n    <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}">\n    <button type="submit">Submit</button>\n</form>` },
        { title: "Canvas Element", code: `<canvas id="myCanvas" width="800" height="600"></canvas>\n<script>\n    const ctx = document.getElementById('myCanvas').getContext('2d');\n    ctx.fillStyle = '#FF6B35';\n    ctx.fillRect(50, 50, 200, 100);\n</script>` }
    ],
    css: [
        { title: "CSS Grid Advanced", code: `.container {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n    grid-gap: 2rem;\n    grid-auto-flow: dense;\n}` },
        { title: "CSS Animation Complex", code: `@keyframes slideInRotate {\n    0% { transform: translateX(-100%) rotate(-180deg); opacity: 0; }\n    100% { transform: translateX(0) rotate(0deg); opacity: 1; }\n}\n.animated { animation: slideInRotate 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55); }` },
        { title: "CSS Variables", code: `:root {\n    --primary: #FF6B35;\n    --spacing: clamp(1rem, 2vw, 3rem);\n}\n.button {\n    background: var(--primary);\n    padding: var(--spacing);\n}` },
        { title: "CSS Filter Effects", code: `.image {\n    filter: contrast(120%) brightness(110%) saturate(1.3);\n    transition: filter 0.3s ease;\n}\n.image:hover {\n    filter: contrast(100%) brightness(100%) saturate(1);\n}` }
    ]
};

// Quotes Database
// ENHANCED Quotes with Complex Punctuation & Characters
const quotes = [
    { text: "The only way to do great work is to love what you do—passion drives excellence.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader & a follower; creativity separates legends from the masses.", author: "Steve Jobs" },
    { text: "'Success is not final, failure is not fatal: it is the courage to continue that counts,' proclaimed the statesman.", author: "Winston Churchill" },
    { text: "The future (2025+) belongs to those who believe in the beauty of their dreams & aspirations!", author: "Eleanor Roosevelt" },
    { text: "It doesn't matter how slowly you go—as long as you don't stop moving forward progressively.", author: "Confucius" },
    { text: "Everything you've ever wanted is on the other side of fear; courage unlocks possibility.", author: "George Addair" },
    { text: "Believe you can @ 100% effort, and you're halfway there already—mindset matters!", author: "Theodore Roosevelt" },
    { text: "The only 'impossible' journey is the one you never begin—take that first step today.", author: "Tony Robbins" },
    { text: "Act as if what you do makes a difference. It does (always)—every action counts.", author: "William James" },
    { text: "Success ≠ how high you've climbed, but how you make a positive difference to the world.", author: "Roy T. Bennett" },
    { text: "What lies behind us & what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
    { text: "'The best time to plant a tree was 20 years ago. The second-best time is now!'—ancient wisdom.", author: "Chinese Proverb" },
    { text: "Your time is limited (24/7/365), so don't waste it living someone else's life—be authentic.", author: "Steve Jobs" },
    { text: "The way to get started is to quit talking & begin doing—action > words every time.", author: "Walt Disney" },
    { text: "Don't watch the clock; do what it does. Keep going (tick-tock) relentlessly forward!", author: "Sam Levenson" },
    { text: "The future (tomorrow, next year, 2030) depends entirely on what you do today—choose wisely.", author: "Mahatma Gandhi" },
    { text: "It's not whether you get knocked down—it's whether you get up & keep fighting!", author: "Vince Lombardi" },
    { text: "We generate fears while we sit @ home; we overcome them by taking decisive action.", author: "Dr. Henry Link" },
    { text: "'Whether you think you can or you think you can't, you're right,'—mindset determines reality.", author: "Henry Ford" },
    { text: "The only person you're destined to become is the person you decide to be (100% your choice).", author: "Ralph Waldo Emerson" },
    { text: "'I think, therefore I am' (Cogito, ergo sum)—Descartes' foundational philosophical insight.", author: "René Descartes" },
    { text: "In the middle of difficulty lies opportunity—every challenge contains hidden potential & growth.", author: "Albert Einstein" },
    { text: "The two most important days in your life are: the day you're born & the day you find out why.", author: "Mark Twain" },
    { text: "'To be, or not to be: that is the question'—Shakespeare's timeless existential contemplation.", author: "William Shakespeare" },
    { text: "Twenty years from now you'll be more disappointed by what you didn't do than what you did.", author: "Mark Twain" },
    { text: "The reasonable man adapts himself to the world; the unreasonable one persists in trying to adapt the world to himself. Therefore, all progress depends on the unreasonable man.", author: "George Bernard Shaw" },
    { text: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel—emotional impact lasts forever.", author: "Maya Angelou" },
    { text: "It is not the critic who counts; not the man who points out how the strong man stumbles... The credit belongs to the man who is actually in the arena (fighting, striving, daring greatly).", author: "Theodore Roosevelt" },
    { text: "We choose to go to the Moon in this decade & do the other things, not because they are easy, but because they are hard—challenge drives innovation!", author: "John F. Kennedy" },
    { text: "'Not all those who wander are lost'—sometimes the most unconventional paths lead to extraordinary destinations & profound self-discovery.", author: "J.R.R. Tolkien" }
];

// News-style articles (simulated)
// ENHANCED News Articles with Complex Content
const newsArticles = [
    {
        title: "AI Revolution: GPT-4 & Beyond",
        content: "Artificial intelligence continues to reshape industries worldwide @ an unprecedented pace. From healthcare diagnostics (accuracy >95%) to financial fraud detection, machine learning algorithms enable efficiency impossible just 5 years ago. OpenAI's GPT-4, Google's Gemini, and Anthropic's Claude demonstrate remarkable natural language understanding—transforming customer service, content creation, and software development. Experts predict AI will create 97 million new jobs by 2025 while displacing 85 million roles; however, the net effect remains decidedly positive for global employment & economic growth."
    },
    {
        title: "Climate Crisis: 2030 Targets & Renewable Energy Surge",
        content: "Scientists report breakthrough progress in renewable energy adoption—solar installations increased 280% since 2020, while wind power capacity doubled. Total global renewable generation now exceeds 3,800 TWh annually (terawatt-hours), representing 29% of worldwide electricity production. Levelized Cost of Energy (LCOE) for solar dropped below $0.03/kWh in optimal locations, undercutting coal & natural gas economically. The Paris Agreement's goal of limiting warming to 1.5°C remains challenging; nevertheless, 195+ nations have committed to ambitious Net-Zero targets by 2050. Carbon capture technologies, battery storage innovations ($150/kWh costs), and electric vehicle adoption (25% market share by 2030) accelerate decarbonization efforts globally."
    },
    {
        title: "Digital Economy: E-Commerce, Web3, & The Metaverse",
        content: "E-commerce platforms generated $5.7 trillion in revenue (2023), representing 22% of total retail sales worldwide—a figure projected to reach 30% by 2027. Consumer behavior has fundamentally shifted: 73% prefer online shopping for convenience, competitive pricing & vast selection. Digital payment ecosystems (PayPal, Stripe, Square, cryptocurrency wallets) processed $9.46 trillion in transactions last year. Emerging Web3 technologies—blockchain, NFTs (non-fungible tokens), decentralized finance (DeFi)—promise to revolutionize ownership, identity verification, and financial services. The 'metaverse' concept attracts $120 billion in corporate investments; however, widespread adoption faces substantial technological & user-experience hurdles before achieving mainstream viability @ scale."
    },
    {
        title: "EdTech Transformation: MOOCs, AI Tutors, & Gamification",
        content: "Online learning platforms (Coursera, edX, Udacity, Khan Academy) have democratized education access for 220+ million students globally—regardless of geographic location, socioeconomic status, or institutional affiliation. Top universities offer 15,000+ courses online; completion rates (typically 5-15%) improve dramatically through AI-powered personalized learning paths, adaptive assessments, and intelligent tutoring systems. Gamification elements (badges, leaderboards, progress bars, achievements) increase engagement by 40-60%. Virtual reality (VR) simulations enable hands-on practice in medicine, engineering, and aviation training without physical equipment costs or safety risks. The global EdTech market, valued at $254 billion in 2023, is projected to reach $600 billion by 2028—transforming how humanity learns & develops expertise across the lifespan."
    },
    {
        title: "Mental Health Crisis & Digital Wellness Solutions (2024 Analysis)",
        content: "Mental health awareness has reached unprecedented levels; approximately 1 in 4 adults (25%) experience diagnosable mental health conditions annually—depression, anxiety disorders, PTSD, and burnout. Meditation apps (Headspace, Calm, Insight Timer) surpassed 100 million active users; mindfulness practices demonstrate clinically significant improvements in stress reduction, emotional regulation & cognitive performance. Wearable fitness trackers (Apple Watch, Fitbit, WHOOP) monitor heart rate variability (HRV), sleep quality, and activity levels—providing objective health data. Teletherapy platforms (BetterHelp, Talkspace) connect patients with licensed therapists remotely, reducing barriers to treatment access by 300%. Healthcare providers increasingly adopt evidence-based digital therapeutics: CBT apps, biofeedback systems, and AI-driven symptom monitoring integrate seamlessly into patient care workflows—improving outcomes while reducing costs by 15-30%."
    },
    {
        title: "Cryptocurrency Markets: Bitcoin, Ethereum, & Regulatory Challenges",
        content: "Cryptocurrency markets exhibit extreme volatility; Bitcoin (BTC) fluctuates between $25,000-$65,000 quarterly, while Ethereum (ETH) ranges from $1,600-$4,200 depending on market sentiment, regulatory announcements, and macroeconomic conditions. Total crypto market capitalization peaked at $3 trillion (November 2021) before correcting to $1.2 trillion—demonstrating speculative bubbles' inherent instability. Blockchain technology's fundamental innovation—decentralized, transparent, immutable ledgers—powers applications beyond currency: supply chain tracking, smart contracts (Ethereum, Cardano, Solana), decentralized finance (DeFi) protocols, and non-fungible tokens (NFTs). Governments worldwide struggle to balance innovation encouragement with consumer protection: the EU's MiCA regulation, SEC enforcement actions, and China's cryptocurrency ban illustrate divergent regulatory approaches shaping this nascent industry's future trajectory dramatically."
    }
];

// Achievement Definitions
const achievements = [
    { id: 'first_session', name: 'First Steps', description: 'Complete your first typing session', icon: '🎯', requirement: 1, type: 'sessions' },
    { id: 'speed_demon', name: 'Speed Demon', description: 'Reach 80 WPM', icon: '⚡', requirement: 80, type: 'wpm' },
    { id: 'accuracy_master', name: 'Accuracy Master', description: 'Achieve 98% accuracy', icon: '🎯', requirement: 98, type: 'accuracy' },
    { id: 'coin_collector', name: 'Coin Collector', description: 'Earn your first coin', icon: '🪙', requirement: 1, type: 'coins' },
    { id: 'practice_warrior', name: 'Practice Warrior', description: 'Practice for 10 hours total', icon: '💪', requirement: 600, type: 'minutes' },
    { id: 'century_club', name: 'Century Club', description: 'Reach 100 WPM', icon: '🚀', requirement: 100, type: 'wpm' },
    { id: 'perfect_round', name: 'Perfectionist', description: 'Complete a round with 100% accuracy', icon: '💎', requirement: 100, type: 'perfect' },
    { id: 'streak_keeper', name: 'Streak Keeper', description: 'Practice 7 days in a row', icon: '🔥', requirement: 7, type: 'streak' },
    { id: 'code_master', name: 'Code Master', description: 'Complete 50 code typing sessions', icon: '👨‍💻', requirement: 50, type: 'code' },
    { id: 'quote_enthusiast', name: 'Quote Enthusiast', description: 'Type 100 inspirational quotes', icon: '💭', requirement: 100, type: 'quotes' },
    { id: 'marathon_typer', name: 'Marathon Typer', description: 'Practice for 100 hours', icon: '🏃', requirement: 6000, type: 'minutes' },
    { id: 'social_butterfly', name: 'Social Butterfly', description: 'Add 10 friends', icon: '🦋', requirement: 10, type: 'friends' },
    { id: 'champion', name: 'Champion', description: 'Win 50 1v1 races', icon: '🏆', requirement: 50, type: 'races' },
    { id: 'coin_millionaire', name: 'Coin Millionaire', description: 'Earn 100 coins total', icon: '💰', requirement: 100, type: 'coins_total' },
    { id: 'early_bird', name: 'Early Bird', description: 'Practice before 8 AM', icon: '🌅', requirement: 1, type: 'early' }
];

// Generate random typing text
function generateRandomText(category = 'general', difficulty = 'medium') {
    const texts = {
        general: [
            "The art of typing fast comes from consistent practice and proper technique. Keep your fingers on the home row and maintain good posture.",
            "Technology has transformed how we communicate and work. Fast typing is an essential skill in the digital age.",
            "Practice makes perfect. Set aside time each day to improve your typing skills and watch your speed increase.",
            "Focus on accuracy first, then gradually increase your speed. Making fewer mistakes will improve your overall typing efficiency.",
            "Proper finger placement and technique are more important than raw speed when learning to type effectively."
        ],
        easy: [
            "The cat sat on the mat. The dog played in the yard. The sun was shining bright.",
            "Today is a good day. Practice makes you better. Keep trying your best.",
            "Type each word carefully. Speed will come with time. Focus on being accurate."
        ],
        hard: [
            "Sophisticated algorithms enable unprecedented computational capabilities, revolutionizing industries through artificial intelligence and machine learning paradigms.",
            "Entrepreneurs leverage innovative technologies to disrupt traditional business models, creating sustainable competitive advantages in dynamic market environments.",
            "Comprehensive analysis of multifaceted problems requires synthesizing diverse perspectives and implementing systematic methodological approaches."
        ]
    };

    const categoryTexts = texts[category] || texts.general;
    return categoryTexts[Math.floor(Math.random() * categoryTexts.length)];
}

// Get code snippet
function getCodeSnippet(language = 'javascript') {
    const snippets = codeSnippets[language] || codeSnippets.javascript;
    const snippet = snippets[Math.floor(Math.random() * snippets.length)];
    return snippet;
}

// Get random quote
function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

// Get news article
function getNewsArticle() {
    return newsArticles[Math.floor(Math.random() * newsArticles.length)];
}

// Export for use in main app
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        codeSnippets,
        quotes,
        newsArticles,
        achievements,
        generateRandomText,
        getCodeSnippet,
        getRandomQuote,
        getNewsArticle
    };
}
