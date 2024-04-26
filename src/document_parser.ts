import { JSDOM } from 'jsdom';

export class DocumentParser {

    private selectors = ['title', 'subtitle', 'chapter', 'part', 'subpart', 'authority', 'source', 'section'];

    private headerSelector = 'h1, h2, h3, h4, h5, h6';

    public parseHTML(html: string): Array<any> {

        const dom = new JSDOM(html);
        const document = dom.window.document;

        const result: Array<any> = [];

        this.traverseElement(document.documentElement, result);

        return result;
    }


    private traverseElement(element: Element, result: Array<any>) {


        // Case when there is a paragraphy.
        if (element.tagName == 'P') {
            result.push({
                "type": "paragraphy",
                "indent": DocumentParser.getIndentLevel(element.className),
                "text": element.textContent,
            });
            return;
        }

        // Corner case when there is not class. 
        if (element.className == "") {
            element.childNodes.forEach(child => {
                if (child.nodeType === child.ELEMENT_NODE) {
                    this.traverseElement(child as Element, result);
                }
            });

        }

        for (let i in this.selectors) {

            if (element.classList.contains(this.selectors[i])) {

                const content: Array<any> = [];

                element.childNodes.forEach(child => {
                    if (child.nodeType === child.ELEMENT_NODE) {
                        this.traverseElement(child as Element, content);
                    }
                });

                result.push({
                    "type": this.selectors[i],
                    "text": element.querySelector(this.headerSelector)?.textContent,
                    "content": content,
                });
            }
        }
    }

    
    private static getIndentLevel(className: string): number {
        const match = className.match(/indent-(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
    }
}