# Pokedex - 3D Pokémon Viewer

Explore the world of Pokémon in a whole new dimension with the Pokedex! This application allows you to browse and view 3D models of your favorite Pokémon, along with detailed information.

## Features

- **Browse Pokémon Grid**: View a grid of Pokémon with their 3D models.
- **Filter by Generation**: Easily filter Pokémon by their generation.
- **Filter by Form**: Explore different forms of Pokémon, such as Alolan, Galarian, Mega, and more.
- **Search by Name or ID**: Quickly find specific Pokémon using their name or Pokédex number.
- **Detailed Pokémon View**: Click on a Pokémon to see its 3D model, base stats (HP, Attack, Defense, Special Attack, Special Defense, Speed), and available forms and animations.
- **Evolution Chain**: Discover the evolutionary line of each Pokémon.
- **3D Model Interaction**: Use your mouse or touch to rotate and zoom in on the 3D models.
- **Animations**: Watch various animations of the Pokémon models.

## Usage

1.  **Welcome Screen**: The application starts with a welcome screen.
2.  **Pokémon Grid**: After the welcome screen, you'll be taken to the Pokémon grid, where you can see a collection of Pokémon models.
3.  **Filtering**:
    -   Use the "All Forms" dropdown to filter Pokémon by their different forms (Regular, Alolan, Mega, etc.).
    -   Use the "All Generations" dropdown to view Pokémon from specific generations.
    -   Use the search bar to type in a Pokémon's name or ID to find it quickly. Click the search button (🔍) to apply the search.
4.  **Detailed View**: Click on a Pokémon in the grid to navigate to its detailed information page.
5.  **Detailed Information**: On the Pokémon's page, you can:
    -   View the 3D model, which you can interact with.
    -   Select different forms of the Pokémon from the "Select Form" dropdown.
    -   Choose from available animations using the "Select Animation" dropdown.
    -   See the Pokémon's base stats.
    -   Navigate to the previous or next Pokémon using the arrow buttons.
    -   Click the "Evolution List" button to see the Pokémon's evolution chain.
6.  **Evolution Chain**: The evolution chain page displays the Pokémon and its evolutions, allowing you to click on each to view their details.

## Technologies Used

-   [React](https://create-react-app.dev/docs/getting-started/)
-   [Vite](https://vite.dev/guide/)
-   [Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite)
-   [`@google/model-viewer`](https://modelviewer.dev/) (for displaying interactive 3D models)
-   [Axios](https://axios-http.com/docs/intro) (for making HTTP requests to the API)
-   [React Router DOM](https://reactrouter.com/) (for navigation)

## API Sources

The application relies on the following APIs for data:

-   **Pokémon Data and Stats**: [PokeAPI Proxy](https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/)
-   **3D Pokémon Models and Animations**: [Pokémon3D API](https://pokemon-3d-api.onrender.com/v1/pokemon)
-   **Pokémon Species and Evolution Data**: [PokeAPI](https://pokeapi.co/api/v2/)

## Installation

To run this project locally, follow these steps:

1.  Clone this repository:
    ```bash
    git clone "https://github.com/Sudhanshu-Ambastha/Pokedex"
    ```
2.  Navigate to the project directory:
    ```bash
    cd Pokedex
    ```
3.  Install the dependencies:
    ```bash
    npm install @google/model-viewer @tailwindcss/vite axios react react-dom react-router-dom react-three-fiber tailwindcss
    ```
4.  Start the development server:
    ```bash
    npm run dev
    ```
5.  Open your browser and navigate to the address provided by Vite (usually `http://localhost:5173`).

## gh-pages deployment

This section outlines how to deploy your Pokedex to GitHub Pages.

1.  **Install the `gh-pages` package as a development dependency:**
    ```bash
    npm install gh-pages --save-dev
    ```

2.  **Add deployment scripts to your `package.json`:**
    Open your `package.json` file and add the following scripts to the `scripts` section:

    ```json
    "scripts": {
      // ... other scripts
      "predeploy": "npm run build",
      "deploy": "gh-pages -d dist"
    }
    ```
    * `predeploy`: This script will build your project before deployment.
    * `deploy`: This script will publish the `dist` folder (your build output) to the `gh-pages` branch. **Note:** If your build output folder is different (e.g., `build`), adjust the `-d` flag accordingly.

3.  **Build your project:**
    ```bash
    npm run build
    ```

4.  **Deploy to GitHub Pages:**
    ```bash
    npm run deploy
    ```

5.  **Configure GitHub Pages in your repository settings:**
    * Go to your GitHub repository's **Settings** tab.
    * Navigate to **Pages** (usually in the left sidebar).
    * Under "Source", select **Deploy from a branch**.
    * Choose the **gh-pages** branch.
    * Set the "Folder" to **/(root)**.
    * Click **Save**.

    Your Pokedex will be live at `https://Sudhanshu-Ambastha.github.io/Pokedex`.

## Acknowledgments

-   Thank you to the developers of the PokeAPI and the Pokémon3D API for providing the valuable data and resources that power this application.
-   Special thanks to the Pokémon community for their passion and support.