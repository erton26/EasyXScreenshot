const main = (request, sender, sendResponse) => {
    const root = document.getElementById("react-root");
    const articles = root.getElementsByTagName("article");

    //Check reply chain
    reply_num = 0;
    while (articles[reply_num].tabIndex == 0) {
        reply_num += 1;
    }

    const rect_start = articles[0].getBoundingClientRect();
    const rect_end = articles[reply_num].getBoundingClientRect();

    sendResponse({ x: rect_start.x, y:rect_start.y, width:rect_start.width, height:rect_end.y + rect_end.height - rect_start.y });
    return true;
};

browser.runtime.onMessage.addListener(main);