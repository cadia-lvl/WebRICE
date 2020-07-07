// TODO: Play functionality for selected text
// TODO: highlight the full selection yellow
export function mount(x, y, content, range) {
    let div = document.createElement('div');
    div.innerHTML = `<h3>DERPy title</h3> <mark>${content}</mark><p>${range}</p>`;
    div.style.cssText = `
        padding: 0 5px 0 5px;
        position: absolute;
        border: 2px solid #000;
        border-radius: 4px;
        top: ${y + window.scrollY}px;
        left: ${x + window.scrollX}px;
        width: 200px;
        height: 200px;
        z-index: 1000;
        background-color: gray;
    `;
    document.body.appendChild(div);
    document.addEventListener("mouseup",
        function self() {
        console.debug("removing");
        div.remove();
        document.removeEventListener("mouseup", self);
        }
    );
};
    
