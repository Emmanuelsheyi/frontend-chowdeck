Frontend — Chowdeck (work-in-progress)

This README summarizes the work done in this frontend workspace and how to run and test it locally.

- Project scaffold: Vite + React. Automatic JSX runtime is enabled via the official Vite React plugin.


- Routing: React Router ( routes wired in `src/App.jsx`).


- Pages/components added or updated: `NavBar`, `Home`, `Restaurants`, `Orders`, `, `Signup`, `Login`.


- Authentication UI: Signup and Login pages implemented with client-side validation, loading states, error handling, and it should redirects to `/vendors` on success.


- HTTP client: switched from fetch to axios for signup/login POST requests.

- Styling: I moved all page styles into `src/index.css` (vanilla CSS). Per-page CSS imports were removed;
  `Signup` and `Login` use global classes.


(what I changed and why)

- `vite.config.js` — updated to use `@vitejs/plugin-react` so JSX transforms work with Vite.

- `package.json` — added `react-router-dom` and `axios` to dependencies.


- `src/App.jsx` — application routes and `NavBar` wired with `BrowserRouter` and `Routes`.

- `src/components/NavBar.jsx` — top navigation with `Link` components for client routing.


- `src/pages/Signup.jsx` —  Uses axios to POST to `/api/auth/signup`, validates inputs, shows inline errors.


- `src/pages/LoginPage.jsx` — login component, just like signup layout. Uses axios to POST to `/api/auth/login`,


- `src/pages/*` — placeholder pages added for `Home`, `Restaurants`, `Orders`, `Vendor`.


- `src/index.css` — global stylesheet. Signup and login styles were migrated here so components use plain CSS classes (no Tailwind).

 How to run (Windows cmd)

1. Install dependencies:

   npm install

2. Start the dev server:

   npm run dev

3. Open the app in the browser ... Test these routes:
   - `/` — home
   - `/signup` — sign up flow
   - `/login` — sign in flow
     (for now no backend endpoint tho)


<!-- to view screenshot for both the sign up and log in page ....  -->
frontend-chowdeck/assets