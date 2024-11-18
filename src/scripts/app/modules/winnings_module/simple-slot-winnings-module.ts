/**
 *  Fantasma test project - Simple Slot
 *  Copyright 2024 Nedelcu Petrica Bogdan
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {SimpleSlotWinningsMediator} from "app/modules/winnings_module/mediator/simple-slot-winnings-mediator";
import {SimpleSlotWinningsView} from "app/modules/winnings_module/view/simple-slot-winnings-view";
import {SimpleSlotAbstractModule} from "app/utils/abstracts/simple-slot-abstract-module";
import Container = PIXI.Container;

export class SimpleSlotWinningsModule extends SimpleSlotAbstractModule {
    /**
     * @inheritDoc
     * @protected
     */
    protected createView(): void {
        this.view = new SimpleSlotWinningsView();
    }

    /**
     * @inheritDoc
     * @param display
     * @protected
     */
    protected createMediator(display?: Container): void {
        this.mediator = new SimpleSlotWinningsMediator();
        this.mediator.setView(this.view);
        this.mediator.setProxy(this.proxy);
        this.mediator.onInit(display);
    }
}
