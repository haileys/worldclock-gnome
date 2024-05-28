import Clutter from "gi://Clutter";
import GLib from "gi://GLib";
import GObject from "gi://GObject";
import St from "gi://St";
import * as Main from "resource:///org/gnome/shell/ui/main.js";
import { WorldClock } from "./worldclock.js";

const TIMEZONE = "Australia/Melbourne";

export default class WorldClockExtension {
    _panelItem = null;

    enable() {
        this._clockDisplay = Main.panel.statusArea.dateMenu._clockDisplay;
        this._container = this._clockDisplay.get_parent();
        this._container.insert_child_above(new WorldClockLabel(), this._clockDisplay);
    }

    disable() {
        this._container.remove_child(this._clockDisplay);
        this._container = null;
        this._clockDisplay = null;
    }

    setPanelItem(item) {
        if (this._panelItem) {
            this._panelItem.remove();
        }

        this._panelItem = item;
    }
}

const WorldClockLabel = GObject.registerClass(
class WorldClockLabel extends St.Label {
    constructor() {
        super({
            opacity: 128,
            y_align: Clutter.ActorAlign.CENTER,
        });

        const timezone = GLib.TimeZone.new_identifier(TIMEZONE);
        this._worldClock = new WorldClock({ timezone });
        this._worldClock.bind_property("clock", this, "text", GObject.BindingFlags.SYNC_CREATE);
    }
});
