const savedTheme = localStorage.getItem('theme');
const savedFont = localStorage.getItem('font');

if (savedTheme) {
    document.body.setAttribute('data-theme', savedTheme);
} else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = prefersDark ? 'dark' : 'light';
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

if (savedFont) {
    document.body.setAttribute('data-font', savedFont);
} else {
    document.body.setAttribute('data-font', 'sans-serif');
    localStorage.setItem('font', 'sans-serif');
}