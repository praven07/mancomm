"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentParser = void 0;
const jsdom_1 = require("jsdom");
class DocumentParser {
    constructor() {
        this.querySelectors = '[class*="title"], [class*="subtitle"], [class*="part"], [class*="subpart"], h1, h2, p';
    }
    parseHTML(html) {
        const dom = new jsdom_1.JSDOM(html);
        const document = dom.window.document;
        const result = [];
        const elements = document.querySelectorAll(this.querySelectors);
        elements.forEach((element) => {
            var _a, _b, _c, _d;
            const tagName = element.tagName.toUpperCase();
            if (tagName === 'H1' || tagName === 'H2') {
                result.push({
                    type: 'Heading',
                    level: tagName,
                    content: (_a = element.textContent) === null || _a === void 0 ? void 0 : _a.trim()
                });
            }
            else if (element.className.includes('part')) {
                result.push({
                    type: 'Part',
                    content: (_b = element.textContent) === null || _b === void 0 ? void 0 : _b.trim()
                });
            }
            else if (element.className.includes('subpart')) {
                result.push({
                    type: 'SubPart',
                    content: (_c = element.textContent) === null || _c === void 0 ? void 0 : _c.trim()
                });
            }
            else if (tagName === 'P') {
                result.push({
                    type: 'Paragraph',
                    content: (_d = element.textContent) === null || _d === void 0 ? void 0 : _d.trim(),
                    indentLevel: DocumentParser.getIndentLevel(element.className)
                });
            }
        });
        console.log("Data parsing completed.");
        return result;
    }
    static getIndentLevel(className) {
        const match = className.match(/indent-(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
    }
}
exports.DocumentParser = DocumentParser;
