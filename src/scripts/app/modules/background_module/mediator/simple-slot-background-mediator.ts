/**
 *  Fantasma test project - Simple Slot
 *  Copyright 2024 Nedelcu Petrica Bogdan
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {SimpleSlotBackgroundView} from "app/modules/background_module/view/simple-slot-background-view";
import {SimpleSlotAbstractMediator} from "app/utils/abstracts/simple-slot-abstract-mediator";
import {SimpleSlotBackgroundConstants} from "app/utils/constants/simple-slot-background-constants";

export class SimpleSlotBackgroundMediator extends SimpleSlotAbstractMediator {
    /**
     * Casts the abstract view to the module one
     */
    public get view(): SimpleSlotBackgroundView {
        return this._view as SimpleSlotBackgroundView;
    }

    /**
     * Init function, adds some events
     * @param display
     */
    public onInit(display: PIXI.Container): void {
        super.onInit(display);
        this.proxy.addEventListener(SimpleSlotBackgroundConstants.SHOW_NORMAL_BACKGROUND_EVENT,
            this.showNormalBackground.bind(this));
        this.proxy.addEventListener(SimpleSlotBackgroundConstants.SHOW_WINNINGS_BACKGROUND_EVENT,
            this.showWinningsBackground.bind(this));
    }

    /**
     * Function used to swap between normal / win background
     */
    public showNormalBackground(): void {
        this.view.showNormalBackground();
    }

    /**
     * Function used to swap between normal / win background
     */
    public showWinningsBackground(): void {
        this.view.showWinningsBackground();
    }
}
