/**
 *  IGT
 *  Copyright 2024 IGT
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {SimpleSlotMoneyAtm} from "app/modules/money_module/component/simple-slot-money-atm";
import {SimpleSlotMoneyProxy} from "app/modules/money_module/proxy/simple-slot-money-proxy";
import {SimpleSlotAbstractModule} from "app/utils/abstracts/simple-slot-abstract-module";
import Container = PIXI.Container;

export class SimpleSlotMoneyModule extends SimpleSlotAbstractModule {
    /**
     * @inheritDoc
     * @param display
     */
    public postRegister(display?: Container): void {
        super.postRegister(display);
        this.setupATM();
    }

    /**
     * Sets up the ATM - entry point for all transactions
     * @protected
     */
    protected setupATM(): void {
        const moneyATM: SimpleSlotMoneyAtm = new SimpleSlotMoneyAtm();
        moneyATM.moneyProxy = this.proxy as SimpleSlotMoneyProxy;
    }

    /**
     * @inheritDoc
     * @protected
     */
    protected createProxy(): void {
        this.proxy = new SimpleSlotMoneyProxy();
    }
}
