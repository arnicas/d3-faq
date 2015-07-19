# d3-faq
##FAQs and Frequently Encountered Problems (FEPs) When Learning D3

**_With contributions from Scott Murray, Sophie Engle, Lynn Cherny_**

Loading Data, CSVs, JSON, etc.
==============================

**Using multiple data files (elegantly) - queue, asynchrony, etc.**

**How do I treat data sources with a [-, NaN, NA, null] for 0?**

**Wide vs. long format for data - how do I transform it?**

**CSV headers**
    No spaces in your header column names, and try to keep them short so you can work with them (but still know what they refer to).  So, a column called “Years of Drought” should be named to something like “DroughtYears”.

**Number format in CSV/data files**
Remove commas in numeric values - replace a value of “3,050” with “3050.”  Javascript knows it’s thousands!

 * **Beware international number formats:**
    with periods as separators for thousands and commas for decimals (e.g., 234.567,89).  JS expects no comma in the thousands position, and decimal for a float.

**Separator (CSV or TSV)**
Beware of the separator character and make sure it’s comma if you’re using d3.csv, or tab if you want tab separated and d3.tsv (See [Mike's example](https://gist.github.com/mbostock/3305937)).  Check your data file and fix!

**Read in as strings:**
Data values read in with d3.csv will be read as strings.  You need to convert types to use numeric values.

 * Convert input data types from string to numeric for use in functions
    - +x is a “shorthand” for “treat x as a number”.
    - parseFloat(x)/parseInt(x)
    - Number(x)


####JSON File Format

**Be aware of invalid JSON:**
    JSON format looks like this (from [Wikipedia](http://en.wikipedia.org/wiki/JSON)): 

````
{
  "firstName": "John",
  "lastName": "Smith",
  "isAlive": true,
  "age": 25,
  "address": {
    "streetAddress": "21 2nd Street",
    "city": "New York",
    "state": "NY",
    "postalCode": "10021-3100"
  },
  "phoneNumbers": [
    {
      "type": "home",
      "number": "212 555-1234"
    },
    {
      "type": "office",
      "number": "646 555-4567"
    }
  ],
  "children": [],
  "spouse": null
}
````

Notice, the labels are in double quotes.  You can check your data’s format in a validator online: http://jsonformat.com/.


General D3
==========

####What is or what does it mean to say '+d.someProperty'?**

A shorthand often seen in Mike Bostock's code (and now everyone else's) to cast a d.value as a number.
Sometimes improper use of this causes errors.

###How to put multiple graphs on the page (small multiples)

###How to add a tooltip

###How to add a legend

###SVG Text

**How do I split long lines of SVG text?**

**How do I add an icon or html to SVG text?**

####Data() vs. Datum()**

###Style vs. Attr for SVG elements

**Which takes precedence, which to use when:**

Use style sheets when you can, because you want to keep the formatting independent of the code as much as possible.  This makes it easier to swap in a new look without having to hunt through code for the right variables and when they are applied.  This means instead of doing hard coded

````
    d3.select(‘rect’).style(‘fill’, ‘red’)
````
it’s better to add a class or id and put the style attribute there:
````
    d3.select(‘rect’).attr(‘class’, ‘redrect’)
````
and then in the style sheet:
````
    .redrect { fill: red }
````

###Date Formats and Formatting - Reading and Writing!

A date must be “parse”d to read it in, not just declared in the format string. Example:
TODO


General Gotchas and FAQs with JS
================================


**Case Sensitivity--Or, lower and upper case letters matter!**

JS is case-sensitive.  You can’t call your variable **d.affluence** if the value is really **d.Affluence**.  Also, **d.yearlyAvg** is not the same as **d.yearlyavg**.  If you read them in from a CSV file, check your header labels!

**Using script files, CDNs, etc.**

**Missing or improperly placed } or })**

**Missing semicolons confusing interpretation of JavaScript**

**var scope**

**this**

**How do I round numbers?**

**Equivalence and "Equivalence" in JS**

Understanding the "equivalent-ish" operator `==` versus the "equivalent" operator `===` and when one is beneficial and when it is not. Especially since `if(something)` is often used in examples to detect if something is not undefined, but will break if your data has 0 values in it.


Debugging Help
==============

Check out the Chrome [tips and tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks) for using the console for debugging.
_TODO: How to debug in the console - console.log, breakpoints, inspect elements, d3 at the command line._


###Debugging NaNs: Where is that NaN coming from?

**NaN and other problems from a d3 scale:**

Is your scale set for the expected domain and range?  You need to give them arrays, which means values in square brackets, or use d3.extent to get an array of the lowest and highest values for you:

````
var yearScale = d3.time.scale()
    .domain(d3.extent(data, function (d) { return d.year;}))
    .range([50, window.innerWidth - 50]);
````

You use the scale by calling it as a function on a value, which will be mapped from the domain to the range:

````
return yearScale(d.year);

````

Remember that if you assign a function to a variable, it's still a function! Some D3 methods are returning *function* objects, for example with `var x = d3.scale.linear();` the variable `x` is now a function that was created by `d3.scale.linear()`.

**NaN after reading in a data file**

Did you parse the value correctly?  Is there a value in the cell?

**Coping with NaNs when charting (bars, lines)**


**More Debugging Tips**:

Check the size of your selections first. For example:

    ```console.log(d3.select("#plot").selectAll("circle").size());```

Then, worry about whether the problem is in the rest of the chain.

Check the values of your functions using accessors. For example, don't tell me you set the domain and range properly, show me you set it properly:

    ```console.log(x.domain(), x.range());```

Test what your functions return! You can give them sample input:

    ```console.log(x(5));```



Tool Setup and Use
==================

####Bl.ocks.org

**Seeing source gist for a bl.ock:**

To find the source of a bl.ocks.org link, just replace the blocks part with gist.github.com:

```
http://bl.ocks.org/AndresClavijo/9706481d505f2553a71a
becomes
https://gist.github.com/AndresClavijo/9706481d505f2553a71a
```

**Path to d3 in a bl.ocks.org file:**

Your d3 won’t display in the live page in a published gist/bl.ock if you don’t use the path to the online CDN (rather than your local version).  Your error in your console will say “d3 cannot be found.”

````
    <script type="text/javascript" src="http://d3js.org/d3.v3.js"></script>
````


**How do I get an image in bl.ocks.org previews?**

####Setting up WAMP/ MAMP

On Windows, WAMP is a full-service free server (plus MySQL if you want it in the future.)

On Mac, you can use either MAMP or run a server in your directory using Python from the command line.



_From Sophie:_

Confusing Topics
----------------


- Understanding the difference between chaining and/or naming transitions, versus not.

- Understanding method chaining and the reusable chart pattern used by D3.

The following are some JavaScript topics student tend to struggle with:

- Understanding scope in JavaScript. Initially, some students thought included script files had different scope than variables defined in the HTML body.


Efficiency
----------

Understand where the hidden loops are in the code!

- Save your `d3.selectAll()` selections if you plan to reuse them (just be wary if the selection changes).

    **Okay:**

    ```
    var bubbles = d3.selectAll("circle");
    bubbles.attr("cx", 5);
    bubbles.attr("cy", 10);
    ```

    *or*

    ```
    d3.selectAll("circle")
      .attr("cx", 5)
      .attr("cy", 10);
    ```

    **Bad:**

    ```
    d3.selectAll("circle").attr("cx", 5);
    d3.selectAll("circle").attr("cy", 5);
  ```

- Understanding the pros/cons of including a script file in the HTML head, versus at the end of the body.

- Understanding the pros/cons of loading files asynchronously, chaining `d3.json()` calls to load files synchronously, and using [`Queue.js`](https://github.com/mbostock/queue) instead.


Useful Code Snippets in JS directory
------------------------------------


**fixBounds.js**: fixes the size and viewbox of an SVG
to fit an inner group with the specified padding. Both the
svg and group parameters need to be D3 selections.

**processError.js**: for handling error during file read.

**translate.js**: helper for translating SVG elements.




