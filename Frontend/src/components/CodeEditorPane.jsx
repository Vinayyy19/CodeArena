import React, { useRef, useCallback, useState, useEffect, useMemo } from 'react';
import Editor from '@monaco-editor/react';
import { RotateCw, Settings, Expand, Minimize2, ChevronDown, Loader2, X } from 'lucide-react';

// ─── All 15 supported languages ──────────────────────────────────
const LANGUAGES = [
    { id: 'python', label: 'Python 3', icon: '/icons/python.svg' },
    { id: 'javascript', label: 'JavaScript', icon: '/icons/javascript.svg' },
    { id: 'cpp', label: 'C++ 17', icon: '/icons/cplusplus.svg' },
    { id: 'java', label: 'Java', icon: '/icons/java.svg' },
    { id: 'c', label: 'C', icon: '/icons/c.svg' },
    { id: 'csharp', label: 'C#', icon: '/icons/csharp.svg' },
    { id: 'typescript', label: 'TypeScript', icon: '/icons/typescript.svg' },
    { id: 'go', label: 'Go', icon: '/icons/golang.svg' },
    { id: 'rust', label: 'Rust', icon: '/icons/rust.svg' },
    { id: 'kotlin', label: 'Kotlin', icon: '/icons/kotlin.svg' },
    { id: 'swift', label: 'Swift', icon: '/icons/swift.svg' },
    { id: 'php', label: 'PHP', icon: '/icons/php.svg' },
    { id: 'ruby', label: 'Ruby', icon: '/icons/ruby.svg' },
    { id: 'lua', label: 'Lua', icon: '/icons/lua.svg' },
    { id: 'haskell', label: 'Haskell', icon: '/icons/haskell.svg' },
];

// ─── Default editor settings ─────────────────────────────────────
const DEFAULT_SETTINGS = {
    fontSize: 14,
    tabSize: 4,
    wordWrap: 'off',
    theme: 'codearena-dark',
    minimap: false,
};

// Load saved settings from localStorage
const loadSettings = () => {
    try {
        const saved = localStorage.getItem('codearena_editor_settings');
        if (saved) return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
    } catch (e) { /* ignore */ }
    return DEFAULT_SETTINGS;
};

// ─── Monaco Theme Definitions ────────────────────────────────────
const THEME_DEFINITIONS = {
    'codearena-dark': {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
            { token: 'keyword', foreground: 'C586C0' },
            { token: 'string', foreground: 'CE9178' },
            { token: 'number', foreground: 'B5CEA8' },
            { token: 'type', foreground: '4EC9B0' },
            { token: 'function', foreground: 'DCDCAA' },
            { token: 'variable', foreground: '9CDCFE' },
        ],
        colors: {
            'editor.background': '#0a0a0a',
            'editor.foreground': '#D4D4D4',
            'editor.lineHighlightBackground': '#1a1a1a',
            'editor.selectionBackground': '#264f78',
            'editorLineNumber.foreground': '#5a6069',
            'editorLineNumber.activeForeground': '#c6c6c6',
            'editorCursor.foreground': '#f66b15',
            'editorBracketMatch.border': '#888',
            'editorIndentGuide.background': '#404040',
            'editorIndentGuide.activeBackground': '#707070',
            'scrollbarSlider.background': '#79797966',
            'scrollbarSlider.hoverBackground': '#646464b3',
            'editorGutter.background': '#0a0a0a',
        }
    },
    'monokai': {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: 'comment', foreground: '75715E', fontStyle: 'italic' },
            { token: 'keyword', foreground: 'F92672' },
            { token: 'string', foreground: 'E6DB74' },
            { token: 'number', foreground: 'AE81FF' },
            { token: 'type', foreground: '66D9EF', fontStyle: 'italic' },
            { token: 'function', foreground: 'A6E22E' },
            { token: 'variable', foreground: 'F8F8F2' },
        ],
        colors: {
            'editor.background': '#1e1f1c',
            'editor.foreground': '#F8F8F2',
            'editor.lineHighlightBackground': '#3e3d32',
            'editor.selectionBackground': '#49483E',
            'editorLineNumber.foreground': '#90908a',
            'editorCursor.foreground': '#F8F8F0',
            'editorIndentGuide.background': '#464741',
            'editorGutter.background': '#1e1f1c',
        }
    },
};

// ─── Settings Modal Component ────────────────────────────────────
const SettingsModal = ({ settings, setSettings, onClose }) => {
    const handleChange = (key, value) => {
        const updated = { ...settings, [key]: value };
        setSettings(updated);
        localStorage.setItem('codearena_editor_settings', JSON.stringify(updated));
    };

    return (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-[#1a1a1a] border border-[#3a3a3a] rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#2d2d2d]">
                    <div className="flex items-center gap-2">
                        <Settings size={16} className="text-[var(--color-primary)]" />
                        <h3 className="text-white font-bold text-sm">Editor Settings</h3>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors p-1 rounded hover:bg-[#2a2a2a]">
                        <X size={16} />
                    </button>
                </div>

                {/* Settings Body */}
                <div className="p-5 space-y-5">
                    {/* Font Size */}
                    <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-300 font-medium">Font Size</label>
                        <div className="flex items-center gap-3">
                            <input
                                type="range"
                                min="12"
                                max="24"
                                value={settings.fontSize}
                                onChange={(e) => handleChange('fontSize', parseInt(e.target.value))}
                                className="w-24 accent-[var(--color-primary)]"
                            />
                            <span className="text-xs text-[var(--color-primary)] font-mono font-bold w-8 text-right">{settings.fontSize}px</span>
                        </div>
                    </div>

                    {/* Tab Size */}
                    <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-300 font-medium">Tab Size</label>
                        <div className="flex gap-1">
                            {[2, 4].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => handleChange('tabSize', size)}
                                    className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                                        settings.tabSize === size
                                            ? 'bg-[var(--color-primary)] text-white'
                                            : 'bg-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#333]'
                                    }`}
                                >
                                    {size} spaces
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Word Wrap */}
                    <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-300 font-medium">Word Wrap</label>
                        <button
                            onClick={() => handleChange('wordWrap', settings.wordWrap === 'on' ? 'off' : 'on')}
                            className={`relative w-11 h-6 rounded-full transition-colors ${
                                settings.wordWrap === 'on' ? 'bg-[var(--color-primary)]' : 'bg-[#3a3a3a]'
                            }`}
                        >
                            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                                settings.wordWrap === 'on' ? 'translate-x-[22px]' : 'translate-x-0.5'
                            }`} />
                        </button>
                    </div>

                    {/* Theme */}
                    <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-300 font-medium">Theme</label>
                        <div className="flex gap-1">
                            {[
                                { id: 'codearena-dark', label: 'CodeArena' },
                                { id: 'monokai', label: 'Monokai' },
                                { id: 'vs-dark', label: 'VS Dark' },
                            ].map((t) => (
                                <button
                                    key={t.id}
                                    onClick={() => handleChange('theme', t.id)}
                                    className={`px-2.5 py-1.5 text-xs font-bold rounded-md transition-all ${
                                        settings.theme === t.id
                                            ? 'bg-[var(--color-primary)] text-white'
                                            : 'bg-[#2a2a2a] text-gray-400 hover:text-white hover:bg-[#333]'
                                    }`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Minimap */}
                    <div className="flex items-center justify-between">
                        <label className="text-sm text-gray-300 font-medium">Minimap</label>
                        <button
                            onClick={() => handleChange('minimap', !settings.minimap)}
                            className={`relative w-11 h-6 rounded-full transition-colors ${
                                settings.minimap ? 'bg-[var(--color-primary)]' : 'bg-[#3a3a3a]'
                            }`}
                        >
                            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                                settings.minimap ? 'translate-x-[22px]' : 'translate-x-0.5'
                            }`} />
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="px-5 py-3 border-t border-[#2d2d2d] flex justify-between items-center">
                    <button
                        onClick={() => {
                            setSettings(DEFAULT_SETTINGS);
                            localStorage.setItem('codearena_editor_settings', JSON.stringify(DEFAULT_SETTINGS));
                        }}
                        className="text-xs text-gray-500 hover:text-white transition-colors"
                    >
                        Reset to defaults
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-1.5 text-xs font-bold bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white rounded-md transition-colors"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
};

// ─── Main Editor Component ───────────────────────────────────────
const CodeEditorPane = ({ code, setCode, language, setLanguage, disabled, isMaximized, onMaximize, onReset, saveStatus }) => {
    const editorRef = useRef(null);
    const monacoRef = useRef(null);
    const [showLangDropdown, setShowLangDropdown] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [settings, setSettings] = useState(loadSettings);
    const dropdownRef = useRef(null);

    const currentLang = LANGUAGES.find(l => l.id === language) || LANGUAGES[0];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowLangDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Apply theme changes dynamically
    useEffect(() => {
        if (monacoRef.current) {
            const monaco = monacoRef.current;
            // Define custom themes if not already vs-dark
            if (settings.theme !== 'vs-dark' && THEME_DEFINITIONS[settings.theme]) {
                monaco.editor.defineTheme(settings.theme, THEME_DEFINITIONS[settings.theme]);
            }
            monaco.editor.setTheme(settings.theme);
        }
    }, [settings.theme]);

    const handleEditorDidMount = useCallback((editor, monaco) => {
        editorRef.current = editor;
        monacoRef.current = monaco;

        // Define all custom themes
        Object.entries(THEME_DEFINITIONS).forEach(([name, definition]) => {
            monaco.editor.defineTheme(name, definition);
        });

        monaco.editor.setTheme(settings.theme);
        editor.focus();
    }, []);

    const handleEditorChange = useCallback((value) => {
        if (!disabled) {
            setCode(value || '');
        }
    }, [disabled, setCode]);

    // Compute Monaco options from settings
    const editorOptions = useMemo(() => ({
        // Core editing
        readOnly: disabled,
        fontSize: settings.fontSize,
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace",
        fontLigatures: true,
        tabSize: settings.tabSize,
        insertSpaces: true,
        autoIndent: 'full',
        formatOnPaste: true,
        formatOnType: true,
        wordWrap: settings.wordWrap,

        // Bracket handling
        autoClosingBrackets: 'always',
        autoClosingQuotes: 'always',
        autoSurround: 'languageDefined',
        bracketPairColorization: { enabled: true },
        matchBrackets: 'always',

        // UI appearance
        minimap: { enabled: settings.minimap },
        lineNumbers: 'on',
        glyphMargin: false,
        folding: true,
        foldingHighlight: true,
        lineDecorationsWidth: 10,
        lineNumbersMinChars: 3,
        renderLineHighlight: 'line',
        renderWhitespace: 'selection',
        guides: {
            indentation: true,
            bracketPairs: true,
        },

        // Scrolling
        smoothScrolling: true,
        scrollBeyondLastLine: false,
        scrollbar: {
            verticalScrollbarSize: 8,
            horizontalScrollbarSize: 8,
            useShadows: false,
        },

        // Cursor
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: 'on',
        cursorStyle: 'line',
        cursorWidth: 2,

        // Suggestions & intellisense
        quickSuggestions: true,
        suggestOnTriggerCharacters: true,
        wordBasedSuggestions: 'currentDocument',
        parameterHints: { enabled: true },

        // Other
        contextmenu: true,
        mouseWheelZoom: true,
        padding: { top: 12, bottom: 12 },
        overviewRulerLanes: 0,
        hideCursorInOverviewRuler: true,
        overviewRulerBorder: false,
        domReadOnly: disabled,
    }), [disabled, settings]);

    // Save status display text
    const saveStatusText = useMemo(() => {
        if (!saveStatus) return 'Saved to local storage';
        if (saveStatus === 'saving') return 'Saving...';
        if (saveStatus === 'saved') return 'Saved just now';
        if (typeof saveStatus === 'number') {
            const seconds = Math.floor((Date.now() - saveStatus) / 1000);
            if (seconds < 60) return 'Saved just now';
            const minutes = Math.floor(seconds / 60);
            return `Saved ${minutes}m ago`;
        }
        return 'Saved to local storage';
    }, [saveStatus]);

    return (
        <div className={`flex flex-col min-h-0 h-full border border-[var(--color-dark-border)] rounded-md overflow-hidden relative ${disabled ? 'bg-red-900/10 opacity-80' : 'bg-[#0a0a0a]'}`}>
            {/* Top Bar */}
            <div className="flex items-center justify-between bg-[#1a1a1a] border-b border-[var(--color-dark-border)] px-3 py-2">
                <div className="flex items-center gap-3">
                    {/* Language Selector */}
                    <div ref={dropdownRef} className="relative">
                        <button
                            onClick={() => setShowLangDropdown(!showLangDropdown)}
                            className="text-xs font-semibold text-gray-300 bg-[#2a2a2a] hover:bg-[#333] px-2.5 py-1.5 rounded-md flex items-center gap-2 transition-colors border border-[#3a3a3a] hover:border-[#555]"
                        >
                            <img src={currentLang.icon} alt={currentLang.label} className="w-4 h-4 object-contain" />
                            <span>{currentLang.label}</span>
                            <ChevronDown size={12} className={`text-gray-500 transition-transform ${showLangDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {showLangDropdown && (
                            <div className="absolute top-full left-0 mt-1 w-52 bg-[#1e1e1e] border border-[#3a3a3a] rounded-lg shadow-2xl z-50 py-1 overflow-hidden max-h-[320px] overflow-y-auto custom-scrollbar">
                                {LANGUAGES.map((lang) => (
                                    <button
                                        key={lang.id}
                                        onClick={() => {
                                            setLanguage(lang.id);
                                            setShowLangDropdown(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center gap-2.5 transition-colors ${
                                            language === lang.id
                                                ? 'bg-[var(--color-primary)]/15 text-[var(--color-primary)] border-l-2 border-[var(--color-primary)]'
                                                : 'text-gray-400 hover:bg-[#2a2a2a] hover:text-white border-l-2 border-transparent'
                                        }`}
                                    >
                                        <img src={lang.icon} alt={lang.label} className="w-4 h-4 object-contain" />
                                        <span>{lang.label}</span>
                                        {language === lang.id && (
                                            <span className="ml-auto text-[10px] bg-[var(--color-primary)]/20 text-[var(--color-primary)] px-1.5 py-0.5 rounded font-bold">ACTIVE</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="w-[1px] h-4 bg-[var(--color-dark-border)]"></div>

                    <div className="text-xs font-semibold text-gray-300 bg-[#2a2a2a] px-2.5 py-1.5 rounded-md flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[var(--color-primary)] animate-pulse"></span>
                        AI Evaluator Active
                    </div>

                    <div className="w-[1px] h-4 bg-[var(--color-dark-border)]"></div>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={onReset}
                            className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded transition-colors"
                            title="Reset to default code"
                        >
                            <RotateCw size={14} />
                        </button>
                        <button
                            onClick={() => setShowSettings(true)}
                            className="p-1.5 text-gray-400 hover:text-white hover:bg-[#2a2a2a] rounded transition-colors"
                            title="Editor Settings"
                        >
                            <Settings size={14} />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-gray-500 font-medium tracking-wide">
                    <span className={saveStatus === 'saving' ? 'text-yellow-500/70' : saveStatus === 'saved' ? 'text-green-500/70' : ''}>
                        {saveStatusText}
                    </span>
                    <button
                        onClick={onMaximize}
                        className="p-1.5 hover:text-white hover:bg-[#2a2a2a] rounded transition-colors"
                        title={isMaximized ? 'Restore' : 'Maximize Editor'}
                    >
                        {isMaximized ? <Minimize2 size={14} /> : <Expand size={14} />}
                    </button>
                </div>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1 min-h-0 overflow-hidden">
                <Editor
                    height="100%"
                    language={language}
                    value={code}
                    onChange={handleEditorChange}
                    theme={settings.theme}
                    onMount={handleEditorDidMount}
                    loading={
                        <div className="flex items-center justify-center h-full bg-[#0a0a0a] gap-3">
                            <Loader2 size={24} className="animate-spin text-[var(--color-primary)]" />
                            <span className="text-gray-500 text-sm font-medium">Loading Editor...</span>
                        </div>
                    }
                    options={editorOptions}
                />
            </div>

            {/* Settings Modal */}
            {showSettings && (
                <SettingsModal
                    settings={settings}
                    setSettings={setSettings}
                    onClose={() => setShowSettings(false)}
                />
            )}
        </div>
    );
};

export { LANGUAGES };
export default CodeEditorPane;
