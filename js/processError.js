/*
 * If there is an error, insert an error message in the HTML
 * and log the error to the console.
 * Contrib by Sophie Engle.
 */

function processError(error) {
    if (error) {
        // Use the "statusText" of the error if possible
        var errorText = error.hasOwnProperty("statusText") ?
            error.statusText : error.toString();

        // Insert the error message before all else
        d3.select("body")
            .insert("p", ":first-child")
            .text("Error: " + errorText)
            .style("color", "red");

        // Log the error to the console
        console.warn(error);
        return true;
    }

    return false;
}