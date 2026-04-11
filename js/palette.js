import { storage } from './storage.js';
import { bootstrap } from './bootstrap.js';

const THEME_COLOR = {
    default: '#212529',
    charcoal: '#121212',
    plum: '#1a0f14',
    forest: '#0f1612',
    midnight: '#0f1419',
    ink: '#0e0e10',
};

const store = storage('palette');

export const palette = (() => {

    const syncMeta = () => {
        const meta = document.querySelector('meta[name="theme-color"]');
        if (!meta) {
            return;
        }
        const mode = document.documentElement.getAttribute('data-bs-theme');
        if (mode !== 'dark') {
            meta.setAttribute('content', '#f8f9fa');
            return;
        }
        const id = document.documentElement.getAttribute('data-palette') || 'plum';
        meta.setAttribute('content', THEME_COLOR[id] || THEME_COLOR.default);
    };

    const apply = () => {
        const id = store.has('choice') ? store.get('choice') : 'plum';
        document.documentElement.setAttribute('data-palette', id);
        syncMeta();
        document.querySelectorAll('[data-palette-option]').forEach((btn) => {
            const on = btn.getAttribute('data-palette-option') === id;
            btn.classList.toggle('active', on);
            btn.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
    };

    const set = (id) => {
        store.set('choice', id);
        apply();
        const panel = document.getElementById('offcanvasPalette');
        if (panel && bootstrap?.Offcanvas) {
            bootstrap.Offcanvas.getOrCreateInstance(panel).hide();
        }
    };

    const init = () => {
        if (!store.has('choice')) {
            store.set('choice', 'plum');
        }
        apply();
    };

    const openPanel = () => {
        const panel = document.getElementById('offcanvasPalette');
        if (!panel || !bootstrap?.Offcanvas) {
            return;
        }
        bootstrap.Offcanvas.getOrCreateInstance(panel).show();
    };

    const showButton = () => {
        const btn = document.getElementById('button-palette');
        if (btn) {
            btn.style.display = 'block';
        }
    };

    return {
        init,
        set,
        apply,
        syncMeta,
        openPanel,
        showButton,
    };
})();
