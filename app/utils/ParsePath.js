const parsePath = function(path) {
  const arrayOfPoints = path.split(' ');
  return arrayOfPoints.map(item => {
    const coorinates = item.split(',');
    return {
      longitude: coorinates[0],
      latitude: coorinates[1],
    }
  });
};

 module.exports = parsePath;