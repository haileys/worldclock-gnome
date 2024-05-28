import GLib from "gi://GLib";
import GnomeDesktop from "gi://GnomeDesktop";
import GObject from 'gi://GObject';
import { ClockFormat } from "./datetime.js";

export const WorldClock = GObject.registerClass({
    Properties: {
        "timezone": GObject.ParamSpec.boxed("timezone", "", "",
            GObject.ParamFlags.READWRITE | GObject.ParamFlags.CONSTRUCT_ONLY,
            GLib.TimeZone.$gtype),
        "clock": GObject.ParamSpec.string("clock", "", "",
            GObject.ParamFlags.READABLE,
            null),
    },
}, class WorldClock extends GObject.Object {
    constructor(params) {
        super(params);
        this._clock = "";
        this._timezone = params.timezone;

        this._clockFormat = ClockFormat.fromUserSettings();

        this._wallClock = new GnomeDesktop.WallClock();
        this._wallClock.connect("notify::clock", this._updateClock.bind(this));
    }

    _updateClock() {
        let now = GLib.DateTime.new_now(this._timezone);
        this._clock = this._clockFormat.format(now) + " " + now.get_timezone_abbreviation();
        this.notify("clock");
    }

    get timezone() {
        return this._timezone;
    }

    get clock() {
        return this._clock;
    }
})
