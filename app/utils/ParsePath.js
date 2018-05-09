const parsePath = function(path) {
  const arrayOfPoints = path.split(' ');
  return arrayOfPoints.map(item => {
    const coorinates = item.split(',');
    return {
      latitude: coorinates[0],
      longitude: coorinates[1],
    }
  });
};

 module.exports = parsePath;