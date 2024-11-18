/**
 *  IGT
 *  Copyright 2024 IGT
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {SimpleSlotViewInterface} from "app/utils/interfaces/simple-slot-view-interface";
import {PixiAppWrapper as Wrapper} from "pixi-app-wrapper";
import Container = PIXI.Container;

export class SimpleSlotAbstractView implements SimpleSlotViewInterface {
    public display: Container;
    public appTicker: PIXI.ticker.Ticker;

    /**
     * Init function
     * @param display
     */
    public onInit(display: Container): void {
        this.display = display;
        this.setResourcesNeeded();
    }

    /**
     * Saves ticker refference
     * @param ticker
     */
    public shareTicker(ticker: PIXI.ticker.Ticker): void {
        this.appTicker = ticker;
    }

    /**
     * Cleanup function
     */
    public onCleanup(): void {
        this.display = undefined;
    }

    /**
     * Visibility handler
     * @param visible
     */
    public setVisible(visible: boolean): void {
        this.display.visible = visible;
    }

    /**
     * Sets up the needed resources
     * @protected
     */
    protected setResourcesNeeded(): void {
        /**
         * Override where needed
         */
    }
}
