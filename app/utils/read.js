import fs from 'fs';

const PATH_TO_LOCAL_STORAGE = "app/data/scrap-data/";

export const readFromLocalStorageById = (id) => {
  const path = PATH_TO_LOCAL_STORAGE + id + ".json";
  if (fs.existsSync(path)) return JSON.parse(fs.readFileSync(path, 'utf8'))
};

export const readFromLocalStorageByTypeAndNr = (type, nr) => {
  const searchType = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
  const path = PATH_TO_LOCAL_STORAGE + searchType + '-' + nr + '.json';
  if (fs.existsSync(path)) {
    return {
      exist: true,
      data: JSON.parse(fs.readFileSync(path, 'utf8'))
    }
  }

  return {
    exist: false,
    data: []
  }
};
