import React, { useMemo } from "react";
import { MEMBER_DATA, OFFICIAL_COLORS } from "./data";

const getHex = (id) => OFFICIAL_COLORS.find((c) => c.id === id)?.hex || "#ccc";
const WHITE_COLOR_VALUES = new Set(["#fff", "#ffffff", "rgb(255,255,255)"]);

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
                                        <td className="py-2 px-3 font-bold text-slate-800">{member.name}</td>
                                        <td className="py-2 px-3">
                                            <div className="flex items-center gap-2">
                                                {member.colorIds.map((colorId, index) => {
                                                    const hex = getHex(colorId);
                                                    const normalizedHex = hex.toLowerCase().replace(/\s/g, "");
                                                    const isWhite = WHITE_COLOR_VALUES.has(normalizedHex);

                                                    return (
                                                        <span
                                                            key={`${member.id}-${index}-${colorId}`}
                                                            className={`w-7 h-7 rounded-full border-2 shadow-sm ${isWhite ? "border-slate-400" : "border-white"}`}
                                                            style={{ backgroundColor: hex }}
                                                        />
                                                    );
                                                })}
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
