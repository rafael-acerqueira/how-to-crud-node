const axios = require('axios')

const baseURL = 'https://como-fazer-9e94a.firebaseio.com/'

const list = async (key) => {
  const content = await axios.get(baseURL + key + '.json')
  if(content.data){
    const objetos = Object
                          .keys(content.data)
                          .map( key => {
                            return {
                              id: key,
                              ...content.data[key]
                            }
                          })
    return objetos
  }
  return []
}

const apagar = async (key, id) => {
  await axios.delete(`https://como-fazer-9e94a.firebaseio.com/${key}/${id}.json`)
  return true
}

module.exports = {
  list,
  apagar
}
