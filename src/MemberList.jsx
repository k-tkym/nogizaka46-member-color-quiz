import React from "react";
import { MEMBER_DATA, OFFICIAL_COLORS } from "./data";

const getHex = (id) => OFFICIAL_COLORS.find((c) => c.id === id)?.hex || "#ccc";

export default function MemberList() {
    return (
        <div className="min-h-[100dvh] bg-slate-50 text-slate-900 p-4">
            <div className="max-w-2xl mx-auto">
                <header className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-black text-purple-700">サイリウムカラー一覧</h1>
                    <a href="/" className="text-sm text-purple-600 underline font-bold">クイズに戻る</a>
                </header>
                <div className="overflow-x-auto">
                    <table className="w-full bg-white rounded-2xl shadow-md border border-slate-100">
                        <thead>
                            <tr className="bg-purple-50 text-purple-700 text-left text-xs">
                                <th className="py-2 px-3 font-bold">期</th>
                                <th className="py-2 px-3 font-bold">名前</th>
                                <th className="py-2 px-3 font-bold">サイリウムカラー</th>
                            </tr>
                        </thead>
                        <tbody>
                            {MEMBER_DATA.map((m) => (
                                <tr key={m.id} className="border-t border-slate-100 hover:bg-slate-50">
                                    <td className="py-2 px-3 text-center text-xs text-purple-500 font-bold">{m.gen}</td>
                                    <td className="py-2 px-3 font-bold text-slate-800">{m.name}</td>
                                    <td className="py-2 px-3">
                                        <div className="flex items-center gap-2">
                                            <span className="w-7 h-7 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: getHex(m.colorIds[0]) }} />
                                            <span className="w-7 h-7 rounded-full border-2 border-white shadow-sm" style={{ backgroundColor: getHex(m.colorIds[1]) }} />
                                            <span className="ml-2 text-sm text-slate-700 font-bold">{m.colors[0]} × {m.colors[1]}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="text-xs text-slate-400 mt-6 text-center">※ スクショ・印刷用に最適化しています</p>
            </div>
        </div>
    );
}
