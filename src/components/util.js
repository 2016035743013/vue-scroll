function domReize(dom) {
    return new Promise((resolve, rejected) => {
        let MutationObserver =
            window.MutationObserver ||
            window.WebKitMutationObserver ||
            window.MozMutationObserver;
        let ele = dom[0];
        let observer = new MutationObserver(mutationList => {

            resolve(mutationList);
        });
        observer.observe(ele, {
            attributes: true,
            attributeFilter: ["height"],
            attributeOldValue: true,
            childList: true,
            subtree: true
        });
    })
}
export default {
    domReize
}