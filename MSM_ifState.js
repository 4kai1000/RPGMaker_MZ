/*:
@target MZ
@plugindesc 条件付ステートの実装
@author 尸解仙ましゅまろ
 
@help
ステートAの間はステートBが入るような条件を設定できるようになります。
<ステート許可:ステートID>で許可ができます。
*/

(() => {

const _Game_Action_itemEffectAddState =
    Game_Action.prototype.itemEffectAddState;

Game_Action.prototype.itemEffectAddState = function(target, effect) {
    const stateId = effect.dataId;
    const state = $dataStates[stateId];

    if(state){
        const meta = state.meta["ステート許可"];

        if(meta){
            const permitIds = String(meta)
                .split(",")
                .map(id => Number(id.trim()))
                .filter(id => id > 0);

            const ok = permitIds.some(id => target.isStateAffected(id));

            if(!ok)return;
        }
    }

    _Game_Action_itemEffectAddState.call(this, target, effect);
};

})();
