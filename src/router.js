import {
  shellHandler,
  gamesHandler,
  puzzleHandler,
  settingsHandler,
  signinHandler,
  tosHandler,
  privacyHandler,
  helpHandler,
  pageNotFoundHandler,
} from './factory.js';
import { currentUser } from './pages/signin/signinC.js';
import { constants } from './constants.js';
import { clearGameParameters } from './pages/puzzle/puzzleC.js';
import { clearGameList } from './pages/games/gamesC.js';

let regexTester = null;

/**
 * Specifies html and handler to be used for any window.location.pathname change. Any
 * base route that is not listed will display a 404 html web page.
 */
const routes = {
  '/': { html: '/shell.html', handler: shellHandler },
  '/index.html': { html: '/shell.html', handler: shellHandler },
  '/games': { html: '/pages/games.html', handler: gamesHandler },
  '/puzzle': { html: '/pages/puzzle.html', handler: puzzleHandler },
  '/settings': { html: '/pages/settings.html', handler: settingsHandler },
  '/signin': { html: '/pages/signin.html', handler: signinHandler },
  '/tos': { html: '/pages/tos.html', handler: tosHandler },
  '/privacy': { html: '/pages/privacy.html', handler: privacyHandler },
  '/help': { html: '/pages/help.html', handler: helpHandler },
  '/404': { html: '/pages/404.html', handler: pageNotFoundHandler },
};

/**
 * Calls an event handler based on the url.  Event handlers
 * are imported for each legitimate route defined in routes. `urlString` is a string
 * supplied by the calling function. This (route) funtion is responsible
 * for changing the url in the browser with the replaceState call.
 * @param {string} urlString string containing the url to navigate to
 * @param {boolean} fromHistory true if popped from history
 */
function route(urlString, fromHistory) {
  clearGameParameters();
  clearGameList();
  const oldUrl = history.state ? new URL(history.state.url) : null;
  const newUrl = new URL(
    urlString.match(/http/i) ? urlString : location.origin + urlString
  );
  if (!oldUrl || oldUrl.pathname === '/signin' || oldUrl.pathname === '') {
    history.replaceState({ url: newUrl.href }, '', newUrl.href);
  } else if (
    !fromHistory &&
    oldUrl &&
    oldUrl.pathname !== newUrl.pathname &&
    oldUrl.search !== newUrl.search
  ) {
    history.pushState({ url: newUrl.href }, '', newUrl.href);
  }
  handleLocation(newUrl);
}

/**
 * Checks `urlString` for valid route, then if valid passes it along to the
 * appropriate handler, which must be imported.
 * @param {object} newUrl
 */
function handleLocation(newUrl) {
  const path = newUrl.pathname;
  const route = routes[path] || routes[404];
  if (route !== routes[404]) {
    document.cookie =
      `xwwf-last=${currentUser ? currentUser.uid : null}&last_loc=${
        newUrl.href
      }; ` + `max-age=${constants.COOKIE_MAX_AGE_BOOKMARK}`;
  }
  route.handler(newUrl.href, route.html);
}

window.onpopstate = checkState;

function checkState(e) {
  if (e.state) {
    console.log(e.state);
    route(e.state.url, true);
  }
}

/**
 * Initializiation of routing happens in signinC.js.  If routing should be initialized
 * by router.js, uncomment line below.
 */
// handleLocation();

export { route };
