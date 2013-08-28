# Requirements

This plugin requires:

- F2.js (1.2.1+)
- RequireJS (2.0+)

# Getting Started

Add the minified file to your page after F2.js and RequireJS.

	<script src="require.min.js"></script>
	<script src="f2.min.js"></script>
	<script src="f2.requirejs.min.js"></script>

Next, add your AppConfigs to the `require.config` object.

	require.config({
		f2: {
			appConfigs: [
				{
					appId: "com_example_first_app",
					manifestUrl: "http://yourdomain.com/f2/",
					enableBatchRequests: true
				},
				{
					appId: "com_example_second_app",
					manifestUrl: "http://yourdomain.com/f2/",
					enableBatchRequests: true
				}
			]
		},
		initConfig: {
			// Properties passed to F2.init()
		}
	});

You can also specify properties you want to be passed to `F2.init()` inside the `initConfig` object. You can view a full list of configuration options in the [F2.ContainerConfig documentation](http://docs.openf2.org/sdk/classes/F2.ContainerConfig.html).

# Examples

## Load a Single App

In this example, we'll use the RequireJS plugin, `F2App`, to load a single app where `com_example_first_app` is the appId.

	require(["F2App!com_example_first_app"], function(appHandlers) {
		
		// Add an AppHandler to create the root
		appHandlers.APP_CREATE_ROOT(function(appConfig) {
			// Create a new root
			appConfig.root = document.createElement("div");
			// Add the root to the DOM
			document.body.appendChild(appConfig.root);
		});

		// Add an AppHandler to inject the HTML into the root
		appHandlers.APP_RENDER(function(appConfig, appHtml) {
			// Add the app's html to the root
			appConfig.root.innerHTML += appHtml;
		});

	});

The `appHandlers` param in the plugin's callback function contains properties for each possible AppHandler. You can see a full list of them [here](http://docs.openf2.org/sdk/classes/F2.AppHandlers.html).

## Loading Multiple Apps

There are two ways to load multiple apps with a single use of the plugin.

### One Require, One Request

The first way to load a series of apps is to add `enableBatchRequests: true` to your AppConfigs. This tells F2 to combine apps into as few ajax requests as possible. Typically, this means one request per domain.

The syntax looks very similar to our first call except that we've broken up the appIds onto separate lines.

	require([
		"F2App!com_example_first_app", 
		"F2App!com_example_second_app"
	], function(firstAppHandlers, secondAppHandlers) {
		
		// Create the root for "com_example_first_app"
		firstAppHandlers.APP_CREATE_ROOT(function(appConfig) {
			// Create a new root
			appConfig.root = document.createElement("div");
			// Add the root to the DOM
			document.body.appendChild(appConfig.root);
		});

		// Create the root for "com_example_second_app"
		secondAppHandlers.APP_CREATE_ROOT(function(appConfig) {
			// Create a new root
			appConfig.root = document.createElement("div");
			// Add the root to the DOM
			document.body.appendChild(appConfig.root);
		});

		// Add additional AppHandlers as needed here

	});

Executing this example will result in a single ajax call for both appIds. 

Unlike typical RequireJS plugins, `F2App` does not return a cached result if you attempt to load the same resource twice. It will load a new instance of an app as many times as you request it.

You'll notice that we have two sets of AppHandlers. Typically, you'd register a single function per handler and create `switch` or `if` blocks to handle specific appIds. The plugin gives you hooks for each app, so you can assign the behavior directly.

### One Require, Many Requests

Using the exact code from our previous example will yield different results if we set `enableBatchRequests: false` in our AppConfigs. If we tell F2 not to batch the apps, it will  make an ajax call for each appId.

# Troubleshooting

## JavaScript Errors

### Object has no method 'APP_RENDER'

This happens when `F2App` did not find the requested appId in `require.config`. When this happens, the AppHandler response object will contain an `error` property with the detailed exception.

### Define is not defined

This is caused when RequireJS has not been added to the page. You can find the download link [here](http://requirejs.org/docs/download.html). If you've added RequireJS, make sure it is included _before_ this plugin.

### F2 is not defined

This occurs when F2.js has not been added to the page prior to this plugin. If you've already downloaded F2, make sure the order is correct. If you don't have the script, you can download it from [F2's GitHub page](https://github.com/OpenF2/F2).