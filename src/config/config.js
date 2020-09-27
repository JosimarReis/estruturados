
const dominio = (uri) => {
    let ENV = 'dev'


    let local = 'http://192.168.0.105:4320'
    let producao = 'http://174.138.38.24:4320'
    //let homologacao = 'http://142.93.114.208:3000'

    return ENV === 'dev' ? `${local}${uri}` : `${producao}${uri}`
}


export default {
    apiUrl: dominio("/")

}