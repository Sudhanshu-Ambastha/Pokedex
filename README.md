# Pokédex Search Application

## Table of Contents
- [Overview](#overview)
- [Key Features](#key-features)
- [Technical Stack](#technical-stack)
- [Setup Instructions](#setup-instructions)
- [Credits](#credits)

## Overview
A comprehensive Pokémon search application built with React Native and Expo, offering detailed information about Pokémon including their statistics, evolution chains, and various forms. The application provides an intuitive user interface with dynamic sprite rendering and customized typography.

## Key Features

### Search and Filter
- Instantly search Pokémon by name or ID
- Advanced filtering options:
  - Sprite Variations: Standard, Shiny, Mega, Primal, and Gigantamax
  - Gender Variants: Male and Female differences
  - Form Selection: Base and Regional variants

### Pokémon Details
- Interactive detail pages with:
  - Comprehensive stats
  - Evolution chains
  - Dynamic sprite rendering
- Customized typography for a unique Pokémon-themed UI

### Technical Highlights
- Responsive design across devices
- Smooth navigation with React Navigation
- Error handling for API issues and user input


## Technical Stack

### Core Technologies
- [React Native](https://reactnative.dev/docs/environment-setup)
- [Expo Framework](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/docs/getting-started)

### Styling & UI
- [NativeWind (Tailwind CSS for React Native)](https://www.nativewind.dev/getting-started/expo-router)
- [Custom Pokémon font integration](https://www.fontget.com/font/pokemon/#google_vignette)

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

