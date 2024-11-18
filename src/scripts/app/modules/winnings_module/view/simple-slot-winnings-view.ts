/**
 *  Fantasma test project - Simple Slot
 *  Copyright 2024 Nedelcu Petrica Bogdan
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {SimpleSlotAbstractView} from "app/utils/abstracts/simple-slot-abstract-view";
import {SimpleSlotGlobalConstants} from "app/utils/constants/simple-slot-global-constants";
import {SimpleSlotWinningsConstants} from "app/utils/constants/simple-slot-winnings-constants";
import {SimpleSlotResourceLoader} from "app/utils/generics/simple-slot-resource-loader";
import {SimpleSlotScreenSize} from "app/utils/generics/simple-slot-screen-size";
import {SimpleSlotCallbackInterface} from "app/utils/interfaces/simple-slot-callback-interface";
import {AssetPriority} from "pixi-assets-loader";
import Sprite = PIXI.Sprite;

export class SimpleSlotWinningsView extends SimpleSlotAbstractView {
    protected symbolsFrame: Array<Sprite> = [];
    protected winningsInProgress: boolean = false;
    protected winningsStartTime: number;
    protected symbolAlignOffset: number = 11;

    /**
     * Displays the symbol frame highlight for the winning symbols
     * @param symbolsHighlight
     * @param callback
     */
    public showWinnings(symbolsHighlight: string, callback: SimpleSlotCallbackInterface): void {
        const highlightArray: Array<string> = symbolsHighlight.split("");
        for (let i = 0; i < highlightArray.length; i++) {
            this.symbolsFrame[i].visible = highlightArray[i] === "1";
        }
        this.winningsInProgress = true;
        this.winningsStartTime = Date.now();

        this.appTicker.add(() => {
            if (!this.winningsInProgress) {
                return;
            }
            const now: number = Date.now();
            if (now - this.winningsStartTime > SimpleSlotWinningsConstants.winDisplayDuration) {
                for (let i: number = 0; i < highlightArray.length; i++) {
                    this.winningsInProgress = false;
                    this.symbolsFrame[i].visible = false;
                    callback.call(null);
                }
            }
        });
    }

    /**
     * @inheritDoc
     * @protected
     */
    protected setResourcesNeeded(): void {
        const assets = [
            {id: "WIN_BG", url: "assets/graphics/WIN_BG.png", priority: AssetPriority.LOW, type: "texture"},
        ];
        SimpleSlotResourceLoader.instance.addAssets(assets, this.onAllAssetsLoaded.bind(this));
    }

    /**
     * Callback for assets loaded, sets up the symbols frame
     * @protected
     */
    protected onAllAssetsLoaded(): void {
        this.addSymbolsFrame();
    }

    /**
     * Adds the symbols highlight frames to display
     * @protected
     */
    protected addSymbolsFrame(): void {
        for (let i = 0; i < 3; i++) {
            const symbolFrame: Sprite = new Sprite(PIXI.loader.resources.WIN_BG.texture);
            symbolFrame.scale.set(SimpleSlotGlobalConstants.universalScale);
            symbolFrame.x = SimpleSlotScreenSize.width / 3 + this.symbolAlignOffset;
            symbolFrame.y = SimpleSlotScreenSize.height / 2 - (symbolFrame.height / 2) + symbolFrame.height * (i - 1);
            symbolFrame.visible = false;
            this.symbolsFrame.push(symbolFrame);
            this.display.addChild(symbolFrame);
        }
    }
}
