import { gql } from '@apollo/client';


export const GET_DOG_QUERY = gql`
  query Getdog($name: String) {
    dog(name: $name) {
      id
      name
      breed
    }
  }
`;

export const GET_DND_HUBTABLE = gql`
  query GetDnDHubTable($tableName: String!) {
    getDnDHubTable(tableName: $tableName) {
      files {
        _id
        filename
      }
      columns {
        _id
        title
        fileIds {
          _id
          filename
        }
      }
      columnOrder {
        _id
      }
    }
  }
`;
