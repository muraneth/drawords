import styled from "styled-components";

const TranslatorCard = styled.div`
    border: 1px solid #ccc;
    border-radius: 5px;
    padding-right: 10px;
    width: 100%;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    font-size: 13px,
    color: #333,
`;
const WordSection = styled.div`
  margin-bottom: 10px;
`;

function TranslatorCardBasic({ word, translation }) {
  return (
    <TranslatorCard>
      <WordSection>
        <strong>Original:</strong> {word}
      </WordSection>
      <WordSection>
        <strong>Translation:</strong> {translation}
      </WordSection>
    </TranslatorCard>
  );
}

export default TranslatorCardBasic;
