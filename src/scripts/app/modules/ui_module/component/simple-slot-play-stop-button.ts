/**
 *  IGT
 *  Copyright 2024 IGT
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */

import {SimpleSlotInterfaceStatesEnum} from "app/modules/ui_module/component/simple-slot-interface-states-enum";
import {Sprite, Texture} from "pixi.js";

export class SimpleSlotPlayStopButton extends Sprite {
    protected playTexture: Texture;
    protected stopTexture: Texture;
    protected disabledTexture: Texture;
    protected buttonState: SimpleSlotInterfaceStatesEnum = SimpleSlotInterfaceStatesEnum.None;
    protected textureMap: Array<Texture> = [];

    constructor(texture?: Texture) {
        super(texture);
    }

    /**
     * Sets up the button textures
     * @param playTexture
     * @param stopTexture
     * @param disabledTexture
     */
    public setupTextures(playTexture: string, stopTexture: string, disabledTexture: string): void {
        this.playTexture = PIXI.loader.resources[playTexture].texture;
        this.stopTexture = PIXI.loader.resources[stopTexture].texture;
        this.disabledTexture = PIXI.loader.resources[disabledTexture].texture;
        this.textureMap = [null, this.playTexture, this.stopTexture, this.disabledTexture];
    }

    /**
     * Updates button state
     * @param newButtonState
     */
    public updateState(newButtonState: SimpleSlotInterfaceStatesEnum): void {
        this.buttonState = newButtonState;
        this.texture = this.textureMap[newButtonState];
    }
}
