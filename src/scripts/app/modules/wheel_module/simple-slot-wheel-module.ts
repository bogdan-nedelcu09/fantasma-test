/**
 *  IGT
 *  Copyright 2024 IGT
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */

import {SimpleSlotWheelMediator} from "app/modules/wheel_module/mediator/simple-slot-wheel-mediator";
import {SimpleSlotWheelProxy} from "app/modules/wheel_module/proxy/simple-slot-wheel-proxy";
import {SimpleSlotWheelView} from "app/modules/wheel_module/view/simple-slot-wheel-view";
import {SimpleSlotAbstractModule} from "app/utils/abstracts/simple-slot-abstract-module";
import Container = PIXI.Container;

export class SimpleSlotWheelModule extends SimpleSlotAbstractModule {
    /**
     * Returns custom view
     * @protected
     */
    protected get wheelView(): SimpleSlotWheelView {
        return (this.view as SimpleSlotWheelView);
    }

    /**
     * Returns custom proxy
     * @protected
     */
    protected get wheelProxy(): SimpleSlotWheelProxy {
        return (this.proxy as SimpleSlotWheelProxy);
    }

    /**
     * @inheritDoc
     * @param display
     */
    public postRegister(display?: PIXI.Container): void {
        super.postRegister(display);
        this.wheelView.setupAllSymbols(this.wheelProxy.allSymbolsArray);
    }

    /**
     * @inheritDoc
     * @protected
     */
    protected createProxy(): void {
        this.proxy = new SimpleSlotWheelProxy();
    }

    /**
     * @inheritDoc
     * @protected
     */
    protected createView(): void {
        this.view = new SimpleSlotWheelView();
    }

    /**
     * @inheritDoc
     * @param display
     * @protected
     */
    protected createMediator(display?: Container): void {
        this.mediator = new SimpleSlotWheelMediator();
        this.mediator.setView(this.view);
        this.mediator.setProxy(this.proxy);
        this.mediator.onInit(display);
    }
}
