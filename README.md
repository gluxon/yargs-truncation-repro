## Description

This is a repro for https://github.com/yargs/yargs/issues/2118 (_Throwing an error in a command handler can result in truncated stdout/stderr output_)

## Setup

```sh
git clone git@github.com:gluxon/yargs-truncation-repro
cd yargs-truncation-repro

npm install
```

## Repros

**Observe no truncation when not piped**:

```
node index.js test
```

**Observe truncation when piped**:

```
node index.js test | cat
```

**Observe no truncation when piped but streams are set to be blocking**:

```
node index.js test --blocking | cat
```
