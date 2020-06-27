//Contains functionality!
import { Settings } from "./resources/modules/settings.mjs"

const SettingsId = "settingsCont";
const settingsMod = new Settings(document.getElementById("webrice"), SettingsId);

//Creates the settings when settings button is pushed
document.querySelector(".SettingButton").addEventListener("click", function() {
    document.getElementById(SettingsId) ? settingsMod.destroySettings() : settingsMod.createSettings();
});