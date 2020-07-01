export class MainButtons{
    constructor(main){
        this.mainCont = main;
    }

    createImageButton(buttonClass, imgUrl, imgAlt, imgTitle){
        const button = document.createElement("button");
        button.classList.add(buttonClass);
        const img = new Image();
        img.setAttribute("src", imgUrl);
        img.setAttribute("alt",imgAlt);
        img.setAttribute("title",imgTitle);
        button.appendChild(img);
        return button;
    }

    createMainButtons(){
        const WRManage = document.createElement("div");
        WRManage.classList.add("WebRICE_manage");
        //player
        const player = document.createElement("audio");
        player.id = "player";
        player.classList.add("WRPlayer");
        WRManage.appendChild(player);

        const baseCont = document.createElement("div");
        baseCont.id = "baseContainer";

        let earImg = new Image();
        earImg.setAttribute("src","./Images/hearing-white-36dp.svg");
        earImg.setAttribute("alt","Mynd af hlustandi eyra");
        baseCont.appendChild(earImg);
        baseCont.appendChild(this.createImageButton("ListenButton","./Images/play_arrow-white-36dp.svg", "Spilunar takki", "Hlusta á grein"));
        WRManage.appendChild(baseCont);
        WRManage.appendChild(this.createImageButton("PauseButton","./Images/pause-white-36dp.svg", "Pásu takki", "Pása lestur"));
        WRManage.appendChild(this.createImageButton("StopButton","./Images/stop-white-36dp.svg", "Stöðvunar takki", "Stoppa lestur"));
        WRManage.appendChild(this.createImageButton("SpeedButton","./Images/speed-white-36dp.svg", "Stillingar takki fyrir hraða lesturs", "Stilla hraða"));
        
        WRManage.appendChild(this.createImageButton("DownloadButton", "./Images/vertical_align_bottom-white-36dp.svg", "niðurhals takki", "Hlaða niður lestri"));
        WRManage.appendChild(this.createImageButton("SettingButton","./Images/settings-white-36dp.svg", "Stillinga takki", "Stillingar"));
        this.mainCont.appendChild(WRManage);
    }
}