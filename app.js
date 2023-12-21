import fs from 'fs';
import path from 'path';
import xml2js from 'xml2js';

const metaPath = './metas';

async function processMetaFiles() {
  const itemsMap = new Map();

  try {
    const files = await fs.promises.readdir(metaPath);

    for (const file of files) {
      if (path.extname(file) === '.xml') continue;

      const filePath = path.join(metaPath, file);
      const data = await fs.promises.readFile(filePath, 'utf8');
      const result = await xml2js.parseStringPromise(data);

      const handlingData = result.CHandlingDataMgr.HandlingData;

      if (handlingData && handlingData.length > 0) {

        for (const item of handlingData[0].Item) {

          const handlingName = item.handlingName && item.handlingName[0];
          if (handlingName) {
            if (itemsMap.has(handlingName)) {
              console.warn(`Duplicate found for handlingName: ${handlingName}`);
              continue;
            }

            itemsMap.set(handlingName, item);
          } else {
            console.warn(`Item without handlingName in file: ${file}`);
          }
        }
      } else {
        console.warn(`No HandlingData found in file: ${file}`);

      }
    }


    const items = Array.from(itemsMap.values());

    items.sort((a, b) => {
      const handlingNameA = a.handlingName[0];
      const handlingNameB = b.handlingName[0];
      return handlingNameA.localeCompare(handlingNameB);
    });

    const mergedData = {
      CHandlingDataMgr: {
        HandlingData: {
          Item: items.map(item => ({
            ...item,
            $: { type: "CHandlingData" }  // Add the type attribute to each Item
          }))
        }
      }
    };

    const builder = new xml2js.Builder();
    const xml = builder.buildObject(mergedData);

    await fs.promises.writeFile('handling.meta', xml);

  } catch (err) {
    console.error('Error processing meta files:', err);
  }
}
processMetaFiles();

