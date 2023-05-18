import axios from 'axios';

export const resolvers = {
    Query: {
        hello: async() => axios({
            baseURL: 'https://api.semanticscholar.org',
            url: '/v1/paper/doi:10.48550/arXiv.2303.17564'
        }).then((response)=>({ id: response.data?.arxivId })),
    },
};