import test from 'node:test';
import assert from 'node:assert/strict';
import { MEMBER_DATA } from '../src/data/members.js';
import { filterMembersBySingle41Type, groupMembersByGen, SINGLE41_FILTER_OPTIONS } from '../src/memberListLogic.js';

test('member list filter options expose all, selected, and under', () => {
    assert.deepEqual(SINGLE41_FILTER_OPTIONS, [null, '選抜', 'アンダー']);
});

test('member list filter keeps all members when no single41 type is selected', () => {
    const filteredMembers = filterMembersBySingle41Type(MEMBER_DATA, null);

    assert.equal(filteredMembers.length, MEMBER_DATA.length);
    assert.ok(filteredMembers.some((member) => member.single41Type === null));
});

test('member list filter returns only selected members', () => {
    const filteredMembers = filterMembersBySingle41Type(MEMBER_DATA, '選抜');

    assert.ok(filteredMembers.length > 0);
    assert.ok(filteredMembers.every((member) => member.single41Type === '選抜'));
    assert.equal(filteredMembers.some((member) => member.name === '小津玲奈'), false);
});

test('member list filter returns only under members', () => {
    const filteredMembers = filterMembersBySingle41Type(MEMBER_DATA, 'アンダー');

    assert.ok(filteredMembers.length > 0);
    assert.ok(filteredMembers.every((member) => member.single41Type === 'アンダー'));
    assert.equal(filteredMembers.some((member) => member.name === '梅澤美波'), false);
});

test('groupMembersByGen sorts groups in generation order after filtering', () => {
    const groupedMembers = groupMembersByGen(filterMembersBySingle41Type(MEMBER_DATA, '選抜'));

    assert.deepEqual(groupedMembers.map(([gen]) => Number(gen)), [3, 4, 5]);
});
