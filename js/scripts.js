// Keep the footer year current
document.getElementById('year').textContent = new Date().getFullYear();

// Light / night toggle. The initial theme is set inline in <head>.
(function () {
    var root = document.documentElement;
    var button = document.getElementById('theme-toggle');
    var media = matchMedia('(prefers-color-scheme: dark)');

    function saved() {
        try { return localStorage.getItem('theme'); } catch (e) { return null; }
    }

    function apply(theme) {
        root.dataset.theme = theme;
        button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }

    apply(root.dataset.theme || (media.matches ? 'dark' : 'light'));

    button.addEventListener('click', function () {
        var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
        apply(next);
        try { localStorage.setItem('theme', next); } catch (e) {}
    });

    // Follow the system while the visitor hasn't picked a theme
    media.addEventListener('change', function (e) {
        if (!saved()) apply(e.matches ? 'dark' : 'light');
    });
})();
