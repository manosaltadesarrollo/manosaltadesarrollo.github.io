import { API_URL } from "../constants/api";

export async function getAllPublications() {
    try {
        const response = await fetch(`https://jfc2w9qp.api.sanity.io/v2025-10-08/data/query/production?query=*%5B_type+%3D%3D+%22post%22%5D+%7C+order%28fecha+desc%29%7B%0A++_originalId%2C%0A++fecha%2C%0A++titulo%2C%0A++descripcionBreve%2C%0A++descripcionCompleta%2C%0A++%22fotoUrl%22%3A+foto.asset-%3Eurl%0A%7D&perspective=drafts`)
        // https://jfc2w9qp.api.sanity.io/v2025-10-08/data/query/production?query=*%5B_type+%3D%3D+%22post%22%5D+%7C+order%28fecha+desc%29%7B%0A++_originalId%2C%0A++fecha%2C%0A++titulo%2C%0A++descripcionBreve%2C%0A++descripcionCompleta%2C%0A++%22fotoUrl%22%3A+foto.asset-%3Eurl%0A%7D&perspective=drafts
        if(response.ok) {
            const data = await response.json();
            return data.result;
        } else {
            throw new Error('Could not retrieve publications');
        }
    } catch (error) {
        throw new Error('Could not reach server.')
    }
}

export async function getPublicationByID(id:string) {
    try {
        const response = await fetch(`${API_URL}/query/production?query=*%5B_type+%3D%3D+%22post%22+%26%26+_originalId+%3D%3D+%22${id}%22%5D%5B0%5D%7B%0A++_originalId%2C%0A++fecha%2C%0A++titulo%2C%0A++descripcionBreve%2C%0A++descripcionCompleta%2C%0A++%22fotoUrl%22%3A+foto.asset-%3Eurl%0A%7D&perspective=drafts`)
        if(response.ok) {
            const data = await response.json();
            return data.result;
        } else {
            throw new Error('Could not retrieve a publication with that ID')
        }
    } catch (error) {
        throw new Error('Could not reach server')
    }
}