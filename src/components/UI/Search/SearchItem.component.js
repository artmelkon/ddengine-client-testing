import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const SearchItem = ({ _id, itemname }) => (
  <ListGroup.Item>
    <Link to={`/file/${_id}`}>
      <h4> {itemname} </h4>
    </Link>
  </ListGroup.Item>
);

export default SearchItem;
