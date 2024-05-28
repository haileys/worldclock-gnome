// code here cribbed from libgnome-desktop/gnome-wall-clock.c

import GDesktopEnums from  "gi://GDesktopEnums";
import Gio from "gi://Gio";

export class ClockFormat {
    constructor(formatString) {
        this.formatString = formatString;
    }

    static fromUserSettings() {
        return new ClockFormat(getClockFormatString(getClockOptions()));
    }

    format(time) {
        // function date_time_format
        const noRatio = this.formatString.replace("∶", ":");
        const noEnspace = noRatio.replace(" ", "_");
        const replacedFormat = time.format(noEnspace);
        return replacedFormat.replace("_", " ");
    }
}

export function getClockOptions() {
    const settings = new Gio.Settings({schema_id: "org.gnome.desktop.interface"});

    return {
        clockFormat: settings.get_string("clock-format"),
        showWeekday: settings.get_boolean("clock-show-weekday"),
        showSeconds: settings.get_boolean("clock-show-seconds"),
        showFullDate: settings.get_boolean("clock-show-date"),
    };
}

export function getClockFormatString(opt) {
    // function gnome_wall_clock_string_for_datetime

    if (opt.clockFormat === "24h") {
        if (opt.showFullDate) {
            if (opt.showWeekday) {
                return opt.showSeconds ? "%a %b %-e_%R:%S" : "%a %b %-e_%R";
            } else {
                return opt.showSeconds ? "%b %-e_%R:%S" : "%b %-e_%R";
            }
        } else if (opt.showWeekday) {
            return opt.showSeconds ? "%a %R:%S" : "%a %R";
        } else {
            return opt.showSeconds ? "%R:%S" : "%R";
        }
    } else {
        if (opt.showFullDate) {
            if (opt.showWeekday) {
                return opt.showSeconds ? "%a %b %-e_%l:%M:%S %p" : "%a %b %-e_%l:%M %p";
            } else {
                return opt.showSeconds ? "%b %-e_%l:%M:%S %p" : "%b %-e_%l:%M %p";
            }
        } else if (opt.showWeekday) {
            return opt.showSeconds ? "%a %l:%M:%S %p" : "%a %l:%M %p";
        } else {
            return opt.showSeconds ? "%l:%M:%S %p" : "%l:%M %p";
        }
    }
}
