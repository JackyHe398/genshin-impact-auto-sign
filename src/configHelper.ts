import { IConfigType } from "./interface/IConfigType";

const defaultConfig: IConfigType = {
  signTime: {
    hours: 0,
    minutes: 5,
  },
  lastDate: new Date(0),
  open: true,
};

const defaultKeys = ["lastDate", "signTime", "open"];


export async function getConfig<K extends keyof IConfigType>( // set 'possible output keys' to 'key of IConfigType' 
  keys?: readonly K[] // set 'possible input keys' to 'key
): Promise<Pick<IConfigType, K>> {
  const usedKeys = keys ?? (defaultKeys as unknown as readonly K[]); // if keys is null use defaultKeys

  return new Promise((resolve) => {
    chrome.storage.sync.get(usedKeys, (data) => {
      const result: Partial<IConfigType> = { ...data };
      if (data.lastDate && !(data.lastDate instanceof Date)) {
        if(typeof result.lastDate === "string" || 
          typeof result.lastDate === "number"){
          result.lastDate = new Date(result.lastDate);
        }else {
          result.lastDate = new Date(0); // fallback to epoch if conversion fails
        }
      }

      for (const key of usedKeys) {
        if (typeof result[key] === "undefined") {
          result[key] = defaultConfig[key];
        }
      }

      resolve(result as Pick<IConfigType, K>);
    });
  });
}


export const setConfig = async (config: IConfigType): Promise<IConfigType> => {
  await new Promise<void>((resolve) => {
    chrome.storage.sync.set(config, resolve);
  });

  return await getConfig();
};

export const resetConfig = async (): Promise<void> => {
  for (const key of defaultKeys) {
    await new Promise<void>((resolve) => {
      chrome.storage.sync.remove(key, resolve);
    });
  }
};
