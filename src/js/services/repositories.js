import { baseUrl, repositoryQuantity } from "/src/js/variables.js";

async function getRepositories(userName) {
    const response = await fetch(`${baseUrl}/${userName}/repos?per_page=${repositoryQuantity}`);
    return await response.json();
}

export { getRepositories };