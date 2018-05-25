const createTransport = ({ type, nr }) => {
  return {
    id: (+new Date).toString(36).slice(-8),
    nr,
    type,
    createdDate: new Date(),
    timestamp: Date.now(),
  }
};

export default createTransport;