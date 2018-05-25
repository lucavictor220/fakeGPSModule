import fetch from "node-fetch";

const getRouteById = (id) => {
  return fetch(`https://www.eway.md/ajax/en/chisinau/routeInfo/${id}`, {
    headers: { 'X-Requested-With': 'XMLHttpRequest' }
  })
    .then(function(response) {
      console.log(response);
      return response.json();
    });
};

export default getRouteById;

