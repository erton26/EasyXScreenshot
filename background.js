const handleError = (error) => {
    console.log(error);
};

const downloadUri = (uri, filename) => {
    const link = document.createElement("a");
    link.download = filename;
    link.href = uri;
    link.click();
    delete link;
};

const captureScreenshot = async(tab, rect) => {
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
    try {
        const rect = await browser.tabs.sendMessage(tab.id, { message: "1" });
        captureScreenshot(tab, rect);
    }
    catch (error) {
        handleError(error);
    };
};

const actionClicked = async() => {
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