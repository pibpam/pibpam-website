import styled from 'styled-components';

export const Container = styled.div`
  padding: 16px 24px 16px;
`

export const ImageHeader = styled.div<{ src: string}>`
  aspect-ratio: 16/9;
  width: 100%;
  height: auto;
  background: ${({ src }) => `url('${src}') center/cover`};
  border-radius: 8px;
  margin-bottom: 16px;
`

export const Begin = styled.div`
  padding: 0 24px 24px;

  > h1 {
    font-weight: 700;
    font-size: 24px;
    line-height: 30px;
    color: #3D3D3D;
  }

  > h2 {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    color: #3D3D3D;
    margin-bottom: 16px;
  }
`

export const DateTime = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #5FD9DA;
  margin-bottom: 16px;

  > div {
    display: flex;
    align-items: center;

    > svg {
      margin-right: 8px;
      font-size: 20px;
    }
  }
`

export const Location = styled.div`
  display: flex;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #5FD9DA;
  margin-bottom: 16px;
  align-items: center;

  > svg {
    margin-right: 8px;
    font-size: 20px;
  }

  > div {
    display: flex;
    flex-direction: column;
    flex: 1;

    > button {
      text-decoration: underline;
      font-weight: 400;
      font-size: 12px;
      background: transparent;
      display: flex;
      margin-right: auto;
      padding: 4px 4px 4px 0;
      color: #5FD9DA;

      &:focus {
        outline: none;
      }

    }
  }
`

export const Audience = styled.div`
  display: flex;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #5FD9DA;
  margin-bottom: 16px;
  align-items: center;

  > svg {
    margin-right: 8px;
    font-size: 20px;
  }

  > div {
    display: flex;
    flex-direction: column;
    flex: 1;

    > div:first-child {
      font-weight: 400;
      font-size: 10px;
      line-height: 12px;
    }
  }
`

export const Alert = styled.div`
  display: flex;
  align-items: center;
  background: #B5DA35;
  border-radius: 8px;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  color: #FFFFFF;
  padding: 16px;

  > svg {
    font-size: 22px;
    margin-right: 8px;
  }
`

export const SubscriptionButton = styled.div`
  margin-top: 16px;
`

export const Description = styled.div`
  padding: 16px 24px 32px;

  > p {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    text-align: justify;
    color: #3D3D3D;
    margin-bottom: 24px;
  }
`


export const AlertMultiline = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  color: #FFFFFF;
  background: #B5DA35;
  border-radius: 8px;

  > svg {
    margin-right: 8px;
    font-size: 24px;
  }

  > div {
    display: flex;
    flex: 1;
    flex-direction: column;

    > div:first-child {
      font-weight: 500;
      font-size: 10px;
      line-height: 12px;
    }

    > div:last-child {
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
    }
  }
`;
