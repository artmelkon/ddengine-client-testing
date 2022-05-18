import React, {useState} from "react";
import { ApolloConsumer } from "@apollo/client";
import {Card, Form, ListGroup} from 'react-bootstrap';
import { SEARCH_FILES } from "../../../queries";

// import Card from '../Card/Card.component';
// import FormInput from "../FormInput/FormInput.component";
import SearchItem from "./SearchItem.component";

const Search = (props) => {
  const [searchState, setSearchState] = useState({
    searchResult: []
  })

  const handleChange = ({ searchFiles }) => {
    setSearchState({ searchResult: searchFiles });
  };

    const { searchResult } = searchState;
    console.log('search result ', searchResult)
    return (
      <ApolloConsumer>
        {(client) => (
          <Card
            className={`mt-3 w-50 m-auto shadow-sm p-3 bg-body rounded-3`}
          >
            <Card.Body>
              <Form>
                <Form.Control
                  type="search"
                  placeholder="Search..."
                  onChange={async (event) => {
                    event.persist();
                    const { data } = await client.query({
                      query: SEARCH_FILES,
                      variables: { searchTerm: event.target.value, isFile: true },
                    });
                    handleChange(data);
                  }}
                />
              </Form>

              <ListGroup className="mt-3">
                {searchResult.map((file) => {
                  return <SearchItem key={file._id} {...file} />;
                })}
              </ListGroup>
            </Card.Body>
          </Card>
        )}
      </ApolloConsumer>
    );
}
export default Search;
