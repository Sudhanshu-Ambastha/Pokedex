# Pokémon Search App

Welcome to the Pokémon Search App! This application allows you to search for Pokémon by their name or ID and view detailed information about them, including their stats, types, and sprites.

## Features

- **Search by Name or ID**: Enter a Pokémon's name or ID to find detailed information.
- **Filter Options**:
  - **Sprite Type**: Choose between Normal and Shiny sprites.
  - **Form Type**: Select the standard or Alola form.
  - **Mega Forms**: Access various Mega forms, including Mega X, Mega Y, Primal, and G-Max.
  - **Gender**: Specify whether you want to see the Male or Female version of a Pokémon.

## Usage

1. **Search for a Pokémon**: 
   - Enter the name or ID of the Pokémon you want to find in the search bar.
2. **Select Filters**: 
   - Use the dropdown menus to choose your desired sprite type, form type, mega type, and gender.
3. **View Results**: 
   - The app will display the Pokémon's name, ID, height, weight, stats, and sprite image.

## Technologies Used

- HTML5
- CSS3
- JavaScript

## API Source

The application fetches Pokémon data from the following API:
- [PokeAPI Proxy](https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/)

Additionally, sprite images are sourced from:
- [Project Pokémon](https://projectpokemon.org/home/docs/spriteindex_148/3d-models-generation-1-pok%C3%A9mon-r90/)

## Testing

You can test the application live [here](https://onecompiler.com/html/42swhnzxd).

## Installation
[React Native Expo](https://reactnative.dev/docs/environment-setup)
[NativeWind](https://www.nativewind.dev/getting-started/expo-router)

To run this project locally, follow these steps:

1. Clone this repository:
   ```
   git clone "https://github.com/Sudhanshu-Ambastha/Pokedex"
   ```
2. Open `index.html` in your web browser.   
   ```
   npm install expo-router axios react-navigation react-navigation-stack @react-navigation/stack react-native-screens react-native-safe-area-context  @react-native-picker/picker
   ```
   for web:-
   ```
   npm start
   ```
   for mobile:-
   ```
   npx expo start --tunnel
   ```
## Acknowledgments

- Thanks to the Pokémon community and the developers behind the PokeAPI for making this app possible.