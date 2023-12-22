# handling.meta
![GitHub all releases](https://img.shields.io/github/downloads/paradymlabs/handling.meta/total?style=flat&logo=github&logoColor=FFFFFF&color=4dabf7&link=https%3A%2F%2Fgithub.com%2FParadymLabs%2Fhandling.meta%2Freleases%2Flatest)

This is a utility for GTAV / FiveM to concatenate multiple handling.meta files into a singular file while removing duplicate entries (there are many). I don't believe this step is necessary but it does make working on the files a lot more comfortable so I hope you find this useful.

Made in collaboration with [iZolox](https://github.com/izolox)

#### This is a utility  not a fivem resource!


## 💾 Install
Download `handling.meta` from [latest release](https://github.com/paradymlabs/handling.meta/releases/latest) and place the file in your metas resource

If you don't know how to do that this tool is probably not for you

## 🏃 Running Locally
Requires Node 16 or greater
```bash
git clone https://github.com/ParadymLabs/handling.meta.git
```

```bash
pnpm i
node app.js
```

This will output `handling.meta` into the root of your repo

## 🚗 Custom Handling files
You may add any additional handling files for add-on cars, etc into `./metas/` before running the script with Node
