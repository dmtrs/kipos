import axios from 'axios';
import { GetHelloQueryVariables } from './generated/schema';

async function fetchArxiv(doi: string): Promise<void> {
  const url = `http://export.arxiv.org/api/query?id_list=${doi}`;

  try {
    const response = await axios.get(url);
    const data: string = response.data;

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, 'application/xml');

    const entry = xmlDoc.getElementsByTagName('entry')[0];
    const title: string = entry.getElementsByTagName('title')[0].textContent??'';
    const authors: string[] = Array.from(entry.getElementsByTagName('author')).map((author) => author.getElementsByTagName('name')[0].textContent??'');

    console.log('Title:', title);
    console.log('Authors:', authors);
  } catch (error) {
    console.error('Error:', (error as Error).message);
  }
};

export const resolvers = {
  Query: {
    hello: async(parent: any, { doi }: GetHelloQueryVariables , context: any) => { 
      fetchArxiv(doi.split('/').pop()??'');
      return axios({
        baseURL: 'https://api.semanticscholar.org',
        url: `/v1/paper/${doi}`,
      }).then((response)=> {
        const { data } = response;
        if (!data) {
          throw new Error(`Error for ${doi}`)
        }
        console.log(response.data, response.headers);
        return ({
          id: data.doi,
          about: data.title,
          abstract: data.abstract,
          keywords: data.fieldsOfStudy,
          refs: data.references.map((ref: { doi: string; abstract: string; title: string; intent: string[] }) => ({
            id: ref.doi,
            about: ref.title,
            abstract: ref.abstract,
            keywords: ref.intent,
          }))
        });
      });
    }
  },
};
