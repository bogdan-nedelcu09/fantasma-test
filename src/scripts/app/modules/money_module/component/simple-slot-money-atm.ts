/**
 *  Fantasma test project - Simple Slot
 *  Copyright 2024 Nedelcu Petrica Bogdan
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {SimpleSlotMoneyProxy} from "app/modules/money_module/proxy/simple-slot-money-proxy";
import {WinningType} from "app/utils/constants/simple-slot-winnings-constants";

export class SimpleSlotMoneyAtm {
    protected static _instance: SimpleSlotMoneyAtm;
    protected _moneyProxy: SimpleSlotMoneyProxy;

    constructor() {
        if (SimpleSlotMoneyAtm._instance) {
            throw new Error("SimpleSlotEventDispatcher class is not to be instantiated. Please use Settings.instance ");
        }
        SimpleSlotMoneyAtm._instance = this;
    }

    /**
     * Returns the instance of SimpleSlotMoneyAtm
     */
    public static get instance(): SimpleSlotMoneyAtm {
        return this._instance;
    }

    /**
     * Sets the money proxy reference
     * @param moneyProxy
     */
    public set moneyProxy(moneyProxy: SimpleSlotMoneyProxy) {
        this._moneyProxy = moneyProxy;
    }

    /**
     * Returns player's balance
     */
    public getBalance(): number {
        return this._moneyProxy.getBalance();
    }

    /**
     * Validates that user can place the bet
     */
    public validateBet(): boolean {
        return this._moneyProxy.validateBet();
    }

    /**
     * Subtracts the bet from the player's balance
     */
    public deductBet(): void {
        this._moneyProxy.deductBet();
    }

    /**
     * Adds the winnings to the player's balance
     * @param winType
     */
    public awardWinnings(winType: WinningType): void {
        this._moneyProxy.awardWinnings(winType);
    }

    /**
     * Destroy cleanup
     */
    public onDestroy(): void {
        SimpleSlotMoneyAtm._instance = undefined;
    }
}
