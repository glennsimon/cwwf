import {
  shellHandler,
  gamesHandler,
  puzzleHandler,
  settingsHandler,
  signinHandler,
  tosHandler,
  privacyHandler,
  helpHandler,
} from './factory.js';
import { currentUser } from './pages/signin/signinC.js';
import { constants } from './constants.js';

let regexTester = null;

/**
 * Specifies html and handler to be used for any window.location.pathname change. Any
 * base route that is not listed will display a 404 html web page.
 */
const routes = {
  '/': { html: '/shell.html', handler: shellHandler },
  '/games': { html: '/pages/games.html', handler: gamesHandler },
  '/puzzle': { html: '/pages/puzzle.html', handler: puzzleHandler },
  '/settings': { html: '/pages/settings.html', handler: settingsHandler },
  '/signin': { html: '/pages/signin.html', handler: signinHandler },
  '/tos': { html: '/pages/tos.html', handler: tosHandler },
  '/privacy': { html: '/pages/privacy.html', handler: privacyHandler },
  '/help': { html: '/pages/help.html', handler: helpHandler },
};

/**
 * Calls an event handler based on the url.  Event handlers
 * are imported for each legitimate route defined in routes. `urlString` is a string
 * supplied by the calling function. This (route) funtion is responsible
 * for changing the url in the browser with the replaceState call.
 * @param {string} urlString string containing the url to navigate to
 */
function route(urlString) {
  window.history.replaceState({}, '{Chrome: 😍, Safari: 💩}', urlString);
  handleLocation(urlString);
}

/**
 * Checks `urlString` for valid route, then if valid passes it along to the
 * appropriate handler, which must be imported.
 * @param {string} urlString
 */
function handleLocation(urlString) {
  // const urlStringData = checkRoute(urlString);
  const routePath = checkRoute(urlString);
  // urlStringData ? urlStringData[1] : null;
  if (routePath) {
    document.cookie =
      `xwwf-last=${
        currentUser ? currentUser.uid : null
      }&last_loc=${urlString}; ` +
      `max-age=${constants.COOKIE_MAX_AGE_BOOKMARK}`;
    routes[routePath].handler(urlString, routes[routePath].html);
  } else {
    fetch('/pages/404.html').then((data) => (document.body.innerHTML = data));
  }
}

/**
 * Checks `urlString` for valid route and returns array with the valid route
 * pathname in position 0, or null if the route is not valid.
 * @param {string} urlString url to be fetched
 * @return {array} array containing routes object key in position [1],
 * or null if invalid route
 */
function checkRoute(urlString) {
  const url = new URL(urlString, window.location.origin);
  console.log(url);
  if (Object.keys(routes).includes(url.pathname.toLowerCase()))
    return url.pathname.toLowerCase();
  return null;
}

window.history.onpopstate = (event) => {
  const urlString = event.target.location.href;
  if (urlString) route(urlString);
};

window.onload = () => route(location.href);

export { route };
