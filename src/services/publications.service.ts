export async function getAllPublications() {
    try {
        const response = await fetch('https://jfc2w9qp.api.sanity.io/v2025-10-01/data/query/production?query=*%5B_type+%3D%3D+%22post%22%5D+%7C+order(numeroPublicacion+asc)+%7B%0A++numeroPublicacion%2C%0A++fecha%2C%0A++titulo%2C%0A++subtitulo%2C%0A++descripcionBreve%2C%0A++descripcionCompleta%2C%0A++%22fotoUrl%22%3A+foto.asset-%3Eurl%2C%0A++estado%0A%7D%0A&perspective=drafts')
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

export async function getOnePublication(id:string) {
    try {
        const response = await fetch(`https://jfc2w9qp.api.sanity.io/v2025-10-01/data/query/production?query=*%5B_type+%3D%3D+%22post%22%5D%5B${id}%5D+%7B%0A++numeroPublicacion%2C%0A++fecha%2C%0A++titulo%2C%0A++subtitulo%2C%0A++descripcionBreve%2C%0A++descripcionCompleta%2C%0A++%22fotoUrl%22%3A+foto.asset-%3Eurl%2C%0A++estado%0A%7D`)
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