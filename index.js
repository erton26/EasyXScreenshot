const main = (request, sender, sendResponse) => {
    const root = document.getElementById("react-root");
    const articles = root.getElementsByTagName("article");
    const rect = articles[0].getBoundingClientRect();
    sendResponse({ x: rect.x, y:rect.y, width:rect.width, height:rect.height });
    return true;
};

browser.runtime.onMessage.addListener(main);