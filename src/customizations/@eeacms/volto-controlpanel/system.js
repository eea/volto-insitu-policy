/* eslint no-console: ["error", { allow: ["warn", "log"] }] */

/**
 * Customization of @eeacms/volto-controlpanel/system.
 *
 * Upstream PATCHes `${internalApiPath}/@system` to persist FRONTEND_VERSION on
 * the backend registry. Our RAZZLE_INTERNAL_API_PATH carries a
 * VirtualHostBase/VirtualHostRoot segment, so Plone rewrites the request URL to
 * the public hostname. eea.api.controlpanel (restapi/update.py) tests
 * `context.absolute_url()` against `http://localhost` / `http://backend` and,
 * when it does not match, logs `DENIED public API PATCH` and replies
 * `204 No Content` -- which upstream reports as "already up-to-date", so the
 * write silently never lands.
 *
 * Two changes:
 *  - strip the VirtualHost segment so the URL Plone resolves stays internal;
 *  - branch on `response.ok` instead of inferring success from an empty body.
 */

/**
 * http://backend:8080/VirtualHostBase/https/example.org:443/site/VirtualHostRoot
 *   -> http://backend:8080/site
 */
export const stripVirtualHosting = (path) =>
  path.replace(
    /\/VirtualHostBase\/[^/]+\/[^/]+\/(.*?)\/VirtualHostRoot(\/.*)?$/,
    '/$1',
  );

export const updateSystemInfo = (config) => {
  const internalApi =
    config.settings.internalApiPath || config.settings.devProxyToApiPath;
  const version = config.settings.frontendVersion;
  const fetchApi = typeof fetch === 'function' ? fetch : undefined;

  // Nothing to do
  if (!version || !internalApi || !fetchApi) {
    return config;
  }

  const apiPath = stripVirtualHosting(internalApi);

  // Backend @system update via PATCH is allowed only via internal API, and the
  // backend checks the URL *after* VirtualHost rewriting -- hence apiPath.
  if (
    !(
      apiPath.startsWith('http://localhost') ||
      apiPath.startsWith('http://backend')
    )
  ) {
    return config;
  }

  // Persist FRONTEND_VERSION on backend registry
  const url = `${apiPath}/@system`;
  fetchApi(url, {
    method: 'PATCH',
    body: JSON.stringify({
      'eea.kitkat.interfaces.IEEAVersionsFrontend.version': version,
      'eea.api.controlpanel.interfaces.IEEAVersionsFrontend.version': version,
    }),
    headers: {
      Accept: 'application/json',
    },
  })
    .then((response) =>
      response.text().then((text) => {
        if (response.ok) {
          console.log(
            `Updated FRONTEND_VERSION on backend registry: ${version} (${response.status})`,
          );
        } else {
          console.warn(
            `Could NOT update FRONTEND_VERSION on backend: ${response.status} ${text}`,
          );
        }
      }),
    )
    .catch((err) =>
      console.warn(`Could NOT update FRONTEND_VERSION on backend: ${err}`),
    );

  return config;
};
