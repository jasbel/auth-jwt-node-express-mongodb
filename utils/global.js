
const { dateNew } = require("./date.helper");

const typeResponse = {
  getAll: 'getAll',
  getOne: 'getOne',
  create: 'create',
  update: 'update',
  delete: 'delete',
  error: 'error',
  ok: 'ok',
  login: 'login',
}

const processResponse = (type = typeResponse, data) => {
  const resp = {
    "data": [],
    "message": ["Action executed"],
    "timestamp": dateNew(),
    "count": 0,
    "statuscode": 1000
  }
  if (type === typeResponse.create) {
    resp.message = ["Created successfully"];
    resp.statuscode = 2001;
  }
  if (type === typeResponse.getAll) {
    resp.data = [...data];
    resp.message = ["Action executed"];
    resp.count = data.length;
    resp.statuscode = 1000;
  }
  if (type === typeResponse.getOne) {
    resp.data = [...data];
    resp.message = ["Action executed"];
    resp.count = data.length;
    resp.statuscode = 1000;
  }
  if (type === typeResponse.ok) {
    resp.data = [...data];
    resp.message = ["Action executed"];
    resp.count = data.length;
    resp.statuscode = 1000;
  }
  if (type === typeResponse.login) {
    resp.data = [{ ...data[0] }];
    resp.message = ["Correct identification"];
    resp.statuscode = 4000;
  }
  if (type === typeResponse.error) {
    resp.message = ["error"];
    resp.statuscode = -2000;
  }

  return resp
}

module.exports = { processResponse, typeResponse }