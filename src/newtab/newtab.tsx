import {
  DetailedHTMLProps,
  HTMLAttributes,
  StrictMode,
  useEffect,
  useState,
} from "react";
import ReactDOM from "react-dom/client";

import styled from "styled-components";
import { TiDeleteOutline } from "react-icons/ti";
import {
  WordRecord,
  deleteData,
  retrieveAllData,
} from "../service/storage/storage_interface";

const Body = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 50px;
  background-color: #f7f9f9;
  font-family: "Roboto", sans-serif;
  box-sizing: border-box;
`;

const Container = styled.div`
  width: 600px;
  padding: 35px 25px;
  border-radius: 10px;
  background-color: white;
  display: flex;
  flex-direction: column;
`;
export const H2 = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #181c21;
  margin: 0;
`;

export const Subtitle = styled.span`
  font-size: 15px;
  color: #566370;
  a {
    color: #566370;
  }
`;
interface SpaceProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  height: number;
}

export const Space = styled.div<SpaceProps>`
  height: ${(props) => props.height}px;
`;

const Newtab = () => {
  const [records, setRecords] = useState<WordRecord[]>();

  useEffect(() => {
    retrieveAllData()
      .then((result) => {
        setRecords(result);
      })
      .catch((e) => console.log(e));
  }, []);

  const handleDelete = async (item: WordRecord) => {
    console.log("new tab delete data", item);

    deleteData(item);
    // setTimeout(() => {
    //   retrieveAllData()
    //     .then((result) => {
    //       setRecords(result);
    //     })
    //     .catch((e) => console.log(e));
    // }, 300);
  };

  return (
    <Body>
      <Container>
        {records &&
          records.map((item: WordRecord) => (
            <>
              <Space height={5} />
              <Subtitle>{item.word}</Subtitle>
              <a>{item.saveCount}</a>
              <TiDeleteOutline onClick={() => handleDelete(item)} />
            </>
          ))}
      </Container>
    </Body>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
console.log(root);

root.render(
  <StrictMode>
    <Newtab />
  </StrictMode>
);
// const div = document.createElement("div");
// div.className = "container";
// document.body.appendChild(div);

// ReactDOM.createRoot(div).render(
//   <StrictMode>
//     <Newtab />
//   </StrictMode>
// );
