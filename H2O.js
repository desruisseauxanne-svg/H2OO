// Thème sombre avec mémoire locale
(function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') document.documentElement.classList.add('dark');
    updateThemeButton();

    document.getElementById('themeToggle').addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeButton();
    });

    function updateThemeButton() {
        const btn = document.getElementById('themeToggle');
        const isDark = document.documentElement.classList.contains('dark');
        btn.textContent = isDark ? 'Thème clair' : 'Thème sombre';
    }
})();

// Défilement fluide pour la navigation
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Compteurs animés dans l'introduction
function animateCounters() {
    const els = document.querySelectorAll('.stat-value');
    els.forEach(el => {
        const target = parseFloat(el.dataset.target);
        let current = 0;
        const duration = 1200; // ms
        const start = performance.now();

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const value = (target * progress);
            el.textContent = Number.isInteger(target) ? Math.round(value) : value.toFixed(1);
            if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
    });
}
window.addEventListener('load', animateCounters);

// Onglets "Utilisations de l’eau"
(function initTabs() {
    const tabs = Array.from(document.querySelectorAll('.tab'));
    const panels = Array.from(document.querySelectorAll('.tab-panel'));

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const controls = tab.getAttribute('aria-controls');

            tabs.forEach(t => {
                t.classList.toggle('active', t === tab);
                t.setAttribute('aria-selected', t === tab ? 'true' : 'false');
            });

            panels.forEach(p => p.classList.toggle('active', p.id === controls));
        });
    });
})();

// Quiz
(function initQuiz() {
    const form = document.getElementById('quizForm');
    const result = document.getElementById('quizResult');

    form.addEventListener('submit', e => {
        e.preventDefault();
        const q1 = form.q1.value;
        const q2 = form.q2.value;
        const q3 = form.q3.value;

        let score = 0;
        if (q1 === '71') score++;
        if (q2 === '2.5') score++;
        if (q3 === 'fuites') score++;

        const messages = [
            'Pas mal ! Revois les points clés et retente ta chance.',
            'Bien joué ! Tu maîtrises déjà les bases.',
            'Excellent ! Tu connais l’essentiel sur l’eau.'
        ];

        result.textContent = `Score: ${score}/3 — ${messages[score > 0 ? score - 1 : 0]}`;
        result.style.color = score === 3 ? 'var(--primary-600)' : 'inherit';
    });
})();
