## @zxiaosi/create-sdk

A tool for generating @zxiaosi/sdk projects

> **Compatibility Note:**
> Vite requires [Node.js](https://nodejs.org/en/) version 20.19+, 22.12+. However, some templates require a higher Node.js version to work, please upgrade if your package manager warns about it.

## Usage

```bash
npm install -g @zxiaosi/create-sdk

npx create-sdk
```

## Tips

- All templates exclude `react-dom`, which will cause `HMR` to fail. Please install [React Developer Tools](https://microsoftedge.microsoft.com/addons/detail/react-developer-tools/gpphkfbcpidddadnkolkpfckpihlkkil).

## Reference

- [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite)

- [create-tsdown](https://github.com/rolldown/tsdown/tree/main/packages/create-tsdown)
