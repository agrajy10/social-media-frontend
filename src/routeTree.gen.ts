/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ResetPasswordImport } from './routes/reset-password'
import { Route as IndexImport } from './routes/index'

// Create Virtual Routes

const RegisterLazyImport = createFileRoute('/register')()
const ForgotPasswordLazyImport = createFileRoute('/forgot-password')()
const MyProfileChangePasswordLazyImport = createFileRoute(
  '/my-profile/change-password',
)()

// Create/Update Routes

const RegisterLazyRoute = RegisterLazyImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/register.lazy').then((d) => d.Route))

const ForgotPasswordLazyRoute = ForgotPasswordLazyImport.update({
  id: '/forgot-password',
  path: '/forgot-password',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/forgot-password.lazy').then((d) => d.Route),
)

const ResetPasswordRoute = ResetPasswordImport.update({
  id: '/reset-password',
  path: '/reset-password',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const MyProfileChangePasswordLazyRoute =
  MyProfileChangePasswordLazyImport.update({
    id: '/my-profile/change-password',
    path: '/my-profile/change-password',
    getParentRoute: () => rootRoute,
  } as any).lazy(() =>
    import('./routes/my-profile/change-password.lazy').then((d) => d.Route),
  )

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/reset-password': {
      id: '/reset-password'
      path: '/reset-password'
      fullPath: '/reset-password'
      preLoaderRoute: typeof ResetPasswordImport
      parentRoute: typeof rootRoute
    }
    '/forgot-password': {
      id: '/forgot-password'
      path: '/forgot-password'
      fullPath: '/forgot-password'
      preLoaderRoute: typeof ForgotPasswordLazyImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterLazyImport
      parentRoute: typeof rootRoute
    }
    '/my-profile/change-password': {
      id: '/my-profile/change-password'
      path: '/my-profile/change-password'
      fullPath: '/my-profile/change-password'
      preLoaderRoute: typeof MyProfileChangePasswordLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/reset-password': typeof ResetPasswordRoute
  '/forgot-password': typeof ForgotPasswordLazyRoute
  '/register': typeof RegisterLazyRoute
  '/my-profile/change-password': typeof MyProfileChangePasswordLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/reset-password': typeof ResetPasswordRoute
  '/forgot-password': typeof ForgotPasswordLazyRoute
  '/register': typeof RegisterLazyRoute
  '/my-profile/change-password': typeof MyProfileChangePasswordLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/reset-password': typeof ResetPasswordRoute
  '/forgot-password': typeof ForgotPasswordLazyRoute
  '/register': typeof RegisterLazyRoute
  '/my-profile/change-password': typeof MyProfileChangePasswordLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/reset-password'
    | '/forgot-password'
    | '/register'
    | '/my-profile/change-password'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/reset-password'
    | '/forgot-password'
    | '/register'
    | '/my-profile/change-password'
  id:
    | '__root__'
    | '/'
    | '/reset-password'
    | '/forgot-password'
    | '/register'
    | '/my-profile/change-password'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  ResetPasswordRoute: typeof ResetPasswordRoute
  ForgotPasswordLazyRoute: typeof ForgotPasswordLazyRoute
  RegisterLazyRoute: typeof RegisterLazyRoute
  MyProfileChangePasswordLazyRoute: typeof MyProfileChangePasswordLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ResetPasswordRoute: ResetPasswordRoute,
  ForgotPasswordLazyRoute: ForgotPasswordLazyRoute,
  RegisterLazyRoute: RegisterLazyRoute,
  MyProfileChangePasswordLazyRoute: MyProfileChangePasswordLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/reset-password",
        "/forgot-password",
        "/register",
        "/my-profile/change-password"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/reset-password": {
      "filePath": "reset-password.tsx"
    },
    "/forgot-password": {
      "filePath": "forgot-password.lazy.tsx"
    },
    "/register": {
      "filePath": "register.lazy.tsx"
    },
    "/my-profile/change-password": {
      "filePath": "my-profile/change-password.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
