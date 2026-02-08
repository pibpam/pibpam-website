import styled from "styled-components";

export const Container = styled.div`
  padding: 0 24px 120px;
  display: flex;
  flex-direction: column;

  > p {
    font-size: 14px;
    color: #555;
  }
`;

export const HeaderContainerPage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  > div {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #333;
    font-size: 24px;
    font-weight: 700;
    display: flex;
    align-items: center;

    > svg {
      color: #5fd9da;
      font-size: 32px;
    }
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
  margin-bottom: 32px;
`;

export const ContentItem = styled.a`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: #fff;
  border: solid 2px #5fd9da;
  border-radius: 8px;
  padding: 8px;

  > h1 {
    font-size: 20px;
    color: #333;
    font-weight: 700;
    display: flex;
    gap: 8px;
    align-items: center;
    border-radius: 8px;

    > span {
      font-size: 14px;
      height: 40px;
      min-width: 40px;
      display: flex;
      background-color: #b5da35;
      text-align: center;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
    }
  }

  > button {
    display: flex;
    padding: 0;
    background: transparent;
    gap: 8px;
    align-items: center;
    padding-right: 16px;

    > div:first-child {
      font-size: 24px;
      height: 40px;
      min-width: 40px;
      display: flex;
      background-color: #b5da35;
      text-align: center;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
    }

    > div:nth-child(2) {
      flex: 1;
      text-align: left;
      display: flex;
      flex-direction: column;

      p {
        font-size: 14px;
        color: #666;
        margin: 0;
      }

      h3 {
        font-size: 20px;
        color: #444;
        margin: 0;
        font-weight: 600;
      }
    }

    > svg {
      margin-left: auto;
      font-size: 20px;
      color: #5fd9da;
    }
  }

  > div {
    display: flex;
    padding: 0;
    background: transparent;
    gap: 8px;
    align-items: center;
    padding-right: 16px;

    > div:first-child {
      font-size: 24px;
      height: 40px;
      min-width: 40px;
      display: flex;
      background-color: #b5da35;
      text-align: center;
      justify-content: center;
      align-items: center;
      border-radius: 8px;
    }

    > div:nth-child(2) {
      flex: 1;
      text-align: left;
      display: flex;
      flex-direction: column;

      p {
        font-size: 14px;
        color: #666;
        margin: 0;
      }

      h3 {
        font-size: 20px;
        color: #444;
        margin: 0;
        font-weight: 600;
      }
    }

    > svg {
      margin-left: auto;
      font-size: 20px;
      color: #5fd9da;
    }
  }
`;

export const ModalBible = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  > h2 {
    color: #444;
    font-size: 24px;
    display: flex;
    align-items: center;
    gap: 8px;

    button {
      font-size: 32px;
      background: transparent;
      color: #5fd9da;
      height: 32px;
      display: flex;
      align-items: center;
    }
  }
`;

export const ModalAudio = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 32px;

  > h2 {
    color: #444;
    font-size: 24px;
    display: flex;
    align-items: center;
    gap: 8px;

    button {
      font-size: 32px;
      background: transparent;
      color: #5fd9da;
      height: 32px;
      display: flex;
      align-items: center;
    }
  }
`;

export const AudioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  > h3 {
    font-size: 20px;
    color: #444;
    display: flex;
    align-items: center;
    gap: 8px;

    > svg {
      font-size: 24px;
      color: #5fd9da;
    }
  }
`;

export const AuthorLine = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #5fd9da;
  display: flex;
  align-items: center;

  > div {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
  }
`;

export const Transcription = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  > h3 {
    font-size: 20px;
    color: #444;
    display: flex;
    align-items: center;
    gap: 8px;

    > svg {
      font-size: 24px;
      color: #5fd9da;
    }
  }

  > p {
    font-style: italic;
    color: #777;
    font-size: 14px;
    margin-bottom: 32px;
  }

  > div {
    h3, h1, h2, h4, h5, h6 {
      margin: 16px 0;
      font-size: 20px;
    }
    p {
      text-align: justify;
      color: #777;
      font-size: 16px;
      margin-bottom: 8px;
    }
    hr {
      margin: 16px 0;
      border: none;
      border-top: 1px solid #ddd;
    }
  }
`;

export const ContainerVerse = styled.div`
  > p {
    font-family:
      -apple-system,
      BlinkMacSystemFont,
      Segoe UI,
      Roboto,
      Oxygen,
      Ubuntu,
      Cantarell,
      Fira Sans,
      Droid Sans,
      Helvetica Neue,
      sans-serif;
    font-size: 20px;
    line-height: 28px;
    position: relative;
    text-indent: 24px;

    > sup {
      font-size: 12px;
      padding-bottom: 8px;
    }
  }
`;
