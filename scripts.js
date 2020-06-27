//Contains functionality!
import { Settings } from "./resources/modules/settings.mjs"

const SettingsId = "settingsCont";
const settingsMod = new Settings(document.getElementById("webrice"), SettingsId);

function makeSettings(){
    settingsMod.createSettings();
    document.getElementById("closeSettings").addEventListener("click", function() {
        settingsMod.destroySettings();
    });
}

//Creates the settings when settings button is pushed
document.querySelector(".SettingButton").addEventListener("click", function() {
    document.getElementById(SettingsId) ? settingsMod.destroySettings() : makeSettings();
});