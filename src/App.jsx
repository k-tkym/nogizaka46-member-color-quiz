import React, { useState, useEffect, useMemo } from 'react';
import { Check, X, RefreshCw, Settings2 } from 'lucide-react';
import { MEMBER_DATA } from './data/members';
import { OFFICIAL_COLORS } from './data/colors';

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

    const bgStyle = status === 'correct'
        ? { background: `linear-gradient(135deg, ${getHex(currentMember.colorIds[0])}22, ${getHex(currentMember.colorIds[1])}22)` }
        : status === 'wrong'
            ? { background: '#fee2e2' }
            : {};

    return (
        <div className="min-h-[100dvh] bg-slate-50 text-slate-900 transition-colors relative flex flex-col overflow-x-hidden">
            {/* 背景フィードバックレイヤー */}
            <div
                className={`fixed inset-0 z-0 transition-all duration-500 ${status !== 'idle' ? 'opacity-100' : 'opacity-0'}`}
                style={bgStyle}
            />

            <header className="bg-white/80 backdrop-blur-md border-b px-4 py-3 flex justify-between items-center sticky top-0 z-20 shadow-sm">
                <h1 className="text-lg font-bold text-purple-700 flex items-center gap-2">乃木坂46 サイリウムクイズ</h1>
                <button onClick={() => setShowSettings(!showSettings)} className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Settings2 size={24} /></button>
            </header>

            {showSettings && (
                <div className="bg-white/95 backdrop-blur-md border-b p-4 z-20 sticky top-[53px] shadow-md animate-in slide-in-from-top duration-200">
                    <div className="max-w-md mx-auto space-y-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">モード</label>
                            <div className="flex gap-2">
                                {['easy', 'hard'].map(m => (
                                    <button key={m} onClick={() => setMode(m)} className={`flex-1 py-2 rounded-lg text-sm font-bold border-2 transition-all ${mode === m ? 'border-purple-600 bg-purple-50 text-purple-700' : 'border-slate-200 text-slate-400'}`}>
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
                                    }} className={`flex-1 py-2 rounded-lg text-sm font-bold border-2 transition-all ${gens.includes(g) ? 'border-purple-600 bg-purple-600 text-white shadow-sm' : 'border-slate-200 text-slate-400'}`}>
                                        {g}期
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <main className="flex-1 max-w-md mx-auto w-full p-4 flex flex-col items-center justify-center relative z-10 pb-20">
                <div className="w-full bg-white rounded-3xl shadow-xl p-8 mb-6 text-center relative overflow-hidden ring-1 ring-slate-100 min-h-[160px] flex flex-col justify-center">
                    <div className="absolute top-4 left-4 text-[10px] font-bold text-purple-500 border border-purple-100 px-2 py-0.5 rounded-full bg-purple-50">{currentMember.gen}期生</div>
                    <h2 className="text-4xl font-black mb-2 tracking-tight text-slate-800">{currentMember.name}</h2>
                    <p className="text-slate-400 text-sm font-medium">のサイリウムカラーは？</p>

                    {status !== 'idle' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white animate-in fade-in zoom-in duration-300 z-30">
                            {status === 'correct' ? (
                                <>
                                    <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-2 shadow-inner"><Check size={40} strokeWidth={4} /></div>
                                    <p className="text-2xl font-black text-green-600">正解！</p>
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center w-full px-4">
                                    <div className="flex items-center gap-2 mb-2 text-red-600">
                                        <X size={28} strokeWidth={4} />
                                        <p className="text-2xl font-black italic">残念...</p>
                                    </div>
                                    <div className="flex gap-4 mb-2">
                                        <div className="w-8 h-12 rounded-md shadow-md border-2 border-white ring-1 ring-slate-100" style={{ backgroundColor: getHex(currentMember.colorIds[0]) }} />
                                        <div className="w-8 h-12 rounded-md shadow-md border-2 border-white ring-1 ring-slate-100" style={{ backgroundColor: getHex(currentMember.colorIds[1]) }} />
                                    </div>
                                    <p className="text-sm font-bold text-slate-600">正解：{currentMember.colors[0]} × {currentMember.colors[1]}</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="w-full space-y-3">
                    {mode === 'easy' ? (
                        <div className="grid grid-cols-1 gap-3">
                            {options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(opt.colorIds)}
                                    disabled={status !== 'idle'}
                                    className="bg-white hover:bg-slate-50 active:scale-95 border-2 border-slate-100 p-4 rounded-2xl flex items-center justify-between transition-all shadow-sm group"
                                >
                                    <div className="flex gap-2">
                                        <div className="w-7 h-12 rounded-md border border-slate-200 shadow-sm transition-transform group-hover:scale-105" style={{ backgroundColor: getHex(opt.colorIds[0]) }} />
                                        <div className="w-7 h-12 rounded-md border border-slate-200 shadow-sm transition-transform group-hover:scale-105" style={{ backgroundColor: getHex(opt.colorIds[1]) }} />
                                    </div>
                                    <div className="font-bold text-lg text-slate-700">{opt.colors[0]} × {opt.colors[1]}</div>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            <div className="flex justify-center gap-6">
                                {[0, 1].map(i => (
                                    <div
                                        key={i}
                                        className={`w-20 h-32 rounded-2xl border-4 flex items-center justify-center text-xs font-black transition-all duration-300 ${selectedHardColors[i] ? 'shadow-xl scale-110 border-white' : 'border-dashed border-slate-200 bg-slate-100/50 text-slate-400'}`}
                                        style={{ backgroundColor: selectedHardColors[i] ? getHex(selectedHardColors[i]) : 'transparent' }}
                                    >
                                        {!selectedHardColors[i] && (
                                            <div className="text-center">
                                                <span className="block text-lg opacity-30">?</span>
                                                <span>{i + 1}本目</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="grid grid-cols-4 gap-2.5 bg-white p-4 rounded-[2rem] shadow-xl border border-slate-100">
                                {OFFICIAL_COLORS.map(c => (
                                    <button
                                        key={c.id}
                                        onClick={() => selectHardColor(c.id)}
                                        disabled={status !== 'idle'}
                                        className={`aspect-square rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center active:scale-90 transition-transform ${c.text}`}
                                        style={{ backgroundColor: c.hex }}
                                    >
                                        <span className="text-[10px] font-black bg-white/40 px-1.5 py-0.5 rounded-md backdrop-blur-sm shadow-sm">{c.name}</span>
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => setSelectedHardColors([null, null])} className="w-full py-3 text-slate-400 text-sm font-bold flex items-center justify-center gap-2 hover:text-slate-600 transition-colors"><RefreshCw size={16} /> 選択をリセット</button>
                        </div>
                    )}
                </div>
            </main>

            <footer className="p-8 text-center relative z-10">
                <div className="inline-block px-4 py-2 rounded-full bg-slate-100/50 backdrop-blur-sm border border-slate-200/50">
                    <p className="text-slate-400 text-[9px] tracking-[0.2em] uppercase font-bold italic">© 2026 nogizaka46-member-color-quiz</p>
                    <p className="text-[8px] text-slate-300 lowercase mt-0.5">Unofficial Fan App</p>
                </div>
            </footer>
        </div>
    );
}