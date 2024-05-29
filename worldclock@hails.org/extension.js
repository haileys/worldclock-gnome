import Clutter from "gi://Clutter";
import GLib from "gi://GLib";
import GObject from "gi://GObject";
import St from "gi://St";
import * as Main from "resource:///org/gnome/shell/ui/main.js";
import { WorldClock } from "./worldclock.js";

const TIMEZONE = "Australia/Melbourne";

export default class WorldClockExtension {
    enable() {
        this._worldClock = new WorldClockLabel();

        const clockDisplay = Main.panel.statusArea.dateMenu._clockDisplay;
        this._container = clockDisplay.get_parent();
        this._container.insert_child_above(this._worldClock, clockDisplay);
    }

    disable() {
        this._container.remove_child(this._worldClock);
        this._container = null;
        this._worldClock = null;
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
