/**
 *  Fantasma test project - Simple Slot
 *  Copyright 2024 Nedelcu Petrica Bogdan
 *  All Rights Reserved.
 *
 *  NOTICE: You may not use, distribute or modify this document without the
 *  written permission of its copyright owner
 */
import {SimpleSlotEndGameDecisionProxy} from "app/modules/game_logic_module/proxy/simple-slot-end-game-decision-proxy";
import {SimpleSlotMoneyAtm} from "app/modules/money_module/component/simple-slot-money-atm";
import {SimpleSlotInterfaceStatesEnum} from "app/modules/ui_module/component/simple-slot-interface-states-enum";
import {SimpleSlotUserInterfaceProxy} from "app/modules/ui_module/proxy/simple-slot-user-interface-proxy";
import {SimpleSlotUserInterfaceView} from "app/modules/ui_module/view/simple-slot-user-interface-view";
import {SimpleSlotAbstractMediator} from "app/utils/abstracts/simple-slot-abstract-mediator";
import {SimpleSlotGlobalConstants} from "app/utils/constants/simple-slot-global-constants";
import {SimpleSlotWalletConstants} from "app/utils/constants/simple-slot-wallet-constants";
import {SimpleSlotResourceLoader} from "app/utils/generics/simple-slot-resource-loader";
import {AssetPriority} from "pixi-assets-loader";

export class SimpleSlotUserInterfaceMediator extends SimpleSlotAbstractMediator {
    /**
     * @inheritDoc
     * Custom view getter
     */
    public get view(): SimpleSlotUserInterfaceView {
        return this._view as SimpleSlotUserInterfaceView;
    }

    /**
     * @inheritDoc
     * Custom proxy getter
     */
    public get proxy(): SimpleSlotUserInterfaceProxy {
        return this._proxy as SimpleSlotUserInterfaceProxy;
    }

    /**
     * @inheritDoc
     * @param display
     */
    public onInit(display: PIXI.Container): void {
        super.onInit(display);
        this.setResourcesNeeded();
    }

    /**
     * Adds needed textures to the loader que
     * @protected
     */
    protected setResourcesNeeded(): void {
        const assets = [
            {id: "PLAY", url: "assets/graphics/PLAY.png", priority: AssetPriority.HIGH, type: "texture"},
            {id: "STOP", url: "assets/graphics/STOP.png", priority: AssetPriority.HIGH, type: "texture"},
            {id: "PLAY_DISABLED", url: "assets/graphics/PLAY_DISABLED.png", priority: AssetPriority.HIGH, type: "texture"},
        ];
        SimpleSlotResourceLoader.instance.addAssets(assets, this.onAllAssetsLoaded.bind(this));
    }

    /**
     * Callback for resources loaded, will setup UI
     * @protected
     */
    protected onAllAssetsLoaded(): void {
        this.proxy.currentInterfaceState = SimpleSlotInterfaceStatesEnum.Play;
        this.view.setupPlayButton(this.onButtonClick.bind(this));
        this.proxy.addEventListener(SimpleSlotGlobalConstants.ON_WINNINGS_EVENT, this.onWinningsState.bind(this));
        this.proxy.addEventListener(SimpleSlotGlobalConstants.ON_FULL_SPIN_END, this.onFullSpinEnd.bind(this));
        this.updateBalance();
        this.updateBet();
    }

    /**
     * Called at spin end, will update the UI
     * @protected
     */
    protected onFullSpinEnd(): void {
        this.updateBalance();
        const canSpin: boolean = SimpleSlotMoneyAtm.instance.validateBet();
        if (canSpin) {
            this.proxy.currentInterfaceState = SimpleSlotInterfaceStatesEnum.Play;
            this.view.updateViewState(SimpleSlotInterfaceStatesEnum.Play);
            this.clearWin();
        } else {
            this.proxy.currentInterfaceState = SimpleSlotInterfaceStatesEnum.Disable;
            this.view.updateViewState(SimpleSlotInterfaceStatesEnum.Disable);
            this.showInsufficientFunds();
        }
    }

    /**
     * Called when transitioning to win presentation state, will update UI
     * @protected
     */
    protected onWinningsState(): void {
        this.proxy.currentInterfaceState = SimpleSlotInterfaceStatesEnum.Disable;
        this.view.updateViewState(SimpleSlotInterfaceStatesEnum.Disable);
        this.updateBalance();
        this.updateWin();
    }

    /**
     * Button click handler, will update UI and transition to the necessary state
     * @protected
     */
    protected onButtonClick(): void {
        switch (this.proxy.currentInterfaceState) {
            case SimpleSlotInterfaceStatesEnum.Play: {
                const betValid: boolean = SimpleSlotMoneyAtm.instance.validateBet();
                const spinValid: boolean = SimpleSlotEndGameDecisionProxy.instance.validateTrySpin(betValid);
                if (spinValid) {
                    this.proxy.currentInterfaceState = SimpleSlotInterfaceStatesEnum.Stop;
                    this.view.updateViewState(SimpleSlotInterfaceStatesEnum.Stop);
                    this.proxy.dispatchEvent(SimpleSlotGlobalConstants.ON_SPIN_EVENT);
                }
                break;
            }
            case SimpleSlotInterfaceStatesEnum.Stop: {
                this.proxy.currentInterfaceState = SimpleSlotInterfaceStatesEnum.Disable;
                this.view.updateViewState(SimpleSlotInterfaceStatesEnum.Disable);
                this.proxy.dispatchEvent(SimpleSlotGlobalConstants.ON_STOP_EVENT);
                break;
            }
            case SimpleSlotInterfaceStatesEnum.Disable: {
                break;
            }
            case SimpleSlotInterfaceStatesEnum.None: {
                break;
            }
            default: {
                break;
            }
        }
        this.updateBalance();
    }

    /**
     * Updates balance text field
     * @protected
     */
    protected updateBalance(): void {
        this.view.updateBalance(SimpleSlotMoneyAtm.instance.getBalance());
    }

    /**
     * Updates bet text field
     * @protected
     */
    protected updateBet(): void {
        this.view.updateBet(SimpleSlotWalletConstants.standardBet);
    }

    /**
     * Updates win text field
     * @protected
     */
    protected updateWin(): void {
        this.view.updateWin(SimpleSlotEndGameDecisionProxy.instance.winValue);
    }

    /**
     * Clears win text field
     * @protected
     */
    protected clearWin(): void {
        this.view.updateWin(0);
    }

    /**
     * Displays insufficient funds message (uses the win text field)
     * @protected
     */
    protected showInsufficientFunds(): void {
        this.view.updateWin(-1);
    }
}
