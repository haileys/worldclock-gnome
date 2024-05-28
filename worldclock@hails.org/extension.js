import Clutter from "gi://Clutter";
import GLib from "gi://GLib";
import GObject from "gi://GObject";
import St from "gi://St";
import * as Main from "resource:///org/gnome/shell/ui/main.js";
import { WorldClock } from "./worldclock.js";

export default class WorldClockExtension {
    _panelItem = null;

    enable() {
        this.setPanelItem(new WorldClockPanelItem());
    }

    disable() {
        this.setPanelItem(null);
    }

    setPanelItem(item) {
        if (this._panelItem) {
            this._panelItem.remove();
        }

        this._panelItem = item;
    }
}

class WorldClockPanelItem {
    constructor() {
        this.label = new St.Label({
            opacity: 128,
            y_align: Clutter.ActorAlign.CENTER,
        });

        const timezone = GLib.TimeZone.new_identifier("Australia/Melbourne");
        this._worldClock = new WorldClock({ timezone });
        this._worldClock.bind_property("clock", this.label, "text", GObject.BindingFlags.SYNC_CREATE);

        let clock = Main.panel.statusArea.dateMenu._clockDisplay;
        this.container = clock.get_parent();
        this.container.insert_child_above(this.label, clock);
    }

    remove() {
        this.container.remove_child(this.label);
    }
}
