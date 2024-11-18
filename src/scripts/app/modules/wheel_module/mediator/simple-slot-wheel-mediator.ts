/**
 *  IGT
 *  Copyright 2024 IGT
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {SimpleSlotEndGameDecisionProxy} from "app/modules/game_logic_module/proxy/simple-slot-end-game-decision-proxy";
import {SimpleSlotWheelView} from "app/modules/wheel_module/view/simple-slot-wheel-view";
import {SimpleSlotAbstractMediator} from "app/utils/abstracts/simple-slot-abstract-mediator";
import {SimpleSlotGlobalConstants} from "app/utils/constants/simple-slot-global-constants";

export class SimpleSlotWheelMediator extends SimpleSlotAbstractMediator {
    /**
     * @inheritDoc
     */
    public get view(): SimpleSlotWheelView {
        return this._view as SimpleSlotWheelView;
    }

    /**
     * @inheritDoc
     * @param display
     */
    public onInit(display: PIXI.Container): void {
        super.onInit(display);
        this.proxy.addEventListener(SimpleSlotGlobalConstants.ON_SPIN_EVENT,
            this.spinWheel.bind(this));
        this.proxy.addEventListener(SimpleSlotGlobalConstants.ON_STOP_EVENT,
            this.stopWheel.bind(this));
    }

    /**
     * Function called on spin start, will start the wheel movement flow
     * @protected
     */
    protected spinWheel(): void {
        this.view.startSpin(this.onSpinEnd.bind(this));
    }

    /**
     * Function called when the user presses stop, will force stop the wheel
     * @protected
     */
    protected stopWheel(): void {
        this.view.stopSpin();
    }

    /**
     * Callback for wheel stopped movement flow
     * @protected
     */
    protected onSpinEnd(): void {
        SimpleSlotEndGameDecisionProxy.instance.checkWinnings(this.view.symbolsInView);
    }
}
