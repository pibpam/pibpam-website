import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const BackgroundPlayer = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: auto;
  position: sticky;
  width: 100%;
  z-index: 1;
  top: 0;

  &::before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    background: rgba(0,0,0,.6);
  }

  > div {
    width: 100%;
    height: 100%;
  }
`;

export const Welcome = styled.div`
  min-height: 100vh;
  z-index: 2;
  background: #fff;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Warn = styled.div`
  background: rgba($color: #fff, $alpha: 1);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 32px;

  >div {
    text-align: center;
    width: 600px;
    max-width: 100%;
    padding: 24px;
    background: #5FD9DA;
    border-radius: 8px;
    color: #fff;
    gap: 16px;
    display: flex;
    flex-direction: column;

    >h1 {
      font-size: 32px;
    }

    >h2 {
      font-size: 24px;
      font-weight: 400;
    }
  }

  .download {
  display: flex;
  gap: 24px;
  align-items: center;
  justify-content: center;
  margin: 32px 0;

  >a {
    display: flex;
    background: none;
    cursor: pointer;

    svg {
      height: 70px;
    }
  }

}

.contacts {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;

  >a {
    background: #fff;
    color: #5FD9DA;
    font-size: 20px;
    padding: 8px 16px;
    border-radius: 24px;
  }

}
`