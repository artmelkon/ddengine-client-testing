import { useState, useCallback } from "react";
import { Dropdown, InputGroup } from "react-bootstrap";
import { FaFolder, FaFolderOpen, FaEllipsisH, FaImage } from "react-icons/fa"; // for icons visit https://react-icons.github.io/react-icons
import { Link } from "react-router-dom";

// import { ExplorerContext } from "../store/explorer-context";

const DisplayMenu = (props) => {
  const {_id} = props._id;
  return (
    <Dropdown.Menu align="end">
      <Dropdown.Item href="#">Rename</Dropdown.Item>
      <Dropdown.Item href="#">Move</Dropdown.Item>
      <Dropdown.Item href="#">Copy</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item
        href="#"
        style={{ color: "red" }}
        onClick={props.onDeleteEvent.bind()}
        data-delete={props._id}
        data-item = {props.isFile ? 'file' : 'folder'}
      >
        Delete
      </Dropdown.Item>
    </Dropdown.Menu>
  );
};

const FolderContent = (props) => {
  console.log("item ", props);
  const [isOpen, setIsOpen] = useState(false);

  // const folderOpenHandler = useCallback(
  //   (isOpen) => {
  //     setIsOpen((c) => !c);
  //   },
  //   [isOpen]
  // );

  return (
    <div className="file-item">
      <div className="file-item-select-bg" variant="primary" />
      <label className="file-item-checkbox custom-control custom-checkbox">
        <InputGroup.Checkbox
          className="custom-control-input"
          onChange={props.onCheckboxChange.bind()}
          id={props._id}
        />
        <span className="custom-control-label"></span>
      </label>
      <Link
        to={!props.isFile ? `/root/${props._id}` : `/file/${props._id}`}
        className="file-item__link"
      >
        <div className="file-item__icon">
          {props.isFile ? (
            <FaImage color="grey" size={34} />
          ) : !isOpen ? (
            <FaFolder size={34} />
          ) : (
            <FaFolderOpen size={34} />
          )}
        </div>
        <div className="file-item__title">{props.itemname}</div>
      </Link>
      <div className="file-item-changed">02/13/2018</div>
      <Dropdown className="file-item-actions">
        <Dropdown.Toggle variant="default" size="sm" id="dropdown-basic">
          <FaEllipsisH />
        </Dropdown.Toggle>
        <DisplayMenu {...props} />
      </Dropdown>
    </div>
  );
};

export default FolderContent;
