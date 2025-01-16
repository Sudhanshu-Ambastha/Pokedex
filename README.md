# Pokédex Search Application

## Overview
A comprehensive Pokémon search application built with React Native and Expo, offering detailed information about Pokémon including their statistics, evolution chains, and various forms. The application provides an intuitive user interface with dynamic sprite rendering and customized typography.

## Key Features

### Search Functionality
- Search Pokémon by name or ID number
- Real-time search results
- Comprehensive Pokémon information display

### Advanced Filtering System
| **Sprite Variations** | **Form Selection** | **Special Forms** | **Gender Variants** |
|-------------------|------------------|-----------------|-------------------|
| • Standard sprites<br>• Shiny variants | • Base forms<br>• Regional variants | • Mega Evolution (X/Y)<br>• Primal Reversion<br>• Gigantamax | • Male/Female differences |

### Technical Features
- Responsive design optimization
- Custom typography implementation
- Evolution chain visualization
- Interactive Pokémon detail pages
- Robust error handling system
- Seamless navigation experience

## Technical Stack

### Core Technologies
- [React Native](https://reactnative.dev/docs/environment-setup)
- Expo Framework
- React Navigation

### Styling & UI
- [NativeWind (Tailwind CSS for React Native)](https://www.nativewind.dev/getting-started/expo-router)
- Custom Pokémon font integration

### Data Source
- PokeAPI Proxy: `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/`

## Setup Instructions

### Prerequisites
- Node.js
- npm/yarn
- Expo CLI

### Installation Steps

1. Clone the repository:
   ```
   git clone https://github.com/Sudhanshu-Ambastha/Pokedex
   ```

2. Install dependencies:
   ```
   npm install expo-router react-navigation react-navigation-stack @react-navigation/stack react-native-screens react-native-safe-area-context @react-native-picker/picker
   ```

### Launch Application

For web deployment:
```
cd pokedex && npm start
```

For mobile development:
```
cd pokedex && npx expo start --tunnel
```

## Credits

Special acknowledgment to:
- The Pokémon Company
- PokeAPI development team
- Open-source community contributors

