/**
 *  Fantasma test project - Simple Slot
 *  Copyright 2024 Nedelcu Petrica Bogdan
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {SimpleSlotAbstractMediator} from "app/utils/abstracts/simple-slot-abstract-mediator";
import {SimpleSlotAbstractProxy} from "app/utils/abstracts/simple-slot-abstract-proxy";
import {SimpleSlotAbstractView} from "app/utils/abstracts/simple-slot-abstract-view";
import * as _ from "lodash";
import Container = PIXI.Container;

export class SimpleSlotAbstractModule {
    protected view: SimpleSlotAbstractView;
    protected mediator: SimpleSlotAbstractMediator;
    protected proxy: SimpleSlotAbstractProxy;
    protected appTicker: PIXI.ticker.Ticker;

    /**
     * Post register callback, sets up components
     * @param display
     */
    public postRegister(display?: Container): void {
        this.createProxy();
        if (!_.isNil(display)) {
            this.createView();
            this.createMediator(display);
        }
    }

    /**
     * Gets the ticker reference from main pixi app, and sends it to the view as well
     * @param ticker
     */
    public shareTicker(ticker: PIXI.ticker.Ticker): void {
        this.appTicker = ticker;
        this.view.shareTicker(this.appTicker);
    }

    /**
     * Cleanup callback
     */
    public onCleanup(): void {
        if (!_.isNil(this.view)) {
            this.view.onCleanup();
            this.mediator.onCleanup();
        }
    }

    /**
     * Creates the module proxy
     * @protected
     */
    protected createProxy(): void {
        this.proxy = new SimpleSlotAbstractProxy();
    }

    /**
     * Creates the module view
     * @protected
     */
    protected createView(): void {
        this.view = new SimpleSlotAbstractView();
    }

    /**
     * Creates the module mediator
     * @protected
     */
    protected createMediator(display?: Container): void {
        this.mediator = new SimpleSlotAbstractMediator();
        this.mediator.setView(this.view);
        this.mediator.setProxy(this.proxy);
        this.mediator.onInit(display);
    }
}
