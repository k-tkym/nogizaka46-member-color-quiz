export const LATEST_SINGLE_FILTER_OPTIONS = [null, '選抜', 'アンダー'];

export const filterMembersByLatestSingleType = (members, latestSingleType) =>
    members.filter((member) => latestSingleType === null || member.latestSingleType === latestSingleType);

export const groupMembersByGen = (members) => {
    const grouped = {};

    members.forEach((member) => {
        if (!grouped[member.gen]) grouped[member.gen] = [];
        grouped[member.gen].push(member);
    });

    return Object.entries(grouped).sort(([genA], [genB]) => Number(genA) - Number(genB));
};
