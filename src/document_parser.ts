import { JSDOM } from 'jsdom';

export class DocumentParser {

    private querySelectors = '[class*="title"], [class*="subtitle"], [class*="part"], [class*="subpart"], h1, h2, p';

    public parseHTML(html: string): Array<any> {

        const dom = new JSDOM(html);
        const document = dom.window.document;

        const result: Array<any> = [];
        const elements = document.querySelectorAll(this.querySelectors);

        elements.forEach((element: Element) => {
            const tagName = element.tagName.toUpperCase();
            if (tagName === 'H1' || tagName === 'H2') {
                result.push({
                    type: 'Heading',
                    level: tagName,
                    content: element.textContent?.trim()
                });
            } else if (element.className.includes('part')) {
                result.push({
                    type: 'Part',
                    content: element.textContent?.trim()
                });
            } else if (element.className.includes('subpart')) {
                result.push({
                    type: 'SubPart',
                    content: element.textContent?.trim()
                });
            } else if (tagName === 'P') {
                result.push({
                    type: 'Paragraph',
                    content: element.textContent?.trim(),
                    indentLevel: DocumentParser.getIndentLevel(element.className)
                });
            }
        });

        console.log("Data parsing completed.");

        return result;
    }
    
    private static getIndentLevel(className: string): number {
        const match = className.match(/indent-(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
    }
}