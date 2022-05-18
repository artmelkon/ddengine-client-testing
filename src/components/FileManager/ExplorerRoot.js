import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import {
  Container,
  Button,
  ButtonGroup,
  Dropdown,
  ToggleButton,
  Breadcrumb,
} from "react-bootstrap";
import {
  FaCloudUploadAlt,
  FaCloudDownloadAlt,
  FaCog,
  FaBars,
  FaEllipsisH,
} from "react-icons/fa"; // for icons visit https://react-icons.github.io/react-icons
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";

// import DirectoryBrowser from "./DirBrowser";
import { GET_FOLDER, DELETE_FILE } from "../queries";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import FolderItems from "./FolderContent";
import Error from "../components/Error/Error.component";
import { ExplorerContext } from "../store/explorer-context";
import "./index.scss";


const DisplayMenu = () => {
  return (
    <Dropdown.Menu>
      <Dropdown.Item href="#">Move</Dropdown.Item>
      <Dropdown.Item href="#">Copy</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item href="#" style={{ color: "red" }}>
        Remove
      </Dropdown.Item>
    </Dropdown.Menu>
  );
};

const ExplorerRoot = (props) => {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([]);
  const { currentFolder } = props;

  let { id } = useParams();
  console.log("useParams ", id);

  console.log("current folder ", currentFolder);
  const { directoryState, dispatchDirectory } = useContext(ExplorerContext);

  const {
    loading,
    error,
    data: childrenData,
  } = useQuery(GET_FOLDER, {
    variables: {
      _id: currentFolder,
    },
  });
  const [deleteFile] = useMutation(DELETE_FILE);

  const [radioValue, setRadioValue] = useState("1");

  useEffect(() => {
    if (childrenData && childrenData.getFolder) {
      setData(childrenData.getFolder);
    }
  });

  const radios = [
    {
      icon: <FaEllipsisH color="" />,
      name: "file-manager-view",
      value: "file-manager-col-view",
    },
    {
      icon: <FaBars />,
      name: "file-manager-view",
      value: "file-manager-row-view",
    },
  ];

  const checkboxHandler = (e) => {
    if (e.target.checked) {
      dispatchDirectory({
        type: "SET_ITEM_CHECKED",
        payload: {
          selected: e.target.checked,
          selectedId: e.target.id,
        },
      });
    } else {
      dispatchDirectory({
        type: "SET_ITEM_CHECKED",
        payload: {
          selected: false,
          selectedId: null,
        },
      });
    }
    // deleteSelectionHandler(deleteItem);
  };

  const moveToHandler = (e) => {
    console.log('move to select folder ', e.target)
  }

  const deleteItemHandler = (e) => {
    // const {delete} = e.target.dataset.delete;

    if (window.confirm("Are you sure you want to delete this?")) {
      console.log("element ", e.target.dataset.delete);
      // console.log("selected id ", directoryState);
      deleteFile({
        variables: {
          _id: e.target.dataset.delete,
        },
        refetchQueries: [GET_FOLDER, "getFolder"],
      });
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return setErrors(error);

  console.log("directory state ", directoryState);
  return (
    <Container className="flex-grow-1 light-style container-p-y">
      <Container className="container-m-nx container-m-ny bg-lightest mb-3">
        <Breadcrumb className="text-big container-p-x py-3 m-0">
          <Breadcrumb.Item>
            <Link to="#">home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="#">projects</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>site</Breadcrumb.Item>
        </Breadcrumb>

        <hr className="m-0" />
        <Container className="file-manager-actions container-p-x py-2">
          <div>
            <Button className="file-manager__btn">
              <FaCloudUploadAlt size={12} />
              &nbsp; Upload
            </Button>
            <Button
              className="file-manager__btn"
              variant="secondary"
              disabled=""
            >
              <FaCloudDownloadAlt size={12} />
            </Button>
            <Dropdown className="file-manager__btn py-2">
              <Dropdown.Toggle className="px-2" variant="default">
                <FaCog />
              </Dropdown.Toggle>
              <DisplayMenu />
            </Dropdown>
          </div>
          <div>
            <ButtonGroup>
              {radios.map((radio, idx) => (
                <label className="btn">
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    name="file-manager-view"
                    value={radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                    checked=""
                    variant="outline-transparent"
                  >
                    {radio.icon}
                  </ToggleButton>
                </label>
              ))}
            </ButtonGroup>
          </div>
        </Container>

        <hr className="m-0" />

        <Container className="file-manager-container file-manager-col-view">
          {data.map((item) => {
            return (
              <FolderItems
                key={item._id}
                {...item}
                onCheckboxChange={checkboxHandler}
                onDeleteEvent={deleteItemHandler}
                onMovetoFolder={moveToHandler}
              />
            );
          })}
        </Container>
        {errors.map((err) => (
          <Error key={err} error={err} />
        ))}
      </Container>
    </Container>
  );
};

export default ExplorerRoot;
