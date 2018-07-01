import { readFromLocalStorageByTypeAndNr } from '../utils/read';

class RouteCache {
  constructor() {
    this.cache = [];
  }

  add = (type, nr) => {
    const data = readFromLocalStorageByTypeAndNr(type, nr);
    this.cache.push({
      type,
      nr,
      data
    });
    console.log(this.cache.length);
  };

  get = (type, nr) => {
    return this.cache.find(item => (item.type === type && item.nr === nr));
  }
}

const RouteCacheInstance = new RouteCache();

export default RouteCacheInstance;

