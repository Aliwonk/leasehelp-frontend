import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { sendFiles } from "../redux/features/formsSlice";
import styles from "../styles/Home.module.css";

export default function Home() {
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [files, setFiles] = useState();
  const [ textPdf, setTextPdf ] = useState('');

  async function sendFile(files) {
    const formData = new FormData();
    const filesArray = [];
    filesArray.push(...files);
    filesArray.map(file => {
      formData.append('files', file);
    });

    const response = await fetch('http://localhost:3000/files/upload/1', {
      method: 'POST',
      body: formData
    });
    const result = await response.json();
    setTextPdf(result);

  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.banner}>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Delectus dolores deleniti dolore dolorem, ex perspiciatis, aspernatur illum corporis quidem eaque sit.
            Dolorem nobis, ipsa assumenda similique est voluptate. Sint, nulla.
          </p>
        </div>

        <form className={styles.formFiles}>
          <input type="file" onChange={e => setFiles(e.target.files)} multiple />
          <button onClick={e => {
            e.preventDefault();
            sendFile(files);
            // dispatch(sendFiles({
            //   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicGhvbmUiOiIrNzk5OTk5OTk5OTkiLCJzdWJzY3JpcHRpb25zIjpudWxsLCJyb2xlIjoiVVNFUiIsImlhdCI6MTY2NzY2Njg4MCwiZXhwIjoxNjY3NjY3MTgwfQ.f8Pdw9NWK0mhH6DJ5_p0e6DJ2g3qmelReRkqJ7idhg0',
            //   files
            // }))
          }}>Сравнить</button>
        </form>
        <div>{textPdf}</div>
      </div>
    </>
  );
}
