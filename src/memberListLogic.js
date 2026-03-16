export const SINGLE41_FILTER_OPTIONS = [null, '選抜', 'アンダー'];

export const filterMembersBySingle41Type = (members, single41Type) =>
    members.filter((member) => single41Type === null || member.single41Type === single41Type);

export const groupMembersByGen = (members) => {
    const grouped = {};

    members.forEach((member) => {
        if (!grouped[member.gen]) grouped[member.gen] = [];
        grouped[member.gen].push(member);
    });

    return Object.entries(grouped).sort(([genA], [genB]) => Number(genA) - Number(genB));
};
