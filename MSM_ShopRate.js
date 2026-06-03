/*:
@target MZ
@plugindesc 変数ショップレート
@author 尸解仙ましゅまろ

@help

変数の値を倍率(%)として使用します。

変数n : 200 = 2.0倍
        100 = 1.0倍
         50 = 0.5倍

買値固定化するには <buyFixed:金額> 、
売値固定化するには <sellFixed:金額> を使用します。

@param BuyRateVariable
@text 購入レート変数
@type variable
@default 1

@param SellRateVariable
@text 売却レート変数
@type variable
@default 1
*/

(() => {

'use strict';

const params = PluginManager.parameters("MSM_ShopRate");

const BuyRateVariable  = Number(params.BuyRateVariable  || 10);
const SellRateVariable = Number(params.SellRateVariable || 11);

//------------------------------------------------------------------------
// ●レート取得
//------------------------------------------------------------------------

function buyRate() {
    if (!$gameVariables) return 1;

    const value = $gameVariables.value(BuyRateVariable);

    return value > 0 ? value / 100 : 1;
}

function sellRate() {
    if (!$gameVariables) return 0.5;

    const value = $gameVariables.value(SellRateVariable);

    return value > 0 ? value / 100 : 0.5;
}

//------------------------------------------------------------------------
// ●購入価格
//------------------------------------------------------------------------

Window_ShopBuy.prototype.makeItemList = function() {
    this._data = [];
    this._price = [];

    for( const goods of this._shopGoods ){
        const item = this.goodsToItem(goods);

        if( item ){
            this._data.push(item);
            if( goods[2] === 0 ) {
                if( item.meta["buyFixed"] ){
                    this._price.push(Number(item.meta["buyFixed"]));
                }else{
                    this._price.push(Math.floor(item.price * buyRate()));
                }
            }else{
                this._price.push(goods[3]);
            }
        }
    }
};

//------------------------------------------------------------------------
// ●売却価格
//------------------------------------------------------------------------

Scene_Shop.prototype.sellingPrice = function() {
    const item = this._item;
    if( item.meta["sellFixed"] )
        return Number(item.meta["sellFixed"]);
    else
        return Math.floor(this._item.price * sellRate());
};

})();
