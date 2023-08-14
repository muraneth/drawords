import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useEffect, useState } from "react";
import { WordSelected } from "../../utils/types";
import { GoogleResponse, translateWord } from "./google_trans";
import TranslatorCardBasic from "./base_card";

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div
      role="alert"
      style={{
        padding: "20px",
        background: "#fff",
      }}
    >
      <p
        style={{
          color: "red",
        }}
      >
        Something went wrong:
      </p>
      <p
        style={{
          color: "red",
        }}
      >
        {error.message}
      </p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

export function Translator(props: WordSelected) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div>
        <Suspense fallback={null}>
          <InnerTranslator {...props} />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
}

function InnerTranslator(props: WordSelected) {
  const [tran, setTran] = useState<GoogleResponse | undefined>();

  useEffect(() => translateWord(props.word, setTran), []);

  return (
    <div>
      {tran && (
        <>
          <TranslatorCardBasic
            word={props.word}
            context={props.contextSentence}
            google_trans={tran.sentences[0].trans}
          />
        </>
      )}
    </div>
  );
}
