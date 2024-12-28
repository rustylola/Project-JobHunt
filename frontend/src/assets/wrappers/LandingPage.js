import styled from 'styled-components';

const Wrapper = styled.section`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
    background:    url(./src/assets/images/background-ball.png);
    background-size: contain;                      
    background-repeat:   no-repeat;
    background-position: right;
  }
  h1 {
    font-weight: 700;
    text-shadow: 2px 2px 5px var(--grey-500);
    span {
      color: var(--navy-text);
    }
    margin-bottom: 1.5rem;
  }
  p {
    line-height: 2;
    color: var(--navy-900);
    margin-bottom: 1.5rem;
    max-width: 35em;
  }
  .register-link {
    margin-right: 1rem;
  }
  .main-img {
    display: none;
  }
  .btn {
    padding: 0.75rem 1rem;
    box-shadow: 2px 2px 5px var(--grey-500);
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 400px;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;
export default Wrapper;
