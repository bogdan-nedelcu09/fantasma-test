/**
 *  Fantasma test project - Simple Slot
 *  Copyright 2024 Nedelcu Petrica Bogdan
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {SimpleSlotBackgroundMediator} from "app/modules/background_module/mediator/simple-slot-background-mediator";
import {SimpleSlotBackgroundView} from "app/modules/background_module/view/simple-slot-background-view";
import {SimpleSlotAbstractModule} from "app/utils/abstracts/simple-slot-abstract-module";
import Container = PIXI.Container;

export class SimpleSlotBackgroundModule extends SimpleSlotAbstractModule {
    /**
     * Custom Mediator getter
     * @protected
     */
    protected get backgroundMediator(): SimpleSlotBackgroundMediator {
        return (this.mediator as SimpleSlotBackgroundMediator);
    }

    /**
     * @inheritDoc
     * @param display
     */
    public postRegister(display?: PIXI.Container): void {
        super.postRegister(display);
        this.backgroundMediator.showNormalBackground();
    }

    /**
     * @inheritDoc
     * @protected
     */
    protected createView(): void {
        this.view = new SimpleSlotBackgroundView();
    }

    /**
     * @inheritDoc
     * @param display
     * @protected
     */
    protected createMediator(display?: Container): void {
        this.mediator = new SimpleSlotBackgroundMediator();
        this.mediator.setView(this.view);
        this.mediator.setProxy(this.proxy);
        this.mediator.onInit(display);
    }
}
