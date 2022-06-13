# Getting Started

## Basic Installation

Paradigm CSS does not require the use of any build tools or package managers.

**Step #1**

Download and include the `paradigm.css.min.js` file in your project.

* If you include `paradigm.css.js` instead we'll track the ms it takes to render your page and add a message to your console. The minified version of Paradigm CSS removes this message in the console for production websites.

**Step #2**

Include the library in the page using a script tag.

    <script src="./path-to-folder/paradigm.css.min.js"></script>

Generally speaking this should be placed just above your closing body tag. However, if you're using a JavaScript UI framework then ParadigmCSS should be loaded before your other JavaScript to make sure it is available before it is needed.

**Step #3: Rendering Paradigm CSS Classes**

In order to render your styles you will need to make a call to the `ParadigmCSS.render();` method somewhere in your JavaScript.
    
As long as the Paradigm CSS library has been loaded into the page before making this call we'll be able style your page without issue.

**When exactly should I make this call?**

It really depends on the tech stack you're using, but long story short.. as soon as your DOM has been loaded for the first time or you need to re-style your page.

For a basic HTML page you can run this immediately, like so:

    <html>
        <head>
        <title>Hello World</title>
        </head>
        <body>
            <div class=":height:200px :width:200px :background-color:#000000"></div>
            <script src="./path-to-folder/paradigm.css.min.js"></script>
            <script>
                ParadigmCSS.render();
            </script>
        </body>
    </html>

If you're using Angular, React or Vue it might make more sense to wait until those frameworks have rendered the HTML on your page.. and then render Paradigm CSS.

For instance, in AngularJS you can include a call to ParadigmCSS.render() at the end of each digest cycle to make sure any new elements added to the DOM are styled appropriately.. ie) something from the ng-class attribute.

**My page is flashing on load - how do I fix this?**

Depending on what other libraries you're using the call to ParadigmCSS.render() may be delayed.. resulting in a "flicker" that occurs when the HTML is rendered by the browser but hasn't been styled by Paradigm CSS yet.

We can fix this by adding `style="display:none"` to your body element.

When Paradigm CSS renders we'll remove this attribute automatically if it exists.

## Anatomy of a Paradigm CSS Class

**Each Paradigm CSS class consists of three required sections, with each being separated by a ":" (colon without the quotes)**

1. **A breakpoint modifier.**

    The default breakpoint modifiers are `all`, `sm`, `md`, `lg`, `xl`, `#sm`, `#md`, `#lg`, `-md`, `-lg`, `-xl` and `print`.
    
    You can also leave this blank to target every device (defaults to `all`).
    
1. **The CSS property.**

    Any property that is available in the official CSS specification can be used in a Paradigm CSS class.
    
    CSS properties should be written in lowercase text only.

1. **The value to assign to that property.**

    You can write this value as you normally would in a CSS stylesheet.. the only exception being whitespace.

    White space must be deleted altogether or replaced with an "_" (underscore without the quotes).
    
    In the event that you actually do want to retain the underscore you can escape it using a "\\" (backslash without the quotes).

| {breakpoint modifier} | : | {css property} | : | {property value} |
| --- | --- | ---| --- | --- |


### Let's See Some Examples


| Class | Breakpoint Modifier      | CSS Property | Property Value
| --- | --- | ---| --- |
| :color:#FF0000 | all (default) | color | #FF0000 |
| md:font-size:1.2rem | md | font-size | 1.2rem |
| -lg:width:calc(100vw_-_20px) | -lg | width | 100% of the viewport width - 20px |
| print:display:none | print | display | none |

Another gentle reminder.. there should be **no whitespace** as browsers would then consider each part to be separate classes.

Paradigm classes can also have two additional (optional) parts: state modifiers and child selectors.. but we'll cover those later.


## Breakpoint Modifiers

Paradigm CSS comes pre-packaged with eleven breakpoint modifiers.

A few things to keep in mind...

1. **Paradigm CSS is mobile-first.**

    Prepending a breakpoint modifier will result in that property being applied on that breakpoint ***and up.***

1. Prepending a "-" (dash without the quotes) will target all breakpoints ***below*** that breakpoint, ***not*** including the specified breakpoint.
    
    For example, `-lg` will apply the property to `sm` and `md` breakpoints.

1. Prepending a "#" (hash without the quotes) will target that breakpoint and ***only*** that breakpoint.


| Breakpoint | Media Query |
| --- | --- |
| all | Will apply the property across every device. | |
|  | *While the "all" breakpoint modifier is available we hardly ever use it. You can leave this blank; Paradigm CSS will default to this breakpoint by default.* |
| sm | @media (min-width: 576px) |
| #sm | @media (min-width: 576px) and (max-width: 768px) |
| md | @media (min-width: 768px) |
| -md | @media (max-width: 768px) |
| #md | @media (min-width: 768px) and (max-width: 992px) |
| lg | @media (min-width: 992px) |
| -lg | @media (max-width: 992px) |
| #lg | @media (min-width: 992px) and (max-width: 1200px) |
| xl | @media (min-width: 1200px) |
| -xl | @media (max-width: 1200px) |
| print | @media print |


## Applying a Paradigm CSS Class

As far as HTML is concerned your Paradigm CSS classes are just like every other class. You can drop them straight into any `class` attribute in your HTML.

## Chaining Multiple Classes Together

One of the primary benefits of Paradigm CSS is the ability to add multiple classes targeting the same CSS property, but with different breakpoint modifiers..

For example, if we were to add `:font-size:14px` and `md:font-size:18px` to the same element we would have a font size of 14px on small devices, but when the screen size hit tablet-sized screens it would change to a font size of 18px.

## Creating a Responsive Layout

Let's take this same principle to responsive layouts.

The following example would give you a three column layout using flexbox. On desktop the three columns will appear side-by-side but on mobile devices the columns will be stacked.

    <div class=":display:flex :flex-direction:column md:flex-direction:row">
        <div class=":flex:1 :width:100%">Left Sidebar</div>
        <div class=":flex:3 :width:100%">Main Content Area</div>
        <div class=":flex:1 :width:100%">Right Sidebar</div>
    </div>
    
You're no longer required to work within the confines of a grid system, nor do you ever have to write your own media queries ever again.

* By "grid system" we're referring to CSS framework classes like col-md-12, col-4 and the sort. 

* This is not to be confused with CSS Grid which is fully supported in Paradigm CSS.

With Paradigm CSS you finally have a CSS framework that gives you the opportunity to create pixel perfect layouts, without any opinionated design styles to override, and with full support for every screen size.

If you wanted to get crazy you could style elements with absolute positioning on mobile but use flexbox for tablets and CSS grid for desktop screens.

... PLEASE don't ever actually do that to yourself... we are in no way advocating for that to become standard practice.. but you get the point. The flexibility is there to get creative.

## State Modifiers

Applying styles to a specific state is as simple as appending another section to your Paradigm CSS class.

You can use any state that is available in the official CSS specification.

Let's say we have a square with a height/width of 100px with a black background, but when a user hovers over the square we'd like to have it change the background color to red.

All we have to do is add ":hover" to the end of the class to get... ":background-color:#FF0000:hover"

    <div class=":height:100px :width:100px 
        :background-color:#000000 :background-color:#FF0000:hover">
    </div>      

**Can we add multiple state modifiers?**

You sure can! Just continue to prepend additional modifiers. 

The following code will create a table with table rows that will have a black background color and white font color when you hover over them, but only if it's an odd row.

    <table class="
        :background-color:#000000:?tr:nth-child(odd):hover :color:#FFFFFF:?tr:nth-child(odd):hover">
        <tbody>
            <tr>
                <td>Column 1<td>
                <td>Column 2<td>
            </tr>
            <tr>
                <td>Column 1<td>
                <td>Column 2<td>
            </tr>
            <tr>
                <td>Column 1<td>
                <td>Column 2<td>
            </tr>
        </tbody>
    </table>   

Keep in mind that the order does matter though so if you're not getting the desired effect make sure the order is correct.



## Styling Child Elements

This is perhaps the coolest trick in Paradigm CSS.. the ability to style child elements - complete with breakpoint modifiers, state modifers and any valid CSS selector - without leaving your HTML.

CSS only menus and dropdown buttons aren't new, but the ability to create them on the fly within HTML is a game changer when it comes to development speed.. not to mention you can customize the behavior for each device without having to hack around in the JS or writing a bunch of media queries.

**How to target child elements with a Paradigm CSS class**

At the end of a Paradigm CSS class, simply append "?" (question mark without the quotes) and add a valid CSS selector.

Spaces should be substituted with an underscore; you can escape underscores that are part of a selector with a backslash.

For example.. if you would like to create a table with alternating shaded rows, the selector in regular CSS might be something like...

    .table tbody tr:nth-child(odd)
    
However, since we're going to apply this class to our table element we can remove .table from the string.

Next thing we have to do is convert any spaces to underscores, so what we're left with for a selector is:

    tbody_tr:nth-child(odd)
    
Now, putting it all together we would get something like:

    <table class="
        :background-color:#F5F5F5?tbody_tr:nth-child(odd)
    ">
    
## Creating Component Classes

If we had to write out every individual class on each individual element - again and again - we'd go absolutely insane.

After all, that was one of the reasons we moved away from inline styles in the first place.

That's why we've created component classes.. which give you the ability to group multiple Paradigm CSS classes into a single Paradigm CSS class that you can write in your HTML instead.

Let's say we've got a bunch of buttons on the page with the same styles.. after creating a component class "btn" we can include it in our button element like so:

    <button class="@btn">
        Click Me
    </button>   

That's a heck of a lot better than...

    <button class=":background-color:#1D2939 :color:#FFFFFF 
        :font-size:14px :padding-left:5px 
        :padding-right:5px :padding-top:3px 
        :padding-bottom:3px">
        Click Me
    </button>
    
    
**Adding component classes to Paradigm CSS**

In order to add a component class you'll need to add a key:value pair to the ParadigmCSS.components object.

The key will be the component class name that you'll add to your HTML; the value will be an array of Paradigm CSS classes you'd like to assign to that component.

By default this is a blank object.

Component class names should not have any whitespace or non-alphanumeric characters.

Component class names must start with an alphabetical character.

Writing your component class names in camel case is considered best practice. ie) btnPrimary

Let's say we're looking to create a 'btn' component class.. we would do something like:

    ParadigmCSS.components = {
        btn: [':padding:10px_8px', ':text-align:center', ':width:calc(100%_-_16px)', '@thinBorder', ':cursor:pointer'],
        btnWhite: [':background-color:#FFFFFF', ':background-color:#F5F5F5:hover', ':cursor:pointer', ':color:#000000:hover'],
        thinBorder: [':border-style:solid', ':border-width:thin', ':border-color:#DDDDDD']
    }
    
If defining a component class after initialization, this can be accomplished with the following snippet...

    ParadigmCSS.components.btnDark = [':background-color:#000000'];

Before adding a component class to an HTML element you must prepend an "@" symbol.. this will trigger Paradigm CSS to add your grouped classes to the element before rendering the styles.

Notice that you can include component classes in other component classes as well.. ie) above we're including @thinBorder within the @btn component class.

Our final HTML would then become:

    <button class="@btn @btnWhite">
        Button text
    </button>

## Paradigm CSS Variables

We did not ship an opinionated design style with Paradigm CSS. However, that doesn't mean we've left you high and dry when it comes to maintainability of your code.

What we've elected to do was give you the ability to configure variables that you can then include within Paradigm CSS classes.. so if you decide to change the shade of red text you're using you could simply update the config and call it a day.

This will also make it easy to change color schemes when doing theme previews, building a theme with light/dark mode toggles or building complex UI patterns that must morph based on user actions/input.. ie) WYSIWYG page builders, Rich Text Editors, etc.

**Defining a Paradigm CSS Variable**

In order to define a Paradigm CSS variable you'll need to add a key:value pair to the ParadigmCSS.variables object.

The key will be the variable name that you'll add to your HTML; the value will be the string you would like to inject.

Values should not have any whitespace.

Writing your variable names in camel case is considered best practice. ie) colorRed

Let's say we're looking to create a "colorPrimary" variable that we can later apply to font colors, background colors, borders, etc.. we would do something like:

    ParadigmCSS.variables = {
        colorPrimary: '#FF0000'
    }

If defining this Paradigm CSS variable after initialization, this can be accomplished with the following snippet...

    ParadigmCSS.variables.colorPrimary = '#FF0000';
    
    // Be sure to re-render your styles
    ParadigmCSS.render();

You can use this variable in a class by encapsulating the variable name in brackets, to get a class name like...

    :color:{colorPrimary}

So, putting it all together we'll end up with something like...

    <div class=":color:{colorPrimary}">
        Hello World
    </div>
    <script>

        // Will remove all previously defined variables
        ParadigmCSS.variables = {
            colorPrimary: '#FF0000';
        };

        // Will define a new variable but keep existing
        ParadigmCSS.variables.colorPrimary = '#FF0000';

        // Be sure to re-render styles if necessary
        ParadigmCSS.render();  

    </script>

# A Note on !important and Class Precedence

When Paradigm CSS renders styles it does so in the order that they first appear in the DOM.

99% of the time this does not matter, but there are scenarios where CSS specificity rules can conflict when two different classes are targeting the same property on an element.

Consider the following code:

    <script>

    <button class="
        :background-color:{blue-400} 
        :background-color:{red-700}:active 
        :background-color:{blue-500}:hover 
        :color:{blue-50} :padding:{md} :border:none :border-radius:{sm} :margin-bottom:{md} :cursor:pointer">
        Button Text
    </button>

    </script>

What we're trying to do is create a button that is blue, slightly darker when hovered, and then red when actively clicked.. except it doesn't work that way.

Since `:background-color:{blue-500}:hover` is defined after `:background-color:{red-700}:active` the blue hover color will have precedence even though that's not at all what we're trying to accomplish.

We can fix this by adding `!important` to the value in the active background class to get the following code:

    <script>

    <button class="
        :background-color:{blue-400} 
        :background-color:{red-700}!important:active 
        :background-color:{blue-500}:hover 
        :color:{blue-50} :padding:{md} :border:none :border-radius:{sm} :margin-bottom:{md} :cursor:pointer">
        Button Text
    </button>

    </script>

When you add `!important` to the value of a Paradigm CSS class it functions the same way it would in traditional CSS.

# Callbacks With Paradigm CSS

We've also included the ability for you to trigger your own JavaScript after Paradigm CSS has rendered the styles on your page.

In the config object for `ParadigmCSS.render()` you can add a `callback` prop with the function to execute.

    <script>
        ParadigmCSS.render({
            callback: function() {
                alert("Finished!");
            }
        });  
    </script>

# No-Conflict Mode

While Paradigm CSS is compatible with most of the existing frameworks, there is one notable exception: Tailwind CSS.

This is due to the fact we both use colons in our naming structure and when parsing the classList on an element, since the pattern is similar but not valid within Paradigm CSS, it causes some hiccups.

For example, the element below would have trouble since there is a valid Tailwind class that is, at the same time, an invalid Paradigm CSS class...

    <div class="md:bg-blue-400 md:color:#FFFFFF:hover"></div>
    <script>
        ParadigmCSS.render();
    </script>

In order to side-step this issue we've added a rendering mode that will parse the `paradigm-css` attribute on elements instead of the `class` attribute.

**Using No-Conflict Mode**

1. All Paradigm CSS classes should be moved out of the `class` attribute and into the `paradigm-css` attribute.

    Your entire project must follow suit since Paradigm CSS will no longer look at an element's classList to see if there are any valid classes.

1. Set `noConflictMode` to boolean `true` in the config object for `ParadigmCSS.render()`;

    The call that you will need to make will be similar to: `ParadigmCSS.render({noConflictMode:true});`
    
After making these changes we will get the following code that will now work without issue:

    <div class="md:bg-blue-400"
        paradigm-css="md:color:#FFFFFF:hover">
    </div>
    <script>
        ParadigmCSS.render({noConflictMode:true});
    </script>

NOTE: There will be a performance hit when using no-conflict mode.

In our full-page tests with 10k classes in the DOM we went from 1-3ms with standard rendering to a range of 25-70ms while rendering the exact same page in no-conflict mode.

However, in tests that were more likely to mirror real-world instances where Tailwind CSS was handling the heavy lifting and Paradigm CSS was "sprinkled in" as an add-on we were still able to achieve rendering times < 10ms with no-conflict mode enabled.

# Support

If you need help or have suggestions feel free to reach out to us on Twitter (@ParadigmCSS) or Matt directly (@MattTodaroDev).