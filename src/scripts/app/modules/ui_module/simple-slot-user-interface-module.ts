/**
 *  Fantasma test project - Simple Slot
 *  Copyright 2024 Nedelcu Petrica Bogdan
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */

import {SimpleSlotUserInterfaceMediator} from "app/modules/ui_module/mediator/simple-slot-user-interface-mediator";
import {SimpleSlotUserInterfaceProxy} from "app/modules/ui_module/proxy/simple-slot-user-interface-proxy";
import {SimpleSlotUserInterfaceView} from "app/modules/ui_module/view/simple-slot-user-interface-view";
import {SimpleSlotAbstractModule} from "app/utils/abstracts/simple-slot-abstract-module";
import Container = PIXI.Container;

export class SimpleSlotUserInterfaceModule extends SimpleSlotAbstractModule {
    /**
     * @inheritDoc
     * @param display
     */
    public postRegister(display?: PIXI.Container): void {
        super.postRegister(display);
    }

    /**
     * @inheritDoc
     * @protected
     */
    protected createProxy(): void {
        this.proxy = new SimpleSlotUserInterfaceProxy();
    }

    /**
     * @inheritDoc
     * @protected
     */
    protected createView(): void {
        this.view = new SimpleSlotUserInterfaceView();
    }

    /**
     * @inheritDoc
     * @param display
     * @protected
     */
    protected createMediator(display?: Container): void {
        this.mediator = new SimpleSlotUserInterfaceMediator();
        this.mediator.setView(this.view);
        this.mediator.setProxy(this.proxy);
        this.mediator.onInit(display);
    }
}
