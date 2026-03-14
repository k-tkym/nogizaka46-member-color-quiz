import { COLOR_MAP } from './colors.js';

// single41Type: 41枚目シングルにおける区分 ('senbatsu' | 'under' | null)
const MEMBER_DATA_RAW = [
    { name: '伊藤理々杏', gen: 3, colors: ['紫', '赤'], single41Type: 'under' },
    { name: '岩本蓮加', gen: 3, colors: ['ピンク', '赤'], single41Type: 'under' },
    { name: '梅澤美波', gen: 3, colors: ['青', '水色'], single41Type: 'senbatsu' },
    { name: '吉田綾乃クリスティー', gen: 3, colors: ['紫', 'ピンク'], single41Type: 'under' },
    { name: '遠藤さくら', gen: 4, colors: ['白', 'ピンク'], single41Type: 'senbatsu' },
    { name: '賀喜遥香', gen: 4, colors: ['オレンジ', '緑'], single41Type: 'senbatsu' },
    { name: '金川紗耶', gen: 4, colors: ['赤', '水色'], single41Type: 'under' },
    { name: '柴田柚菜', gen: 4, colors: ['青', '黄緑'], single41Type: 'under' },
    { name: '田村真佑', gen: 4, colors: ['紫', '水色'], single41Type: 'senbatsu' },
    { name: '筒井あやめ', gen: 4, colors: ['紫', '紫'], single41Type: 'senbatsu' },
    { name: '黒見明香', gen: 4, colors: ['紫', '緑'], single41Type: 'under' },
    { name: '佐藤璃果', gen: 4, colors: ['ピンク', 'ターコイズ'], single41Type: 'under' },
    { name: '林瑠奈', gen: 4, colors: ['ピンク', 'ピンク'], single41Type: 'senbatsu' },
    { name: '弓木奈於', gen: 4, colors: ['赤', '黄緑'], single41Type: 'senbatsu' },
    { name: '五百城茉央', gen: 5, colors: ['ターコイズ', '青'], single41Type: 'senbatsu' },
    { name: '池田瑛紗', gen: 5, colors: ['白', '緑'], single41Type: 'senbatsu' },
    { name: '一ノ瀬美空', gen: 5, colors: ['水色', '水色'], single41Type: 'senbatsu' },
    { name: '井上和', gen: 5, colors: ['白', '赤'], single41Type: 'senbatsu' },
    { name: '岡本姫奈', gen: 5, colors: ['紫', '青'], single41Type: 'under' },
    { name: '小川彩', gen: 5, colors: ['白', '白'], single41Type: 'senbatsu' },
    { name: '奥田いろは', gen: 5, colors: ['ピンク', '黄緑'], single41Type: 'under' },
    { name: '川﨑桜', gen: 5, colors: ['ピンク', '緑'], single41Type: 'senbatsu' },
    { name: '菅原咲月', gen: 5, colors: ['ピンク', '水色'], single41Type: 'senbatsu' },
    { name: '冨里奈央', gen: 5, colors: ['ターコイズ', 'ターコイズ'], single41Type: 'senbatsu' },
    { name: '中西アルノ', gen: 5, colors: ['ターコイズ', '水色'], single41Type: 'senbatsu' },
    { name: '愛宕心響', gen: 6, colors: ['ピンク', '青'], single41Type: 'under' },
    { name: '大越ひなの', gen: 6, colors: ['白', '黄'], single41Type: 'under' },
    { name: '小津玲奈', gen: 6, colors: ['紫', 'ターコイズ'], single41Type: null },
    { name: '川端晃菜', gen: 6, colors: ['水色', '緑'], single41Type: 'under' },
    { name: '海邉朱莉', gen: 6, colors: ['青', '赤'], single41Type: 'under' },
    { name: '鈴木佑捺', gen: 6, colors: ['水色', '白'], single41Type: 'under' },
    { name: '瀬戸口心月', gen: 6, colors: ['青', '黄'], single41Type: 'under' },
    { name: '長嶋凛桜', gen: 6, colors: ['ピンク', 'オレンジ'], single41Type: 'under' },
    { name: '増田三莉音', gen: 6, colors: ['青', '青'], single41Type: 'under' },
    { name: '森平麗心', gen: 6, colors: ['黄', '黄'], single41Type: 'under' },
    { name: '矢田萌華', gen: 6, colors: ['白', '紫'], single41Type: 'under' },
];

export const MEMBER_DATA = MEMBER_DATA_RAW.map((member, index) => ({
    id: `m-${index}`,
    ...member,
    colorIds: member.colors.map((color) => COLOR_MAP[color]),
}));

// 41枚目シングル 選抜・アンダー区分のラベル
export const SINGLE41_TYPE_LABELS = {
    senbatsu: '選抜',
    under: 'アンダー',
};
