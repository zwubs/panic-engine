![GitHub package.json version](https://img.shields.io/github/package-json/v/ZWubs/PANIC-Engine?color=%2351fd62&style=for-the-badge)
![GitHub all releases](https://img.shields.io/github/downloads/ZWubs/PANIC-Engine/total?color=blue&style=for-the-badge)

# PANIC Engine
A game engine based on the three.js library and WebGL.

## Running
Either you can grab the precompiled version of PANIC from the releases page,
or build it yourself.
```bash
npm install
npm run build
npm start
```

## Version 0.5.0
**The Typescript Update**
- Convert entire project to TS
- Unplug some functionality (collision, events, & input)
- Added typings
- Cleaned up all files
- Cleaned up examples

## Version 0.4.0
**The Collision Update**
- Add BoundingSphere to entities.
- Add OrientedBoundingBox to entities.
- Add collision json format to entity files.
- Add very basic physics.

## Version 0.3.0
**The Input Update**
- Add keyboard, mouse, and gamepad input.
- Add scripting to entities.
- Add new event system and action system.
- Fix window resizing issue.

## Version 0.2.0
**The NPM Update**
- Convert entire project to a node project.
- Move three.js dependencies from files to node modules.
- Create a building system with minification.

## Version 0.1.0
**The Restructure Update**
- Update all functions to ES6 class structures.
- Turn 'panic.js' into an aggregating module.
- Update to THREE v132

## Version 0.0.0
**The Based Update**
- The initial run.
- Based off of the previous engine.
