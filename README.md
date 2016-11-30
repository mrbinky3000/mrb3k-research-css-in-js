# Researching CSS in JS
Converted the "React + Alt" branch of  [TODO MVC](http://todomvc.com/examples/react/#/) to use [CSS in JS](https://vimeo.com/116209150) via [Radium](https://formidable.com/open-source/radium/) in order to learn more about the process.

Please note! This is a proof of concept! I didn't mess around too much with TODOMVC's logic or the style choices.  That is not the purpose of this experiment.  They made a lot of css rules that I would have done differently, and I wouldn't have broken down the components the same way, or passed data around the same way.

Please __DO__ look at the files in the app/components directory that end in "Css.js" and how they are included into the JSX of the components.  That's the main take-away here.

You can see it in action here: https://mrbinky3000.github.io/mrb3k-research-css-in-js/#/

I used my Webpack2 + React boilerplate project as the base for this app.  Check it out here: https://github.com/mrbinky3000/mrb3k-react-webpack-boilerplate
## Notes
### It doesn't add bloat to your HTML.  It also does bloat your HTML. ;-)
Yes, all the styles are applied inline to your HTML. However, on the client side, there is no bloat. For example, If your page displays 100 rows of data, and each of those rows has styling, your HTML will not grow in KB over the wire.

There may be some issues with performance on pages with thousands of rows, or with lots of DOM elements in general, since altering the DOM is expensive for the browser.  I have a feeling these would be rare cases.  After all, Facebook invented this for their site, and their site has lots of DOM elements.  Heck, their newsfeed has an endless scroll.

For the client, HTML and javascript are downloaded and the css is applied to the elements at runtime.  If you use [Webpack](https://webpack.github.io/) you can create chunks that hold your CSS in JS code to leverage caching.

*HOWEVER*, if you are doing server-side rendering, I'm assuming that the rendered HTML will indeed have the same styles applied 100 times inline for each row of data.  I need to test this further.

*TODO* Test to see if server-side rendered files are large.
### What about resets and applying styles to element tags?
Radium contains a `<Style></Style>` tag that work a lot like a regular `<style></style>` tag. You can put whatever raw CSS you want in here. It's useful for fonts and global resets. I am not sure I like this, thought.  I think if you're going to got CSS in JS, then EVERYTHING should be CSS in JS, otherwise you still have the same old problems with implicit inheritance.  Here's an example from the main index.js for our app.  I'll talk more about my reservations after the example.

```javascript
const baseStyles = {
  html: {
    margin: 0,
    padding: 0,
  },
  get body() {
    return Object.assign({}, this.html, {
      fontSize: 14,
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      // ... and so on
    });
  },
  ':focus': {
    outline: 0,
  },
  button: {
    margin: 0,
    padding: 0,
    border: 0,
    // ... and so on
  },
  hr: {
    marginTop: 20,
    marginRight: 0,
    // ... and so on
  },
};

// ...

const Index = (
  <StyleRoot>
    <Style rules={baseStyles} />
    <App />
  </StyleRoot>
);

ReactDOM.render(Index, document.getElementById('app'));
```
This feels like a hack and it defeats the purpose of putting CSS in JS.  Theoretically, one could put all of their CSS in a `<Style />` block.  I could see frustrated contract workers on a large project easily bypassing CSS in JS and revert to plain old CSS using the `<Style />` tag. Of course, in this worst-case scenario, there would be a lot of `!important` modifiers in the CSS to over-ride the inline styles inserted by Radium.  Ugh!  Nightmares! I guess that's why we have code reviews.
### Units
By default, raw integers are interpreted as pixels.  All other forms of CSS units like rem, %, or vh, and so on must be strings.
### Cascading
There is no implicit cascading between rules created via CSS in JS.  That's a good thing, and main reason why you would use CSS in JS. You must inherit from another rule explicitly.  However, any CSS created in `<Style></Style>` tags elsewhere will cascade, thus re-introducing cascade issues. Here is some pseudocode for an example:
```javascript
// File X someplace
<Style
  rules={{
    p: {
      textDecoration: 'strike-through',
    }
  }}
/>

// File Y
export default {
  thingA: {
    fontSize: '1.3em',
  },
  get thingB() {
    return Object.assign({}, this.thingA, {
      color: 'red',
    });
  }
}

// File Z
import React from 'react';
import Radium from 'radium';
import styles from './FileY'; // importing from File Y above

<p style={styles.thingB}>Hello World!</p>
```
In the above example, thingB changes the color of the text to red.  It inherits the 1.3em font size from thingA. And finally, it inherits the strike-through text-decoration from the `<Style />` declaration in File X.

This means you can still encounter many the problems of legacy inheritance that you encounter now, only now it's harder to find the offending rule in JS code.  

I think `<Style></Style>` solves some issues but has the potential of really complicating things. I can easily see inexperienced or lazy programmers, or just programmers who are unable to adapt to the CSS in JS concept relying on the `<Style />` tag too much at the beginning of a project, or when trying to make a quick fix.

You should really limit the use of that tag to a bare minimum.

Notice the use of ES6 get() in the FileY json object. I'm using Babel to access new ES6 features like getters. Otherwise, I guess you can make every CSS in JS file a constructor or something else that spits out the proper JSON object.  There are lots of possibilities for handling inheritance.
### :hover triggering
A hover that changes something on the element being hovered over is easy.  Here is some pseudocode.
```javascript
// styes file
const styles = {
  myHoverExample: {
    color: 'black',
    ':hover': {
      color: 'red'
    }
  }
}

// somewhere in a component
<p style={styles.myHoverExample}>Hover over me</p>
```
In the above example, you you hovered over the paragraph, the color of the paragraph's text will change from black to red.

What about hover states that trigger changes in other elements? Remember, when using CSS in JS, all css inheritance is explicit&ast;&ast; in CSS in JS, not explicit (unless you hack your css with `<Style></Style>`, see previous section)

This seem like it might be a stumbling block for folks.  The key is to stop thinking about CSS as CSS and start thinking of it as React code. Once you accept that your CSS is now code, this concept is easy to grasp. React components have a `this.state` property.  Radium has a `Radium.getState` method so that you can query the hover state of an element.

Here is an example of a hover triggering changes in a target element.

&ast;&ast;See notes about using the `<Style />` tag.
```javascript

// your CSS in JS file...
const styles = {
  trigger: {
    ':hover': {}, // tell radium to track this state, used below
  },
  target: {
    display: 'none'
  }
  targetHover {
    display: 'block'
  }
}

// in your React component's JSX
export default Class Example extends React.component {

  // ... code

  render() {
    return (
      <div>
        <div>
          <p styles={styles.trigger}>Hover over me, I am the trigger!</p>
        </div>
        <div>
          Lorem Ipsum Dolor
        </div>
        <div
          style={[
            styles.target,
            Radium.getState(this.state, 'unique identifier', ':hover') && styles.targetHover
          ]}
        >
          Hey, I am the target!!
        </div>        
      </div>
    )
  }
}
```
In the example above, you can tap into the Radium API and use it, along with state, to trigger style changes on elements way off on other branches in the DOM.

Don't forget you can also trigger stuff based on `:active` and `:visited`.  That's cool.  You can conditionally show or hide stuff based on if they've already visited a link during the current session without using cookies or local storage.  Neat!

You can find more information on the Radium api and the getState method [here](https://github.com/FormidableLabs/radium/tree/master/docs/api#getstate).
### :before and :after and other pseudo elements.
At the time of this experiment Radium did not support all of the pseudo elements.  It does support `:hover`, `:active`, and `:visited` but not `:before` and `:after`.  Since :before occurs before the element in question, they suggest just adding span or div element before the current element and assign a style to that element.  Similarly, they recommend you Add a div after for :after.

This can be a pain for elements that are repeated a lot.

__There are two workarounds:__
#### 1) Use the Style Tag
Radium has a `<Style></Style>` React component that allows you to insert regular CSS into a page.  They Style component can be restricted so that it only applies rules to a particular DOM element and it's children (aka, scoped CSS, aka CSS module).  Notice the use of the "scopeSelector" attribute on the Style component.
```javascript
<div style={styles.todoapp} className="todoapp">
  <Style
    scopeSelector=".todoapp"
    rules={{
      '::-webkit-input-placeholder': {
        fontStyle: 'italic',
        fontWeight: 300,
        color: '#e6e6e6',
      },
      '::-moz-placeholder': {
        fontStyle: 'italic',
        fontWeight: 300,
        color: '#e6e6e6',
      },
      '::input-placeholder': {
        fontStyle: 'italic',
        fontWeight: 300,
        color: '#e6e6e6',
      },
    }}
  />
  <header className="header">
    <h1 style={styles.todoappH1}>todos</h1>
    <input
      style={styles.newTodo}
      placeholder="What needs to be done?"
      value={this.state.newTodo}
      onKeyDown={this.handleNewTodoKeyDown.bind(this)}
      onChange={this.handleChange.bind(this)}
      autoFocus
    />
  </header>
  // ...
</div>
```
#### 2) Abstract the process into a component
Convert a DOM element that uses before and after pseudo elements into a component that inserts the before and after elements for you. This can be a pain if you have to refactor in the future.
## Conclusions
I've seen some really ugly sass mixins trying to emulate javascript.  CSS in JS eliminates that nightmare.  You are actually programming CSS and can leverage everything that the JavaScript language has to offer: modules, classes, IIFE's, loops, everything.  It would be easy to program a grid system.

CSS in JS also eliminates dead CSS.  You'll never have dead CSS since JS minimizers eliminate dead code.  You can use tools like Webpack and code chunking to split out the CSS in JS code and cache it long-term.

__My gut says "nope for now", but I still might use it__

All-in-all, the lack of support for before, after, first-child and last-child  pseudo elements is a deal-breaker for me and Radium.  I realize that first-child, last-child, nth-child can all be handled programmatically in the javascript. Perhaps you can abstract this into some iterator javascript class or helper function.  

__Basically, I'd have to make a new library of, what are essentially mixins, to abstract out all these common issues.  Perhaps someone has already made this?  A list of useful CSS in JS utility methods similar in nature to a library like underscore?__

There is good news  a new CSS in JS library called [Aphrodite](https://github.com/Khan/aphrodite) that seems to handle before, after, global fonts, and it works on isomorphic apps (aka apps that render in the client and on the server. aka sever-side rendering).

