/*:
@target MZ
@plugindesc MPダメージ・吸収時にもダメージSEを再生
@author 尸解仙ましゅまろ

@help
MPダメージ、HP・MPダメージのタイミングに
HPダメージと同じ効果音を再生します。
(他の効果音系プラグインと競合する可能性があります。)
*/

(() => {
'use strict';

const _Game_Action_apply = Game_Action.prototype.apply;

Game_Action.prototype.apply = function(target) {

    _Game_Action_apply.call(this, target);

    const type = this.item().damage.type;

    target._isDrainDamage =
        (type === 5 || type === 6) &&
        (target.result().hpDamage > 0 ||
         target.result().mpDamage > 0);
};

const _Sprite_Damage_setup =Sprite_Damage.prototype.setup;

Sprite_Damage.prototype.setup = function(target) {

    const result = target.result();

    const isMpDamage = result.mpDamage > 0;
    const isDrain = target._isDrainDamage;
                    
    const needSe = (isMpDamage||isDrain);

    if(needSe){
        if(target.isActor()){ 
            SoundManager.playActorDamage();
        }else{
            SoundManager.playEnemyDamage();
        }
    }

    _Sprite_Damage_setup.call(this, target);
    target._isDrainDamage = false;

};

})();

