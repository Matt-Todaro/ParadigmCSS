/*

MIT License

Copyright (c) Matt Todaro

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/

// DEV NOTE FOR FUTURE RELEASE:
// We currently have support for looping through browserPrefixes and applying them to every class,
// but this is simply a ridiculous way of doing things and will hardly scale so it was removed.
// Eventually we're going to want Paradigm CSS to automatically add browser prefixes but we'll
// have to incorporate a more intuitive solution than simply throwing a prefix on anything and everything.

let ParadigmCSS = {

	// Set the default breakpoints that ship with Paradigm CSS
	// This is an array of objects that we will later loop through in the styleBlueprint

	// Developers can set their own breakpoints using the following snippets:

	//		Replace all breakpoints with an array
	// 		ParadigmCSS.breakpoints = [ ... ];

	//		Add an additional breakpoint and retain existing breakpoints
	// 		ParadigmCSS.breakpoints.push({
	//			classSlug: '',
	//			mediaQueryStr: ''
	//		});

	breakpoints: [{
			classSlug: 'all',
			mediaQueryStr: ''
		},
		{
			classSlug: 'sm',
			mediaQueryStr: '@media (min-width: 576px) {'
		},
		{
			classSlug: '#sm',
			mediaQueryStr: '@media (min-width: 576px) and (max-width: 768px) {'
		},
		{
			classSlug: 'md',
			mediaQueryStr: '@media (min-width: 768px) {'
		},
		{
			classSlug: '-md',
			mediaQueryStr: '@media (max-width: 768px) {'
		},
		{
			classSlug: '#md',
			mediaQueryStr: '@media (min-width: 768px) and (max-width: 992px) {'
		},
		{
			classSlug: 'lg',
			mediaQueryStr: '@media (min-width: 992px) {'
		},
		{
			classSlug: '-lg',
			mediaQueryStr: '@media (max-width: 992px) {'
		},
		{
			classSlug: '#lg',
			mediaQueryStr: '@media (min-width: 992px) and (max-width: 1200px) {'
		},
		{
			classSlug: 'xl',
			mediaQueryStr: '@media (min-width: 1200px) {'
		},
		{
			classSlug: '-xl',
			mediaQueryStr: '@media (max-width: 1200px) {'
		},
		{
			classSlug: 'print',
			mediaQueryStr: '@media print {'
		}
	],
	components: {},
	variables: {}
};

ParadigmCSS.onlyUnique = function (value, index, self) {
	return self.indexOf(value) === index;
};

// This method is where the magic happens
ParadigmCSS.render = function (props) {

	let start = Date.now();

	// Developers are allowed to make a call to ParadigmCSS.render() without any arguments.
	// If this is the case, we will need to define props as an object.
	if (!props)
		props = {};

	// If a selector was not included in the props object, default to body
	if (!props.selector)
		props.selector = 'body';

	// The line below ensures that we are always targeting the body, regardless of what selector is set in the props.
	// Down the road we may add support for target a specific element if the community requests it.
	// However, so far, we haven't come across an instance where it would provide any sort of measurable performance benefit.
	props.selector = 'body';

	let rawClasses = [],
		elements;
	let container = document.querySelector(props.selector);

	// Since we're looking to style the container element as well, we'll need to move up one level
	// in the DOM Tree, unless of course we're already targeting the body.
	if (props.selector !== 'body') {
		elements = container.parentElement.querySelectorAll("*");
	} else {
		elements = container.querySelectorAll("*");
	}

	elements.forEach(function (element) {
		let elementClasses = [];
		if (props.noConflictMode === true) {
			if (element.hasAttribute('paradigm-css')) {
				elementClasses = element.getAttribute('paradigm-css').split(' ');
			}
		} else {
			elementClasses = element.classList;
		}
		// Process component classes
		elementClasses.forEach(function (classToAdd) {
			if (props.noConflictMode === true)
				element.classList.add(classToAdd);
			if (classToAdd.includes('@') === false && classToAdd.includes(':') === true) {
				rawClasses.push(classToAdd);
			} else if (classToAdd.includes('@') === true) {
				classToAdd = classToAdd.replace('@', '');
				if (typeof ParadigmCSS.components[classToAdd] !== 'undefined') {
					let classesToAdd = ParadigmCSS.components[classToAdd];
					if (classesToAdd.length > 0) {
						classesToAdd.forEach(function (classToAdd) {
							rawClasses.push(classToAdd);
							element.classList.add(classToAdd);
						});
					}
				}
			}
		});

	});

	let uniqueRawClasses = rawClasses.filter(ParadigmCSS.onlyUnique);

	let cssStringBlueprint = {};

	ParadigmCSS.breakpoints.forEach(function (breakpoint) {
		cssStringBlueprint[breakpoint.classSlug] = [];
	});

	uniqueRawClasses.forEach(function (rawClass) {

		let classToParse = '';
		let classToParseSelectorStr = false;

		let addClassBluePrint = {
			rawClass: rawClass,
			breakpoint: '',
			attribute: '',
			value: '',
			states: [],
			selectors: false,
			important: false
		};

		if (rawClass.includes('?')) {
			// Remove selectors and store on the side for a bit
			let rawClassSplit = rawClass.split('?');
			classToParse = rawClassSplit[0];
			classToParseSelectorStr = rawClassSplit[
				1]; // rawClassSplit[1].slice(0, -1); // Remove the trailing bracket <-- Not necessary anymore since we're using ? instead of enclosed brackets
			classToParseSelectorStr = classToParseSelectorStr.replace(/\\_/g,
				"EU"); // Substitute escaped underscores temporarily
			classToParseSelectorStr = classToParseSelectorStr.replace(/\_/g, ' ');
			classToParseSelectorStr = classToParseSelectorStr.replace(/EU/g,
				"_"); // Restore underscores where appropriate
		} else {
			classToParse = rawClass;
		}

		if (rawClass.includes('placeholder'))
			console.error("Placeholder styles are not currently supported in Paradigm CSS.");

		// Begin same for both conditions
		let classParts = classToParse.split(':');
		if (classParts[0] == '')
			classParts[0] = 'all';

		// If the value is marked as !important, update the style blueprint and remove it from the value
		// This is required for the Paradigm CSS variables to work correctly
		if( classParts[2] && classParts[2].includes('!important') ) {
			addClassBluePrint.important = true;
			classParts[2] = classParts[2].replace('!important', '');
		}

		// If the value is a variable, replace it
		if (classParts[2] && classParts[2].charAt(0) === '{' && classParts[2].charAt(classParts[2]
				.length - 1) === '}') {
			classParts[2] = classParts[2].replace('{', '').replace('}', '');
			if (ParadigmCSS.variables[classParts[2]]) {
				classParts[2] = ParadigmCSS.variables[classParts[2]];
			}
		}

		addClassBluePrint.breakpoint = classParts[0];
		addClassBluePrint.attribute = classParts[1];
		addClassBluePrint.value = classParts[2];

		let k = 3;
		while (k < classParts.length) {
			if (classParts[k])
				addClassBluePrint.states.push(classParts[k]);
			k++;
		}
		addClassBluePrint.selectors = classToParseSelectorStr;

		if (addClassBluePrint.value && addClassBluePrint.value.includes('calc') === true) {

			let currentValue = addClassBluePrint.value;

			if (currentValue.includes('_'))
				currentValue = currentValue.replace(/\_/g, '');

			if (currentValue.includes(' '))
				currentValue = currentValue.replace(/(\s)/g, '');

			if (currentValue.includes('-'))
				currentValue = currentValue.replace(/\-/g, ' - ');

			if (currentValue.includes('+'))
				currentValue = currentValue.replace(/\+/g, ' + ');

			if (currentValue.includes('*'))
				currentValue = currentValue.replace(/\*/g, ' * ');

			if (currentValue.includes('/'))
				currentValue = currentValue.replace(/\//g, ' / ');

			addClassBluePrint.value = currentValue;

		}

		if (typeof cssStringBlueprint[addClassBluePrint.breakpoint] !== 'undefined')
			cssStringBlueprint[addClassBluePrint.breakpoint].push(addClassBluePrint);

	});

	let cssString = '';

	ParadigmCSS.breakpoints.forEach(function (breakpoint) {

		if (cssStringBlueprint[breakpoint.classSlug].length > 0)
			cssString += breakpoint.mediaQueryStr;

		cssStringBlueprint[breakpoint.classSlug].forEach(function (styleBlueprint) {

			if (styleBlueprint.attribute && styleBlueprint.value) {

				let classStr = CSS.escape(styleBlueprint.rawClass);

				if (styleBlueprint.states.length > 0) {
					styleBlueprint.states.forEach(function (state) {
						classStr += ':' + state;
					});
				}

				if (styleBlueprint.selectors)
					classStr += ' ' + styleBlueprint.selectors;

				// Open the brackets for the CSS rules
				classStr += '{';

				// Construct the style string
				classStr += styleBlueprint.attribute + ':' + styleBlueprint.value.replace(
					/\_/g, ' ');

				// If the style should have ultimate precedence, add !important
				if ( styleBlueprint.important === true )
					classStr += ' !important';

				classStr += ';';

				// Close out the brackets for the CSS rules
				classStr += '}';

				// Add the class string to the CSS string itself
				cssString += '.' + classStr;

			}
		});

		// If necessary, close out the media query
		if (breakpoint.classSlug !== 'all' && cssStringBlueprint[breakpoint.classSlug].length > 0)
			cssString += '}';

	});

	// Retrieve the Paradigm CSS Styles tag
	let paradigmStyles = document.getElementById('ParadigmCSS');

	// If the Paradigm CSS Styles tag does not exist yet, create it now.
	// Store it in the same paradigmStyles variable so we can use the same innerHTML call below.
	if (paradigmStyles === null) {
		let head = document.head || document.getElementsByTagName('head')[0];
		paradigmStyles = document.createElement('style');
		head.appendChild(paradigmStyles);
		paradigmStyles.id = 'ParadigmCSS';
		paradigmStyles.type = 'text/css';
	}

	// Inject the styles into the Paradigm CSS Style tag
	paradigmStyles.innerHTML = cssString;

	// The two lines below will calculate how long it took for ParadigmCSS
	// to render the styles on the page and add it to the console.
	// This will be removed in paradigm.css.min.js
	let duration = Date.now() - start;
	console.log("Paradigm CSS rendered styles for " + rawClasses.length + " classes in " + duration + "ms");

	// If the body has display:none, remove it
	if (document.body.style.display === 'none')
		document.body.style.display = null;

	// If a callback was specified, trigger it now.
	if (props && props.callback)
		props.callback();

	return true;

};