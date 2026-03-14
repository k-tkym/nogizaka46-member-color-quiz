import test from 'node:test';
import assert from 'node:assert/strict';
import { MEMBER_DATA } from '../src/data/members.js';
import { COLOR_MAP } from '../src/data/colors.js';
import { getPairKey, isCorrectColorPair } from '../src/quizLogic.js';

test('all members have exactly two mapped color IDs', () => {
    for (const member of MEMBER_DATA) {
        assert.equal(member.colors.length, 2);
        assert.equal(member.colorIds.length, 2);
        assert.ok(member.colorIds.every((colorId) => typeof colorId === 'string' && colorId.length > 0));
    }
});

test('raw member colors are covered by COLOR_MAP', () => {
    const knownColors = new Set(Object.keys(COLOR_MAP));

    for (const member of MEMBER_DATA) {
        for (const color of member.colors) {
            assert.ok(knownColors.has(color), `${member.name} has an unmapped color: ${color}`);
        }
    }
});

test('member IDs are unique', () => {
    const memberIds = MEMBER_DATA.map((member) => member.id);
    assert.equal(new Set(memberIds).size, memberIds.length);
});

test('getPairKey is order-independent', () => {
    assert.equal(getPairKey(['red', 'blue']), getPairKey(['blue', 'red']));
    assert.notEqual(getPairKey(['red', 'blue']), getPairKey(['red', 'green']));
});

test('isCorrectColorPair matches regardless of answer order', () => {
    assert.equal(isCorrectColorPair(['pink', 'white'], ['white', 'pink']), true);
    assert.equal(isCorrectColorPair(['purple', 'purple'], ['purple', 'purple']), true);
    assert.equal(isCorrectColorPair(['purple', 'white'], ['purple', 'pink']), false);
});
