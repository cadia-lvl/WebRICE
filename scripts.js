//Contains functionality!

console.log(document.querySelector(".SettingButton"));
document.querySelector(".SettingButton").addEventListener("click", function(){
    console.log("clickeroony");
    console.log(document.querySelector(".SettingsMenu"));
    document.querySelector(".SettingsMenu").styles.display = "block";
})