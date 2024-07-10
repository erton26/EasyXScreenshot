const handleError = (error) => {
    /*
    Error handler
    */
    console.log(error);
};

const downloadUri = (uri, filename) => {
    /*
    Download the screenshot
    */
    const link = document.createElement("a");
    link.download = filename;
    link.href = uri;
    link.click();
    delete link;
};

const captureScreenshot = async(tab, rect) => {
    /*
    Capture screenshot of post and download the screenshot
    */
    try {
        const imageUri = await browser.tabs.captureTab(tab.id, { format: "png", rect: rect });
        const currentDate = new Date().toISOString();
        downloadUri(imageUri, "EXSS_" + currentDate);
    }
    catch (error) {
        handleError(error);
    };
};

const handleAction = async(tab) => {
    /*
    Fetch rect from index.js and capture screenshot according to rect
    */
    try {
        const rect = await browser.tabs.sendMessage(tab.id, { message: "1" });
        captureScreenshot(tab, rect);
    }
    catch (error) {
        handleError(error);
    };
};

const actionClicked = async() => {
    /*
    Fired when addon symbol is clicked.
    Passes the current opened tab to handleAction.
    */
    try {
        const response = await browser.tabs.query({
            currentWindow: true,
            active: true,
        });
        handleAction(response[0]);
    }
    catch (error) {
        handleError(error);
    };
};

browser.browserAction.onClicked.addListener(actionClicked);