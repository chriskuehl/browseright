![BrowseRight: Keeping the new frontier a safe one.](https://raw.github.com/chriskuehl/browseright/master/dev/graphics/logos/final%20logos/full%20logo.png)

BrowseRight
===========

BrowseRight is an iPad app for teaching students to be responsible digital citizens. Students read short lessons
and then complete quizzes to prove their learning.

BrowseRight can be used by schools to educate students and to help satisfy CIPA law requirements mandating that
schools teach students about digital citizenship.

Apps are available for the following platforms:

* iPad [(app store)](https://itunes.apple.com/app/browseright/id625903248?ign-mpt=uo%3D6&mt=8)

The website can be viewed at [browseright.org](https://browseright.org/).

### Technologies
BrowseRight consists of two main parts:

1. A server web application written using the [Grails](http://grails.org/) web framework
2. A series of device-specific applications (currently only available for the iPad) written primarily in JavaScript
using the [PhoneGap](http://phonegap.com/) app framework.

We use a lot of JavaScript libraries in our client applications, the primary ones being jQuery and jQuery UI (not
jQuery Mobile). Many others are also used (see the `js/lib` folder).

### Building BrowseRight
#### Server app
Download and install the version of Grails used for the server app (currently **2.3.1**). It should build without any
additional configuration. Use `grails run-app` for testing on your machine and `grails war` to create a WAR file to
deploy to a Java application server.

When running in the `production` environment, the JDBC URL, username, and password are read from the following
environment variabes:

* `JDBC_URL`
* `JDBC_USERNAME`
* `JDBC_PASSWORD`

(right now only MySQL is supported but it should be very simple to support other databases, potentially by moving
the driver to an environment variable)

To add admin users (users that are able to edit content via the web interface), add environment variables in the
following format:

    export NINETEEN_ADMIN_TEST='$2a$10$W5oU6LKLmvY6EVcJrrpryuQyWVlxUmc/KZ4tGwc7zm9tNL81laPNS'
    
(for user "test", case insensitive, value is the bcrypt-hashed password, in this case "test")

#### Client app
###### iOS
This requires you to run OS X due to the closed nature of the iOS development platform.

This is trickier because you need an Apple iOS developer account (USD$100/year) to run BrowseRight on your own device.
You can, however, test with the iOS simulator.

We can't share our developer certificates/keys, but will use them to build all official releases of BrowseRight, so
feel free to make changes and submit a pull request.

The version of PhoneGap in use is contained in the repository so you shouldn't need to install it.

### Content
BrowseRight contains a number of articles and quizzes. These are all available under the MIT license (as is our code),
but are not currently in the repository.

### Contributing
We welcome contributions both to our codebase (improving the app(s) or server), and to our content!

Because of the nature of the App Store, creating a competing fork can be problematic. Because of this, we strongly
encourage you not to create a competing fork of BrowseRight (unless you want to take it in a completely different
direction) and instead to submit a pull request or open an issue with your changes.

You are free to create a competing fork (our code is released under the MIT license), but we believe it would be
beneficial for you to instead work with us to improve the app. We'd love to include your changes!

If you do decide to create a competing fork, I think you will probably have to change the name from "BrowseRight"
and change all of the graphics in order for it to be accepted by Apple.

Frankly, there aren't a lot of open-source apps on the App Store, so there isn't much precedent to go on. We just think
it would generally be beneficial to everyone to only have one copy of BrowseRight on the App Store.

<sup>By *competing fork* I mean forking the project, making changes, and then submitting your fork to the App
Store.</sup>

### License
BrowseRight is copyright &copy; 2013 Chris Kuehl and Caleb Dotson, with original code and images released under an MIT
license. See `LICENSE` for details.
