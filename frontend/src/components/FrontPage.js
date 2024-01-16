import MenuBar from "./MenuBar";
import Carousel from "./CarouselFrontPage";
import TextField from "./TextField";
import QuoteCard from "./QuoteCard";
import Footer from "./Footer";

function FrontPage({ setIsLoggedIn }) {
  return (
    <>
      <MenuBar setIsLoggedIn={setIsLoggedIn} />
      <Carousel />
      <TextField
        header="Witaj na FitCrafters - Miejscu, gdzie Kształtujesz Siłę!"
        text="Jesteśmy niezmiernie podekscytowani, że znalazłeś drogę do FitCrafters, naszej siłowni dedykowanej Twojemu zdrowiu, kondycji fizycznej i osiąganiu doskonałych wyników treningowych. W FitCrafters kładziemy nacisk na profesjonalizm, pasję i przyjazną atmosferę, abyś mógł osiągnąć swoje cele fitnessowe.
      
      Nasi doświadczeni trenerzy są gotowi wesprzeć Cię na każdym etapie Twojej drogi do zdrowia i formy. Bez względu na to, czy dopiero zaczynasz swoją przygodę ze sportem, czy jesteś doświadczonym entuzjastą fitnessu, FitCrafters oferuje bogaty wybór sprzętu, różnorodne zajęcia grupowe oraz personalne podejście do treningu.
      
      Przekrocz drzwi FitCrafters i dołącz do wspólnoty ludzi, którzy, tak jak Ty, dążą do osiągnięcia najlepszej wersji siebie. Niezależnie od tego, czy chcesz zbudować masę mięśniową, poprawić kondycję cardio, czy po prostu zrelaksować się po intensywnym dniu, FitCrafters to miejsce, w którym spełnisz swoje cele.
      
      Zapraszamy do zapoznania się z naszymi ofertami, grafikiem zajęć oraz korzystania z naszych udogodnień. W razie pytań nasi pracownicy są gotowi, by pomóc Ci znaleźć najlepsze rozwiązania dostosowane do Twoich potrzeb.
      
      Razem możemy osiągnąć więcej. Czekamy na Ciebie na FitCrafters – miejscu, gdzie siła spotyka determinację!"
      />
      <QuoteCard
        quote="Dzisiaj zrobię to, czego inni nie zrobią, więc jutro mogę osiągnąć to, czego inni nie mogą."
        author="Jerry Rice"
      />
      <TextField
        header="Nasza misja"
        text="W FitCrafters wierzymy, że zdrowie i siła to fundamenty satysfakcjonującego życia. Nasza misja to nie tylko dostarczanie doskonałych warunków do treningu, ale również inspiracja do pozytywnych zmian w Twoim stylu życia.
  
      Dążymy do stworzenia miejsca, gdzie każdy, bez względu na poziom zaawansowania czy doświadczenie, znajdzie wsparcie, motywację i fachową opiekę. Chcemy, aby FitCrafters był nie tylko siłownią, ale także społecznością, gdzie pasja do zdrowego stylu życia łączy ludzi o różnych celach i aspiracjach.
      
      Przez oferowanie różnorodnych zajęć dostosowanych do indywidualnych potrzeb, wspieramy Cię w osiąganiu Twoich celów fitnessowych. Nasza misja to rozwijanie siły fizycznej, umysłowej i emocjonalnej, umożliwiając Ci osiągnięcie pełni potencjału.
      
      W FitCrafters nie tylko trenujesz – budujesz fundamenty zdrowego życia. Inspirujemy do podejmowania wyzwań, przełamywania ograniczeń i czerpania radości z każdego kroku na drodze do lepszej wersji siebie.
      
      Dołącz do naszej społeczności FitCrafters, gdzie razem kształtujemy siłę, inspirujemy zmiany i tworzymy historie sukcesu. Jesteśmy przekonani, że każdy ma potencjał do osiągnięcia swoich marzeń fitnessowych, a my jesteśmy tutaj, aby Cię w tym wesprzeć.
      
      FitCrafters - Razem Kształtujemy Siłę Życia!"
      />
      <Footer />
    </>
  );
}

export default FrontPage;
