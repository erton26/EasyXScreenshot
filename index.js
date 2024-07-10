const main = (request, sender, sendResponse) => {
    const root = document.getElementById("react-root");
    const articles = root.getElementsByTagName("article");

    //Check if opened post is a reply, if it is tabindex="0", if not tabindex="-1"
    const tabindex = articles[0].getAttribute("tabindex");

    const rect1 = articles[0].getBoundingClientRect();
    const rect2 = articles[1].getBoundingClientRect();

    //If opened post is not a reply take a screenshot of opened post
    const rect = rect1

    //If post is a reply take a screenshot of the post and the post that is replied to
    if (tabindex === "0") {
        rect.height = rect1.height + rect2.height;
    }
    sendResponse({ x: rect.x, y:rect.y, width:rect.width, height:rect.height });
    return true;
};

browser.runtime.onMessage.addListener(main);