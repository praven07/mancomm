"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentParser = void 0;
const jsdom_1 = require("jsdom");
class DocumentParser {
    constructor() {
        this.querySelectors = '[class*="title"], [class*="subtitle"], [class*="part"], [class*="subpart"], h1, h2, p';
        this.selectors = ['title', 'subtitle', 'chapter', 'part', 'subpart', 'authority', 'source', 'section'];
        this.headerSelector = 'h1, h2, h3, h4, h5, h6';
    }
    parseHTML(html) {
        const dom = new jsdom_1.JSDOM(html);
        const document = dom.window.document;
        const result = [];
        // const elements = document.querySelectorAll(this.querySelectors);
        this.traverseElement(document.documentElement, result);
        // elements.forEach((element: Element) => {
        //     const tagName = element.tagName.toUpperCase();
        //     if (tagName === 'H1' || tagName === 'H2') {
        //         result.push({
        //             type: 'Heading',
        //             level: tagName,
        //             content: element.textContent?.trim()
        //         });
        //     } else if (element.className.includes('part')) {
        //         result.push({
        //             type: 'Part',
        //             content: element.textContent?.trim()
        //         });
        //     } else if (element.className.includes('subpart')) {
        //         result.push({
        //             type: 'SubPart',
        //             content: element.textContent?.trim()
        //         });
        //     } else if (tagName === 'P') {
        //         result.push({
        //             type: 'Paragraph',
        //             content: element.textContent?.trim(),
        //             indentLevel: DocumentParser.getIndentLevel(element.className)
        //         });
        //     }
        // });
        // console.log("Data parsing completed.");
        return result;
    }
    traverseElement(element, result) {
        var _a;
        if (element.tagName == 'P') {
            result.push({
                "type": "paragraphy",
                "indent": DocumentParser.getIndentLevel(element.className),
                "text": element.textContent,
            });
            return;
        }
        if (element.className == "") {
            element.childNodes.forEach(child => {
                if (child.nodeType === child.ELEMENT_NODE) {
                    this.traverseElement(child, result);
                }
            });
        }
        for (let i in this.selectors) {
            if (element.classList.contains(this.selectors[i])) {
                const content = [];
                element.childNodes.forEach(child => {
                    if (child.nodeType === child.ELEMENT_NODE) {
                        this.traverseElement(child, content);
                    }
                });
                result.push({
                    "type": this.selectors[i],
                    "text": (_a = element.querySelector(this.headerSelector)) === null || _a === void 0 ? void 0 : _a.textContent,
                    "content": content,
                });
            }
        }
    }
    static getIndentLevel(className) {
        const match = className.match(/indent-(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
    }
}
exports.DocumentParser = DocumentParser;
