document.addEventListener("DOMContentLoaded", async() => {
    const headInclude = document.querySelector("head[data-include]");
    const headerInclude = document.querySelector("header[data-include]");
    const footerInclude = document.querySelector("footer[data-include]");

    if(headInclude){
        const headHtml = await fetch(headInclude.dataset.include).then(r => r.text());
        headInclude.insertAdjacentHTML("beforeend", headHtml);
    }

    if(headerInclude){
        const headerHtml = await fetch(headerInclude.dataset.include).then(r => r.text());
        headerInclude.insertAdjacentHTML("beforeend", headerHtml);
    }

    if(footerInclude){
        const footerHtml = await fetch(footerInclude.dataset.include).then(r => r.text());
        footerInclude.insertAdjacentHTML("beforeend", footerHtml);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    AOS.init({
        startEvent: 'load',
        once: false,
        mirror: true
    });
});

window.addEventListener('load', () => {
    setTimeout(() => AOS.refresh(), 100);
});