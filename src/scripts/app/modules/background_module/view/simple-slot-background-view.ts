/**
 *  Fantasma test project - Simple Slot
 *  Copyright 2024 Nedelcu Petrica Bogdan
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {SimpleSlotAbstractView} from "app/utils/abstracts/simple-slot-abstract-view";
import {SimpleSlotBackgroundConstants} from "app/utils/constants/simple-slot-background-constants";
import {SimpleSlotGlobalConstants} from "app/utils/constants/simple-slot-global-constants";
import {SimpleSlotResourceLoader} from "app/utils/generics/simple-slot-resource-loader";
import {SimpleSlotScreenSize} from "app/utils/generics/simple-slot-screen-size";
import {AssetPriority} from "pixi-assets-loader";
import Container = PIXI.Container;
import Sprite = PIXI.Sprite;

export class SimpleSlotBackgroundView extends SimpleSlotAbstractView {
    protected screenBorder: PIXI.Graphics;

    /**
     * Init function, will set up the game scene graphic border
     * @param display
     */
    public onInit(display: Container): void {
        super.onInit(display);
        this.setupScreenBorder();
    }

    /**
     * Function used to swap between normal / win background
     */
    public showNormalBackground(): void {
        this.screenBorder.lineStyle(SimpleSlotBackgroundConstants.frameWidth, 0xFF00FF, 1);
        this.drawBorder();
    }

    /**
     * Function used to swap between normal / win background
     */
    public showWinningsBackground(): void {
        this.screenBorder.lineStyle(SimpleSlotBackgroundConstants.frameWidth, 0xFFFF00, 1);
        this.drawBorder();
    }

    /**
     * Function used to set up the border graphics
     */
    protected setupScreenBorder(): void {
        this.screenBorder = new PIXI.Graphics();
        this.screenBorder.lineStyle(SimpleSlotBackgroundConstants.frameWidth, 0xFF00FF, 1);
        this.drawBorder();
        this.display.addChild(this.screenBorder);
    }

    /**
     * Function used to draw the border graphics
     */
    protected drawBorder(): void {
        const width: number = SimpleSlotBackgroundConstants.frameWidth;
        const halfWidth: number = width / 2;
        this.screenBorder.drawRect(halfWidth, halfWidth,
            SimpleSlotScreenSize.width - width, SimpleSlotScreenSize.height - width);
    }

    /**
     * @inheritDoc
     * @protected
     */
    protected setResourcesNeeded(): void {
        const assets = [
            {id: "REEL", url: "assets/graphics/REEL.png", priority: AssetPriority.LOW, type: "texture"},
        ];
        SimpleSlotResourceLoader.instance.addAssets(assets, this.onAllAssetsLoaded.bind(this));
    }

    /**
     * Callback for assets loaded, will setup the UI
     * @protected
     */
    protected onAllAssetsLoaded(): void {
        this.addReelFrame();
    }

    /**
     * Adds the reel frame
     * @protected
     */
    protected addReelFrame(): void {
        const reelFrame: Sprite = new Sprite(PIXI.loader.resources.REEL.texture);
        reelFrame.scale.set(SimpleSlotGlobalConstants.universalScale);
        reelFrame.x = SimpleSlotScreenSize.width / 3;
        reelFrame.y = SimpleSlotScreenSize.height / 2 - (reelFrame.height / 2);
        this.display.addChild(reelFrame);
    }
}
