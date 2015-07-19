/*
 * A magical function that fixes the size and viewbox of an SVG
 * to fit an inner group with the specified padding. Both the
 * svg and group parameters need to be D3 selections.
 *
 * Contrib by Sophie Engle.
 *
 */
function fixBounds(svg, group, padding) {
    // svg and group should be d3 selections
    if (!(svg instanceof d3.selection) ||
        !(group instanceof d3.selection)) {
        console.log("Warning: Must have D3 selections to fix bounds.");
        return;
    }

    // get bounding and view box
    var bbox = group.node().getBBox();
    var view = [bbox.x, bbox.y, bbox.width, bbox.height];

    var x = -bbox.x + padding;
    var y = -bbox.y + padding;

    var w = bbox.width + padding * 2;
    var h = bbox.height + padding * 2;

    group.attr("viewBox", view.join(" "));
    group.attr("transform", "translate(" + x + ", " + y + ")");

    svg.attr("width", w);
    svg.attr("height", h);

    svg.attr("viewBox", [0, 0, w, h].join(" "));
    svg.attr("version", "1.1");
    svg.attr("xmlns", "http://www.w3.org/2000/svg");
    svg.attr("preserveAspectRatio", "xMinYMin meet");
}
