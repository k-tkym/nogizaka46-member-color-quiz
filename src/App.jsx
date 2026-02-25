import React, { useState, useEffect, useMemo } from 'react';
import { Check, X, RefreshCw, Settings2 } from 'lucide-react';

const OFFICIAL_COLORS = [
    { id: 'white', name: '白', hex: '#FFFFFF', text: 'text-black' },
    { id: 'orange', name: 'オレンジ', hex: '#FFA500', text: 'text-white' },
    { id: 'blue', name: '青', hex: '#0000FF', text: 'text-white' },
    { id: 'yellow', name: '黄', hex: '#FFFF00', text: 'text-black' },
    { id: 'purple', name: '紫', hex: '#800080', text: 'text-white' },
    { id: 'green', name: '緑', hex: '#008000', text: 'text-white' },
    { id: 'pink', name: 'ピンク', hex: '#FFC0CB', text: 'text-black' },
    { id: 'red', name: '赤', hex: '#FF0000', text: 'text-white' },
    { id: 'water-blue', name: '水色', hex: '#00BFFF', text: 'text-black' },
    { id: 'yellow-green', name: '黄緑', hex: '#ADFF2F', text: 'text-black' },
    { id: 'turquoise', name: 'ターコイズ', hex: '#40E0D0', text: 'text-black' },
];

const COLOR_MAP = {
    "白": "white",
    "オレンジ": "orange",
    "青": "blue",
    "黄": "yellow",
    "紫": "purple",
    "緑": "green",
    "ピンク": "pink",
    "赤": "red",
    "水色": "water-blue",
    "黄緑": "yellow-green",
    "ターコイズ": "turquoise"
};

const MEMBER_DATA_RAW = [
    { name: "伊藤理々杏", gen: 3, colors: ["紫", "赤"] },
    { name: "岩本蓮加", gen: 3, colors: ["ピンク", "赤"] },
    { name: "梅澤美波", gen: 3, colors: ["青", "水色"] },
    { name: "久保史緒里", gen: 3, colors: ["黄", "水色"] },
    { name: "吉田綾乃クリスティー", gen: 3, colors: ["紫", "ピンク"] },
    { name: "遠藤さくら", gen: 4, colors: ["白", "ピンク"] },
    { name: "賀喜遥香", gen: 4, colors: ["オレンジ", "緑"] },
    { name: "金川紗耶", gen: 4, colors: ["赤", "水色"] },
    { name: "柴田柚菜", gen: 4, colors: ["青", "黄緑"] },
    { name: "田村真佑", gen: 4, colors: ["紫", "水色"] },
    { name: "筒井あやめ", gen: 4, colors: ["紫", "紫"] },
    { name: "矢久保美緒", gen: 4, colors: ["黄", "ピンク"] },
    { name: "黒見明香", gen: 4, colors: ["紫", "緑"] },
    { name: "佐藤璃果", gen: 4, colors: ["ピンク", "ターコイズ"] },
    { name: "林瑠奈", gen: 4, colors: ["ピンク", "ピンク"] },
    { name: "松尾美佑", gen: 4, colors: ["ターコイズ", "白"] },
    { name: "弓木奈於", gen: 4, colors: ["赤", "黄緑"] },
    { name: "五百城茉央", gen: 5, colors: ["ターコイズ", "青"] },
    { name: "池田瑛紗", gen: 5, colors: ["白", "緑"] },
    { name: "一ノ瀬美空", gen: 5, colors: ["水色", "水色"] },
    { name: "井上和", gen: 5, colors: ["白", "赤"] },
    { name: "岡本姫奈", gen: 5, colors: ["紫", "青"] },
    { name: "小川彩", gen: 5, colors: ["白", "白"] },
    { name: "奥田いろは", gen: 5, colors: ["ピンク", "黄緑"] },
    { name: "川﨑桜", gen: 5, colors: ["ピンク", "緑"] },
    { name: "菅原咲月", gen: 5, colors: ["ピンク", "水色"] },
    { name: "冨里奈央", gen: 5, colors: ["ターコイズ", "ターコイズ"] },
    { name: "中西アルノ", gen: 5, colors: ["ターコイズ", "水色"] },
    { name: "愛宕心響", gen: 6, colors: ["ピンク", "青"] },
    { name: "大越ひなの", gen: 6, colors: ["白", "黄"] },
    { name: "小津玲奈", gen: 6, colors: ["紫", "ターコイズ"] },
    { name: "川端晃菜", gen: 6, colors: ["水色", "緑"] },
    { name: "海邉朱莉", gen: 6, colors: ["青", "赤"] },
    { name: "鈴木佑捺", gen: 6, colors: ["水色", "白"] },
    { name: "瀬戸口心月", gen: 6, colors: ["青", "黄"] },
    { name: "長嶋凛桜", gen: 6, colors: ["ピンク", "オレンジ"] },
    { name: "増田三莉音", gen: 6, colors: ["青", "青"] },
    { name: "森平麗心", gen: 6, colors: ["黄", "黄"] },
    { name: "矢田萌華", gen: 6, colors: ["白", "紫"] },
];

const MEMBER_DATA = MEMBER_DATA_RAW.map((m, idx) => ({
    id: `m-${idx}`,
    ...m,
    colorIds: m.colors.map(c => COLOR_MAP[c])
}));

export default function App() {
    const [mode, setMode] = useState('easy');
    const [gens, setGens] = useState([3, 4, 5, 6]);
    const [currentMember, setCurrentMember] = useState(null);
    const [options, setOptions] = useState([]);
    const [selectedHardColors, setSelectedHardColors] = useState([null, null]);
    const [status, setStatus] = useState('idle');
    const [showSettings, setShowSettings] = useState(false);

    const filteredMembers = useMemo(() => MEMBER_DATA.filter(m => gens.includes(m.gen)), [gens]);

    const nextQuestion = () => {
        setStatus('idle');
        setSelectedHardColors([null, null]);
        if (filteredMembers.length === 0) return;
        const member = filteredMembers[Math.floor(Math.random() * filteredMembers.length)];
        setCurrentMember(member);

        if (mode === 'easy') {
            const getPairKey = (colorIds) => [...colorIds].sort().join('-');
            const correctKey = getPairKey(member.colorIds);
            const seenKeys = new Set([correctKey]);
            const distractors = [];
            const shuffledPool = [...MEMBER_DATA].sort(() => 0.5 - Math.random());
            for (const m of shuffledPool) {
                const key = getPairKey(m.colorIds);
                if (!seenKeys.has(key)) {
                    distractors.push(m);
                    seenKeys.add(key);
                }
                if (distractors.length >= 3) break;
            }
            setOptions([member, ...distractors].sort(() => 0.5 - Math.random()));
        }
    };

    useEffect(() => { nextQuestion(); }, [mode, gens]);

    const handleAnswer = (answerColorIds) => {
        if (status !== 'idle') return;
        const sortedAnswer = [...answerColorIds].sort();
        const sortedCorrect = [...currentMember.colorIds].sort();
        const isCorrect = sortedAnswer[0] === sortedCorrect[0] && sortedAnswer[1] === sortedCorrect[1];
        setStatus(isCorrect ? 'correct' : 'wrong');
        setTimeout(() => nextQuestion(), 1500);
    };

    const selectHardColor = (colorId) => {
        if (status !== 'idle') return;
        const next = [...selectedHardColors];
        if (next[0] === null) {
            next[0] = colorId;
            setSelectedHardColors(next);
        } else {
            next[1] = colorId;
            setSelectedHardColors(next);
            handleAnswer(next);
        }
    };

    const getHex = (id) => OFFICIAL_COLORS.find(c => c.id === id)?.hex || '#ccc';

    if (!currentMember) return null;

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors relative overflow-x-hidden">
            {status !== 'idle' && (
                <div className="fixed inset-0 z-0 opacity-20 pointer-events-none transition-all duration-300"
                    style={{ background: status === 'correct' ? `linear-gradient(45deg, ${getHex(currentMember.colorIds[0])}, ${getHex(currentMember.colorIds[1])})` : '#ef4444' }}
                />
            )}
            <header className="bg-white border-b px-4 py-3 flex justify-between items-center sticky top-0 z-20 shadow-sm">
                <h1 className="text-lg font-bold text-purple-700 flex items-center gap-2">乃木坂46 サイリウムクイズ</h1>
                <button onClick={() => setShowSettings(!showSettings)} className="p-2 hover:bg-slate-100 rounded-full"><Settings2 size={24} /></button>
            </header>
            {showSettings && (
                <div className="bg-white border-b p-4 z-20 sticky top-[53px] shadow-md">
                    <div className="max-w-md mx-auto space-y-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">モード</label>
                            <div className="flex gap-2">
                                {['easy', 'hard'].map(m => (
                                    <button key={m} onClick={() => setMode(m)} className={`flex-1 py-2 rounded-lg text-sm font-bold border-2 ${mode === m ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-slate-200 text-slate-400'}`}>
                                        {m === 'easy' ? 'イージー' : 'ハード'}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">対象期</label>
                            <div className="flex gap-2">
                                {[3, 4, 5, 6].map(g => (
                                    <button key={g} onClick={() => {
                                        const next = gens.includes(g) ? gens.filter(x => x !== g) : [...gens, g];
                                        if (next.length > 0) setGens(next);
                                    }} className={`flex-1 py-2 rounded-lg text-sm font-bold border-2 ${gens.includes(g) ? 'border-purple-600 bg-purple-600 text-white' : 'border-slate-200 text-slate-400'}`}>
                                        {g}期
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <main className="max-w-md mx-auto p-4 flex flex-col items-center justify-center min-h-[calc(100vh-120px)] relative z-10">
                <div className="w-full bg-white rounded-3xl shadow-xl p-8 mb-8 text-center relative overflow-hidden">
                    <div className="absolute top-4 left-4 text-xs font-bold text-purple-400 border border-purple-200 px-2 py-1 rounded">{currentMember.gen}期生</div>
                    <h2 className="text-4xl font-black mb-2 tracking-tight">{currentMember.name}</h2>
                    <p className="text-slate-400 text-sm">のサイリウムカラーは？</p>
                    {status !== 'idle' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 animate-in fade-in zoom-in duration-200">
                            {status === 'correct' ? (
                                <>
                                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4"><Check size={40} strokeWidth={4} /></div>
                                    <p className="text-xl font-bold text-green-600">正解！</p>
                                </>
                            ) : (
                                <>
                                    <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4"><X size={40} strokeWidth={4} /></div>
                                    <p className="text-xl font-bold text-red-600">残念...</p>
                                    <div className="mt-4 flex gap-2">
                                        <div className="w-8 h-12 rounded shadow-sm" style={{ backgroundColor: getHex(currentMember.colorIds[0]) }} />
                                        <div className="w-8 h-12 rounded shadow-sm" style={{ backgroundColor: getHex(currentMember.colorIds[1]) }} />
                                    </div>
                                    <p className="text-xs font-bold mt-2 text-slate-500">正解: {currentMember.colors[0]} × {currentMember.colors[1]}</p>
                                </>
                            )}
                        </div>
                    )}
                </div>
                <div className="w-full space-y-4">
                    {mode === 'easy' ? (
                        <div className="grid grid-cols-1 gap-3">
                            {options.map((opt, idx) => (
                                <button key={idx} onClick={() => handleAnswer(opt.colorIds)} disabled={status !== 'idle'} className="bg-white hover:bg-slate-50 border-2 border-slate-100 p-4 rounded-2xl flex items-center justify-between transition-all shadow-sm">
                                    <div className="flex gap-1.5">
                                        <div className="w-6 h-10 rounded-sm border shadow-inner" style={{ backgroundColor: getHex(opt.colorIds[0]) }} />
                                        <div className="w-6 h-10 rounded-sm border shadow-inner" style={{ backgroundColor: getHex(opt.colorIds[1]) }} />
                                    </div>
                                    <div className="font-bold text-lg text-slate-700">{opt.colors[0]} × {opt.colors[1]}</div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex justify-center gap-4">
                                {[0, 1].map(i => (
                                    <div key={i} className={`w-16 h-24 rounded-xl border-4 flex items-center justify-center text-xs font-bold transition-all ${selectedHardColors[i] ? 'shadow-lg scale-110' : 'border-dashed border-slate-200 bg-slate-100 text-slate-400'}`} style={{ backgroundColor: selectedHardColors[i] ? getHex(selectedHardColors[i]) : 'transparent', borderColor: selectedHardColors[i] ? '#fff' : '' }}>
                                        {!selectedHardColors[i] && (i + 1 + '本目')}
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-4 gap-2 bg-white p-4 rounded-3xl shadow-inner border border-slate-100">
                                {OFFICIAL_COLORS.map(c => (
                                    <button key={c.id} onClick={() => selectHardColor(c.id)} disabled={status !== 'idle'} className={`aspect-square rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center active:scale-90 ${c.text}`} style={{ backgroundColor: c.hex }}>
                                        <span className="text-[9px] font-black bg-white/40 px-1 rounded backdrop-blur-[2px]">{c.name}</span>
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => setSelectedHardColors([null, null])} className="w-full py-2 text-slate-400 text-sm font-bold flex items-center justify-center gap-1"><RefreshCw size={14} /> 選択をリセット</button>
                        </div>
                    )}
                </div>
            </main>
            <footer className="p-8 text-center text-slate-400 text-[10px] tracking-widest uppercase">
                <p>© 2026 nogizaka46-member-color-quiz</p>
                <p className="mt-1 text-[8px] lowercase">Unofficial Fan App</p>
            </footer>
        </div>
    );
}