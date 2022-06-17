# Paradigm CSS

Paradigm CSS is a featherweight (~1.9kB minified and gzipped) Atomic/Utility-based CSS framework that was created to build lightning-fast pages, quicken development time and make it easier for large teams to work together.

The library gets its name because it is a `Paradigm Shift` in how you can style your HTML moving forward.

Instead of pre-writing all of your CSS rules and shipping them in static .css files, with Paradigm CSS you'll simply write dynamic pattern-based classes within your HTML.

When you make a JavaScript call to the `ParadigmCSS.render()` method, Paradigm CSS will parse the DOM, extract the Paradigm CSS classes, write the required CSS rules for you and inject them into the `head` on the fly.

Most pages built with Paradigm CSS will have their styles rendered in 1-3ms.. faster than the human eye can process.

If you're already a believer in utility-based or Atomic CSS, Paradigm CSS will (hopefully) become your new best friend.

Here's a few examples to demonstrate how easy it is to use Paradigm CSS...

| Class | Result |
| --- | --- |
| :color:#FF0000 | Changes the **color** property to **#FF0000** on **all devices** |
| md:font-size:1.1rem | Sets the **font-size** property to **1.1rem** on breakpoints **md and above** |
| md:color:#FF0000:hover | Sets the **color** property to **#FF0000** when the element is **hovered** on breakpoints **md and above** |
| -lg:width:calc(100vw_-_20px) | Sets the **width** of the element to **100% of the viewport width - 20px** on devices **smaller than the lg breakpoint**. |
| #md:padding:10px | Adds **10px** of **padding** to the element **only on the md breakpoint** |
| print:display:none | Hides the element when printing the page |

___

## So Paradigm CSS is basically what inline styles *could have been?*

Yep, pretty much.

**Paradigm CSS makes it possible, without ever leaving your HTML, to...**
    
* Target breakpoints (use the built-in media queries for breakpoints or set your own).

* Add print styles without having to write a single media query.

* Target every single CSS property (and anything that comes along in the future).

* Target element states (:hover, :active, :focus, etc.).

* Target child elements from a parent, directly inside of your HTML.

* **Paradigm CSS Component classes** allow you to group multiple Paradigm CSS classes together so you don't have to repeatedly write the same utility-classes. 

    You're still able to write "readable" code like...

        <a class="@btn" href="https://dontBeHatingOn.us"></a>

* **Paradigm CSS Variables** work in much the same way as traditional CSS variables, but these can be modified on the fly with JavaScript to add features to your website like light/dark mode, not to mention they make it a breeze to update theme colors/produce multiple mockups, enforce a specific design system within your team, or incorporate your favorite color palettes.

* As an added benefit, since everything is HTML-based, you can create UI components that can be copy/pasted between projects and maintain their -exact- styling without worrying about whether or not you've also transferred all of the necessary CSS.


# Documentation

Full documentation is available in the [documentation.md](documentation.md) file.

# Support

If you need help or have suggestions feel free to reach out to us on Twitter (@ParadigmCSS) or Matt directly (@MattTodaroDev).

# Contributing

This project is being actively maintained and developed. If you are interested in joining the team as a contributor, please reference the [contributing.md](contributing.md) file.
