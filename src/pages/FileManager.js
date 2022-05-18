import {useState, useEffect} from 'react'
import ExplorerRoot from '../components/FileManager/ExplorerRoot';
import { ExplorerProvider } from '../store/explorer-context';

import "./index.scss";
import { useParams } from 'react-router-dom';

const FileManager = () => {
  let {id} = useParams()

  return (
    <ExplorerProvider>
      <ExplorerRoot currentFolder={id} />
    </ExplorerProvider>
  );
};

export default FileManager;
