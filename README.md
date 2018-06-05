# react-dynamic-component-load-poc
A POC to discover how components can be loaded at run time depending on specific app conditions.

##Learnings:

###History:

- Reference Link: https://medium.com/@pshrmn/a-little-bit-of-history-f245306f48dd
- Install with: """yarn add history"""
- There are 3 types, which are closely the same in their structure: createBrowserHistory, createHashHistory, createMemoryHistory.
- Location is the most important property of a history object. Properties within this object include: 'pathname', 'search[]', hash.
- Example of location object:

###History > location:

"""
{
  pathname: '/here',
  search: '?key=value',
  hash: '#extra-information',
  state: { modal: true },
  key: 'abc123'
}
"""

- As an application is navigated the History object keeps an array of each location object in an array.
- e.g. """history.location[{X...},{Y...},{Z...}]"""
- This history object will keep an index that points to the last location provided.

###History > navigation:

- We can programatically go to a new path by using the following method: """history.push({ pathname: '/new-place' })"""
- We can do this if we need to calculate when view to navigate to before the transition.

###History > navigation > redirects:

Redirects are a good time to use replace. This is what React Router’s <Redirect> component uses.

For example, if you are on one page and click a link that navigates to a second page, that second page might redirect to a third page. If the redirect uses push, clicking the back button from the third will bring you back to the second page (which potentially would redirect you back to the third page again). Instead, by using replace, going back from the third page will take you to the first.

So, if we auto navigate users to a page from another we should use 'replace' - otherwise users will be trapped if we use 'push'.

""" history.replace({ pathname: '/go-here-instead' }) """

###History > navigation... More methods

Finally, there are three related methods: goBack, goForward, and go.

"""

  history.goBack()
  history.goForward()
  history.go(-3)

""

###History > State Change Watch

Similar to StateChange Events inside Angular's UI Router, we can
use React Router to watch for changes, as shown below:

"""

  const youAreHere = document.getElementById('youAreHere')
  history.listen(function(location) {
    youAreHere.textContent = location.pathname
  })

"""

###In the Browser

Browser and hash histories are both intended to be used in a browser. They interact with the history and location web APIs so that the current location is the same as the one displayed in your browser’s address bar.

"""
const browserHistory = createBrowserHistory()
const hashHistory = createHashHistory()
"""

The biggest difference between the two is how they create a location from a URL. The browser history uses the full URL [3], while the hash history only uses the portion of the URL located after the first hash symbol.
