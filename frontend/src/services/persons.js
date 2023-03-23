import axios from 'axios';

const baseUrl = 'http://localhost:3001/api/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = (newPerson) => {
  const request = axios.post(baseUrl, newPerson);
  console.log(request);
  return request.then(response => response.data);
};

const update = (id, newPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, newPerson);
  return request.then(response => response.data);
};

const deletePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  console.log(request);
  return request.then(response => response.data);
};

const personService = {
  getAll,
  create,
  update,
  deletePerson
};

export default personService;
