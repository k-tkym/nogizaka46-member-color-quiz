import test from 'node:test';
import assert from 'node:assert/strict';
import { MEMBER_DATA } from '../src/data/members.js';
import { filterMembersByLatestSingleType, groupMembersByGen, LATEST_SINGLE_FILTER_OPTIONS } from '../src/memberListLogic.js';

test('member list filter options expose all, selected, and under', () => {
    assert.deepEqual(LATEST_SINGLE_FILTER_OPTIONS, [null, '選抜', 'アンダー']);
});

test('member list filter keeps all members when no latest single type is selected', () => {
    const filteredMembers = filterMembersByLatestSingleType(MEMBER_DATA, null);

    assert.equal(filteredMembers.length, MEMBER_DATA.length);
});

test('member list filter returns only selected members', () => {
    const filteredMembers = filterMembersByLatestSingleType(MEMBER_DATA, '選抜');

    assert.equal(filteredMembers.length, 18);
    assert.ok(filteredMembers.every((member) => member.latestSingleType === '選抜'));
    assert.equal(filteredMembers.some((member) => member.name === '小津玲奈'), false);
});

test('member list filter returns only under members', () => {
    const filteredMembers = filterMembersByLatestSingleType(MEMBER_DATA, 'アンダー');

    assert.equal(filteredMembers.length, 15);
    assert.ok(filteredMembers.every((member) => member.latestSingleType === 'アンダー'));
    assert.equal(filteredMembers.some((member) => member.name === '井上和'), false);
});

test('groupMembersByGen sorts groups in generation order after filtering', () => {
    const groupedMembers = groupMembersByGen(filterMembersByLatestSingleType(MEMBER_DATA, '選抜'));

    assert.deepEqual(groupedMembers.map(([gen]) => Number(gen)), [4, 5, 6]);
});
