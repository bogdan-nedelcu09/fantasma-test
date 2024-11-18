/**
 *  IGT
 *  Copyright 2024 IGT
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {SimpleSlotInterfaceStatesEnum} from "app/modules/ui_module/component/simple-slot-interface-states-enum";
import {SimpleSlotPlayStopButton} from "app/modules/ui_module/component/simple-slot-play-stop-button";
import {SimpleSlotAbstractView} from "app/utils/abstracts/simple-slot-abstract-view";
import {SimpleSlotGlobalConstants} from "app/utils/constants/simple-slot-global-constants";
import {SimpleSlotScreenSize} from "app/utils/generics/simple-slot-screen-size";
import {SimpleSlotCallbackInterface} from "app/utils/interfaces/simple-slot-callback-interface";
import {Text} from "pixi.js";
import Container = PIXI.Container;

export class SimpleSlotUserInterfaceView extends SimpleSlotAbstractView {
    protected playButton: SimpleSlotPlayStopButton;
    protected balanceText: Text;
    protected betText: Text;
    protected winText: Text;
    protected viewState: SimpleSlotInterfaceStatesEnum = SimpleSlotInterfaceStatesEnum.None;

    /**
     * @inheritDoc
     * @param display
     */
    public onInit(display: Container): void {
        super.onInit(display);
        this.initUI();
    }

    /**
     * Sets up the play button
     * @param callBack
     */
    public setupPlayButton(callBack: SimpleSlotCallbackInterface): void {
        this.playButton = new SimpleSlotPlayStopButton(PIXI.loader.resources.PLAY.texture);
        this.playButton.setupTextures("PLAY", "STOP", "PLAY_DISABLED");
        this.playButton.scale.set(SimpleSlotGlobalConstants.universalScale);
        this.playButton.x = 3 * SimpleSlotScreenSize.width / 4;
        this.playButton.y = SimpleSlotScreenSize.height / 2 - (this.playButton.height / 2);

        this.playButton.interactive = true;
        this.playButton.accessible = true;
        this.playButton.buttonMode = true;
        this.playButton.cursor = "pointer";
        this.playButton.addListener("pointerup", () => {
            callBack.call(null);
        });

        this.display.addChild(this.playButton);
        this.viewState = SimpleSlotInterfaceStatesEnum.Play;
        this.playButton.updateState(SimpleSlotInterfaceStatesEnum.Play);
    }

    /**
     * Updates view / button state
     * @param newState
     */
    public updateViewState(newState: SimpleSlotInterfaceStatesEnum): void {
        this.viewState = newState;
        this.playButton.updateState(newState);
    }

    /**
     * Update bet text field
     * @param betValue
     */
    public updateBet(betValue: number): void {
        this.betText.text = "BET: " + betValue + "$";
    }

    /**
     * Update balance text field
     * @param balanceValue
     */
    public updateBalance(balanceValue: number): void {
        this.balanceText.text = "BALANCE: " + balanceValue + "$";
    }

    /**
     * Update win text field
     * @param winValue
     */
    public updateWin(winValue: number): void {
        let textValue: string = "";
        if (winValue > 0) {
            textValue = "WIN: " + winValue + "$";
        } else if (winValue < 0) {
            textValue = "INSUFFICIENT FUNDS";
        }
        this.winText.text = textValue;
    }

    /**
     * Initialise UI / text fields
     * @protected
     */
    protected initUI(): void {
        const gameName: Text = new Text("Fantasma - Wheel of will", SimpleSlotGlobalConstants.textStyleOptions);
        gameName.x = 50;
        gameName.y = 50;
        this.display.addChild(gameName);

        const gameInfo: Text = new Text("Payouts: \n\n" +
            "(ABC) \n" +
            "Different symbols = no win \n\n" +
            "(ABA) / (AAB) / (ABB) \n" +
            "2x same symbol = 2 x bet \n\n" +
            "(AAA) \n" +
            "3x same symbol = 3 x bet", SimpleSlotGlobalConstants.textStyleOptions);
        gameInfo.x = 50;
        gameInfo.y = 300;
        this.display.addChild(gameInfo);

        this.balanceText = new Text("BALANCE: 100$", SimpleSlotGlobalConstants.textStyleOptions);
        this.balanceText.x = 50;
        this.balanceText.y = SimpleSlotScreenSize.height - 75;
        this.display.addChild(this.balanceText);

        this.betText = new Text("BET: 1$", SimpleSlotGlobalConstants.textStyleOptions);
        this.betText.x = SimpleSlotScreenSize.width - 250;
        this.betText.y = SimpleSlotScreenSize.height - 75;
        this.display.addChild(this.betText);

        this.winText = new Text("", SimpleSlotGlobalConstants.textStyleOptions);
        this.winText.x = SimpleSlotScreenSize.width / 2;
        this.winText.y = SimpleSlotScreenSize.height - 75;
        this.display.addChild(this.winText);
    }
}
