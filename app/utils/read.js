import fs from 'fs';

const PATH_TO_LOCAL_STORAGE = "app/data/";

export const readFromLocalStorageById = (id) => {
  const path = PATH_TO_LOCAL_STORAGE + id + ".json";
  if (fs.existsSync(path)) return JSON.parse(fs.readFileSync(path, 'utf8'))
};