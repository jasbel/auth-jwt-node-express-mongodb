function addZeros(valor) {
  return valor < 10 ? `0${valor}` : valor;
}

const dateNew = () => {
  const dt = new Date();
  const format = `${dt.getFullYear()}-${addZeros(dt.getMonth() + 1)}-${addZeros(dt.getDate())} ${addZeros(dt.getHours())}:${addZeros(dt.getMinutes())}:${addZeros(dt.getSeconds())}`;

  return format
}

module.exports = { dateNew }