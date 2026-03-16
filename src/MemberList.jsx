import React, { useMemo, useState } from "react";
import { MEMBER_DATA, OFFICIAL_COLOR_BY_ID } from "./data";
import { filterMembersBySingle41Type, groupMembersByGen, SINGLE41_FILTER_OPTIONS } from "./memberListLogic";

const getHex = (id) => OFFICIAL_COLOR_BY_ID[id]?.hex || "#ccc";
const WHITE_COLOR_VALUES = new Set(["#fff", "#ffffff", "rgb(255,255,255)"]);

const normalizeColorValue = (value) => value.toLowerCase().replace(/\s/g, "");
const getSwatchBorderClassName = (colorId) =>
    WHITE_COLOR_VALUES.has(normalizeColorValue(getHex(colorId))) ? "border-slate-400" : "border-white";

export default function MemberList() {
    const [single41Type, setSingle41Type] = useState(null);
    const groupedMembers = useMemo(() => {
        const filteredMembers = filterMembersBySingle41Type(MEMBER_DATA, single41Type);

        return groupMembersByGen(filteredMembers);
    }, [single41Type]);

    return (
        <div className="min-h-[100dvh] bg-slate-50 text-slate-900 p-4">
            <div className="max-w-2xl mx-auto">
                <header className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-black text-purple-700">サイリウムカラー一覧</h1>
                    <a href="#/" className="text-sm text-purple-600 underline font-bold">クイズに戻る</a>
                </header>
                <section className="mb-4">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-2">41枚目シングル</p>
                    <div className="flex gap-2">
                        {SINGLE41_FILTER_OPTIONS.map((type) => (
                            <button
                                key={type ?? "all"}
                                onClick={() => setSingle41Type(type)}
                                className={`flex-1 rounded-lg border-2 py-2 text-sm font-bold transition-all ${single41Type === type ? "border-purple-600 bg-purple-600 text-white shadow-sm" : "border-slate-200 bg-white text-slate-500"}`}
                            >
                                {type ?? "すべて"}
                            </button>
                        ))}
                    </div>
                </section>
                <div className="overflow-x-auto">
                    <table className="w-full table-fixed bg-white rounded-2xl shadow-md border border-slate-100">
                        <colgroup>
                            <col />
                            <col className="w-[12rem]" />
                        </colgroup>
                        <tbody>
                            {groupedMembers.length === 0 && (
                                <tr>
                                    <td colSpan={2} className="px-3 py-8 text-center text-sm font-bold text-slate-400">
                                        表示できるメンバーがいません
                                    </td>
                                </tr>
                            )}
                            {groupedMembers.flatMap(([gen, members]) => [
                                <tr key={`gen-${gen}`} className="bg-purple-100/60">
                                    <td colSpan={2} className="py-2 px-3 font-bold text-purple-700 text-base border-t border-purple-200">{gen}期</td>
                                </tr>,
                                ...members.map((member) => (
                                    <tr key={member.id} className="border-t border-slate-100 hover:bg-slate-50">
                                        <td className="py-2 px-3 align-middle">
                                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                                <span className="min-w-0 font-bold text-slate-800">{member.name}</span>
                                                {member.single41Type && (
                                                    <span className={`shrink-0 whitespace-nowrap text-[10px] font-bold px-1.5 py-0.5 rounded-full ${member.single41Type === '選抜' ? 'bg-purple-100 text-purple-700' : 'bg-sky-100 text-sky-700'}`}>
                                                        {member.single41Type}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-2 px-3 align-middle">
                                            <div className="flex items-center gap-3">
                                                <div className="flex shrink-0 items-center gap-2">
                                                    {member.colorIds.map((colorId, index) => (
                                                        <span
                                                            key={`${member.id}-${index}-${colorId}`}
                                                            className={`h-7 w-7 shrink-0 rounded-full border-2 shadow-sm ${getSwatchBorderClassName(colorId)}`}
                                                            style={{ backgroundColor: getHex(colorId) }}
                                                        />
                                                    ))}
                                                </div>
                                                <span className="min-w-0 text-sm font-bold text-slate-700 break-words">
                                                    {member.colors[0]} × {member.colors[1]}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ])}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
