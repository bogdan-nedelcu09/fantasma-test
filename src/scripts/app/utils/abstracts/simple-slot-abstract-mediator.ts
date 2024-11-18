/**
 *  IGT
 *  Copyright 2024 IGT
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {SimpleSlotAbstractProxy} from "app/utils/abstracts/simple-slot-abstract-proxy";
import {SimpleSlotAbstractView} from "app/utils/abstracts/simple-slot-abstract-view";
import {SimpleSlotMediatorInterface} from "app/utils/interfaces/simple-slot-mediator-interface";
import Container = PIXI.Container;
import * as _ from "lodash";

export class SimpleSlotAbstractMediator implements SimpleSlotMediatorInterface {
    protected _proxy: SimpleSlotAbstractProxy;
    protected _view: SimpleSlotAbstractView;

    /**
     * Returns the view
     */
    public get view(): SimpleSlotAbstractView {
        return this._view;
    }

    /**
     * Returns the proxy
     */
    public get proxy(): SimpleSlotAbstractProxy {
        return this._proxy;
    }

    /**
     * Sets the view
     * @param view
     */
    public setView(view: SimpleSlotAbstractView): void {
        this._view = view;
    }

    /**
     * Sets the proxy
     * @param proxy
     */
    public setProxy(proxy: SimpleSlotAbstractProxy): void {
        this._proxy = proxy;
    }

    /**
     * On init callback
     * @param display
     */
    public onInit(display: Container): void {
        if (_.isNil(this.view)) {
            return;
        }
        this.view.onInit(display);
    }

    /**
     * On cleanup callback
     */
    public onCleanup(): void {
        if (_.isNil(this.view)) {
            return;
        }
        this.view.onCleanup();
        this._view = undefined;
    }

    /**
     * Sets the visibility of the view
     * @param visible
     */
    public setVisible(visible: boolean): void {
        if (_.isNil(this.view)) {
            return;
        }
        this.view.setVisible(visible);
    }
}
