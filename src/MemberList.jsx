import React, { useMemo } from "react";
import { MEMBER_DATA, OFFICIAL_COLOR_BY_ID, SINGLE41_TYPE_LABELS } from "./data";

const getHex = (id) => OFFICIAL_COLOR_BY_ID[id]?.hex || "#ccc";
const WHITE_COLOR_VALUES = new Set(["#fff", "#ffffff", "rgb(255,255,255)"]);

const normalizeColorValue = (value) => value.toLowerCase().replace(/\s/g, "");
const getSwatchBorderClassName = (colorId) =>
    WHITE_COLOR_VALUES.has(normalizeColorValue(getHex(colorId))) ? "border-slate-400" : "border-white";

const groupMembersByGen = (members) => {
    const grouped = {};

    members.forEach((member) => {
        if (!grouped[member.gen]) grouped[member.gen] = [];
        grouped[member.gen].push(member);
    });

    return Object.entries(grouped).sort(([genA], [genB]) => Number(genA) - Number(genB));
};

export default function MemberList() {
    const groupedMembers = useMemo(() => groupMembersByGen(MEMBER_DATA), []);

    return (
        <div className="min-h-[100dvh] bg-slate-50 text-slate-900 p-4">
            <div className="max-w-2xl mx-auto">
                <header className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-black text-purple-700">サイリウムカラー一覧</h1>
                    <a href="#/" className="text-sm text-purple-600 underline font-bold">クイズに戻る</a>
                </header>
                <div className="overflow-x-auto">
                    <table className="w-full bg-white rounded-2xl shadow-md border border-slate-100">
                        <tbody>
                            {groupedMembers.flatMap(([gen, members]) => [
                                <tr key={`gen-${gen}`} className="bg-purple-100/60">
                                    <td colSpan={2} className="py-2 px-3 font-bold text-purple-700 text-base border-t border-purple-200">{gen}期</td>
                                </tr>,
                                ...members.map((member) => (
                                    <tr key={member.id} className="border-t border-slate-100 hover:bg-slate-50">
                                        <td className="py-2 px-3">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-slate-800">{member.name}</span>
                                                {member.single41Type && (
                                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${member.single41Type === 'senbatsu' ? 'bg-purple-100 text-purple-700' : 'bg-sky-100 text-sky-700'}`}>
                                                        {SINGLE41_TYPE_LABELS[member.single41Type]}
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="py-2 px-3">
                                            <div className="flex items-center gap-2">
                                                {member.colorIds.map((colorId, index) => (
                                                    <span
                                                        key={`${member.id}-${index}-${colorId}`}
                                                        className={`w-7 h-7 rounded-full border-2 shadow-sm ${getSwatchBorderClassName(colorId)}`}
                                                        style={{ backgroundColor: getHex(colorId) }}
                                                    />
                                                ))}
                                                <span className="ml-2 text-sm text-slate-700 font-bold">{member.colors[0]} × {member.colors[1]}</span>
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
