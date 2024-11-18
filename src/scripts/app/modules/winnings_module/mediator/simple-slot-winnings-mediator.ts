/**
 *  Fantasma test project - Simple Slot
 *  Copyright 2024 Nedelcu Petrica Bogdan
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {SimpleSlotEndGameDecisionProxy} from "app/modules/game_logic_module/proxy/simple-slot-end-game-decision-proxy";
import {SimpleSlotWinningsView} from "app/modules/winnings_module/view/simple-slot-winnings-view";
import {SimpleSlotAbstractMediator} from "app/utils/abstracts/simple-slot-abstract-mediator";
import {SimpleSlotGlobalConstants} from "app/utils/constants/simple-slot-global-constants";

export class SimpleSlotWinningsMediator extends SimpleSlotAbstractMediator {
    /**
     * Returns custom view
     */
    public get view(): SimpleSlotWinningsView {
        return this._view as SimpleSlotWinningsView;
    }

    /**
     * @inheritDoc
     * @param display
     */
    public onInit(display: PIXI.Container): void {
        super.onInit(display);
        this.proxy.addEventListener(SimpleSlotGlobalConstants.ON_WINNINGS_EVENT,
            this.showWinnings.bind(this));
    }

    /**
     * Function called to highlight the winning symbols
     */
    public showWinnings(): void {
        this.view.showWinnings(SimpleSlotEndGameDecisionProxy.instance.symbolsHighlight,
            this.onWinningsDisplayEnd.bind(this));
    }

    /**
     * Callback for winnings end, will continue game flow
     * @protected
     */
    protected onWinningsDisplayEnd(): void {
        SimpleSlotEndGameDecisionProxy.instance.resetGameState();
    }
}
