export default class SizeUtil {
    getWidthOf(domElement) {
        const rect = domElement.getBoundingClientRect();
        return rect.right - rect.left;
    }
}