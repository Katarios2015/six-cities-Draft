import MainPage from '../main-page/main';
type AppProps = {
  cardsCount: number;
}

function App({cardsCount}:AppProps) : JSX.Element {
  return (
    <MainPage cardsCount={cardsCount}/>
  );
}

export default App;
