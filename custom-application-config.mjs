import { PERMISSIONS, entryPointUriPath } from './src/constants';

/**
 * @type {import('@commercetools-frontend/application-config').ConfigOptionsForCustomApplication}
 */
const config = {
  name: 'Starter C72bd6',
  entryPointUriPath,
  cloudIdentifier: 'gcp-eu',
  env: {
    development: {
      initialProjectKey: 'ca-test-0801-venkatesh',
    },
    production: {
      applicationId: 'clrg7sme50066b4khm4ru793f',
      url: 'https://ca-test-0801-venkatesh.vercel.app',
    },
  },
  oAuthScopes: {
    view: ['view_products','view_shopping_lists'],
    manage: ['manage_products','manage_shopping_lists'],
  },
  icon: '${path:@commercetools-frontend/assets/application-icons/rocket.svg}',
  mainMenuLink: {
    defaultLabel: 'Template starter',
    labelAllLocales: [],
    permissions: [PERMISSIONS.View],
  },
  submenuLinks: [
    {
      uriPath: 'channels',
      defaultLabel: 'Channels',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View],
    },
    {
      uriPath: 'shopping-lists',
      defaultLabel: 'Shopping Lists',
      labelAllLocales: [],
      permissions: [PERMISSIONS.View],
    }
  ],
};

export default config;
