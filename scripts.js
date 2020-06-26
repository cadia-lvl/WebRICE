//Contains functionality!
import { Settings } from "./resources/modules/Settings"

const SettingsId = "settingsCont";
const settings = new Settings(document.getElementById("webrice"));

document.querySelector(".SettingButton").addEventListener("click", function() {
    document.getElementById(SettingsId) ? settings.destroySettings() : settings.createSettings();
});