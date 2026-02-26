import React from "react";
import { MEMBER_DATA, OFFICIAL_COLORS } from "./data";

const getHex = (id) => OFFICIAL_COLORS.find((c) => c.id === id)?.hex || "#ccc";

export default function MemberList() {
    return (
        <div className="min-h-[100dvh] bg-slate-50 text-slate-900 p-4">
            <div className="max-w-2xl mx-auto">
                <header className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-black text-purple-700">サイリウムカラー一覧</h1>
                    <a href="#/" className="text-sm text-purple-600 underline font-bold">クイズに戻る</a>
                </header>
                <div className="overflow-x-auto">
                    <table className="w-full bg-white rounded-2xl shadow-md border border-slate-100">
                        <thead>
                            <tr className="bg-purple-50 text-purple-700 text-left text-xs">
                                <th className="py-2 px-3 font-bold">名前</th>
                                <th className="py-2 px-3 font-bold">サイリウムカラー</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(() => {
                                // 期ごとにグループ化
                                const grouped = {};
                                MEMBER_DATA.forEach(m => {
                                    if (!grouped[m.gen]) grouped[m.gen] = [];
                                    grouped[m.gen].push(m);
                                });
                                // 期の昇順で出力
                                return Object.keys(grouped).sort((a, b) => a - b).flatMap(gen => [
                                    <tr key={`gen-${gen}`} className="bg-purple-100/60">
                                        <td colSpan={2} className="py-2 px-3 font-bold text-purple-700 text-base border-t border-purple-200">{gen}期</td>
                                    </tr>,
                                    ...grouped[gen].map(m => (
                                        <tr key={m.id} className="border-t border-slate-100 hover:bg-slate-50">
                                            <td className="py-2 px-3 font-bold text-slate-800">{m.name}</td>
                                            <td className="py-2 px-3">
                                                <div className="flex items-center gap-2">
                                                    {(() => {
                                                        const hex0 = getHex(m.colorIds[0]).toLowerCase();
                                                        const isWhite0 = ['#fff', '#ffffff', 'rgb(255,255,255)', 'rgb(255, 255, 255)'].includes(hex0) || hex0.replace(/\s/g, '') === 'rgb(255,255,255)';
                                                        return (
                                                            <span
                                                                className={`w-7 h-7 rounded-full border-2 shadow-sm ${isWhite0 ? 'border-slate-400' : 'border-white'}`}
                                                                style={{ backgroundColor: getHex(m.colorIds[0]) }}
                                                            />
                                                        );
                                                    })()}
                                                    {(() => {
                                                        const hex1 = getHex(m.colorIds[1]).toLowerCase();
                                                        const isWhite1 = ['#fff', '#ffffff', 'rgb(255,255,255)', 'rgb(255, 255, 255)'].includes(hex1) || hex1.replace(/\s/g, '') === 'rgb(255,255,255)';
                                                        return (
                                                            <span
                                                                className={`w-7 h-7 rounded-full border-2 shadow-sm ${isWhite1 ? 'border-slate-400' : 'border-white'}`}
                                                                style={{ backgroundColor: getHex(m.colorIds[1]) }}
                                                            />
                                                        );
                                                    })()}
                                                    <span className="ml-2 text-sm text-slate-700 font-bold">{m.colors[0]} × {m.colors[1]}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ]);
                            })()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
