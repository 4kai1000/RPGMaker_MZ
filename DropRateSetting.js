/*:
 * @target MZ
 * @plugindesc 獲得賞金・アイテムドロップ率計算法変更
 * @author 尸解仙ましゅまろ
 * @version 1.0
 * 
 * @help
 * 武器や防具の特徴である"獲得金額2倍","アイテム入手率2倍"を廃止。
 * 2倍オンリーとかいらねーもんな！
 * 以下をメモ欄に記載
 * <GoldRate:数値>：獲得金額の変更
 * <DropRate:数値>：アイテム入手率の変更
 * 例
 * <GoldRate:1.2>：獲得金額1.2倍
 * <DropRate:1.5>：アイテム入手率1.5倍
 *
 */

(() => {

function totalMetaRate(objects, tag) {
    let rate = 1;
    for (const obj of objects) {
        if (!obj) continue;
        const value = obj.meta[tag];
        if (value) rate *= Number(value);
    }
    return rate;
}

const _BattleManager_makeRewards = BattleManager.makeRewards;
BattleManager.makeRewards = function() {
    _BattleManager_makeRewards.call(this);

    const members = $gameParty.members();
    let rate = 1;

    for (const actor of members) {
        rate *= totalMetaRate(actor.traitObjects(), "GoldRate");
    }

    this._rewards.gold = Math.floor(this._rewards.gold * rate);
};

const _Game_Party_hasDropItemDouble = Game_Party.prototype.hasDropItemDouble;
Game_Party.prototype.hasDropItemDouble = function() {
    return false;
};

const _Game_Enemy_dropItemRate = Game_Enemy.prototype.dropItemRate;
Game_Enemy.prototype.dropItemRate = function() {
    let rate = _Game_Enemy_dropItemRate.call(this);

    let partyRate = 1;
    for (const actor of $gameParty.members()) {
        partyRate *= totalMetaRate(actor.traitObjects(), "DropRate");
    }

    return rate * partyRate;
};

})();
