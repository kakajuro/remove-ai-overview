## Building Locally

Clone the project

```bash
  git clone https://github.com/kakajuro/remove-ai-overview my-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies (using yarn)

```bash
  yarn
```

Start the extension in the development environment with

```bash
  yarn app:YOUR_PLATFORM-dev
```

Extension output locations

```bash
  ./dist/YOUR_PLATFORM_dist
```

Build the extension with

```bash
  yarn app:YOUR_PLATFORM-dev
```

or build and zip for all platforms at once using

```bash
  yarn build:all
```

These will be available at

```bash
  ./builds/rao_YOUR_PLATFORM_dist_v[VERSION].zip
```
